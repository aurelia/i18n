/*eslint no-cond-assign: 0*/
import i18next from 'i18next';
import {DOM} from 'aurelia-pal';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BindingSignaler} from 'aurelia-templating-resources';

export class I18N {
  static inject = [EventAggregator, BindingSignaler];

  globalVars = {};
  params = {};
  i18nextDefered = {
    resolve: null,
    promise: null
  };
  i18next;
  ea: EventAggregator;

  constructor(ea, signaler) {
    this.i18next = i18next;
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
    this.i18nextDefered.promise = new Promise((resolve) => this.i18nextDefered.resolve = resolve);
  }

  setup(options?): Promise<any> {
    const defaultOptions = {
      compatibilityAPI: 'v1',
      compatibilityJSON: 'v1',
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    i18next.init(options || defaultOptions, (err, t) => {
      //make sure attributes is an array in case a string was provided
      if (i18next.options.attributes instanceof String) {
        i18next.options.attributes = [i18next.options.attributes];
      }

      this.i18nextDefered.resolve(this.i18next);
    });

    return this.i18nextDefered.promise;
  }

  i18nextReady(): Promise<any> {
    return this.i18nextDefered.promise;
  }

  setLocale(locale): Promise<any> {
    return new Promise( resolve => {
      let oldLocale = this.getLocale();
      this.i18next.changeLanguage(locale, (err, tr) => {
        this.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        this.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  }

  getLocale(): string {
    return this.i18next.language;
  }

  nf(options?, locales?): any {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  }

  uf(number, locale?): number {
    let nf = this.nf({}, locale || this.getLocale());
    let comparer = nf.format(10000 / 3);

    let thousandSeparator = comparer[1];
    let decimalSeparator  = comparer[5];

    // remove thousand seperator
    let result = number.replace(thousandSeparator, '')
      // remove non-numeric signs except -> , .
      .replace(/[^\d.,-]/g, '')
      // replace original decimalSeparator with english one
      .replace(decimalSeparator, '.');

    // return real number
    return Number(result);
  }

  df(options?, locales?): any {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  }

  tr(key, options?): string {
    let fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  }

  registerGlobalVariable(key, value): void {
    this.globalVars[key] = value;
  }

  unregisterGlobalVariable(key): void {
    delete this.globalVars[key];
  }

  /**
   * Scans an element for children that have a translation attribute and
   * updates their innerHTML with the current translation values.
   *
   * If an image is encountered the translated value will be applied to the src attribute.
   *
   * @param el    HTMLElement to search within
   */
  updateTranslations(el): void {
    if (!el || !el.querySelectorAll) {
      return;
    }

    let i;
    let l;

    //create a selector from the specified attributes to look for
    //var selector = [].concat(this.i18next.options.attributes);
    let selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) selector[i] = '[' + selector[i] + ']';
    selector = selector.join(',');

    //get the nodes
    let nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      let node = nodes[i];
      let keys;
      //test every attribute and get the first one that has a value
      for (let i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
        keys = node.getAttribute(this.i18next.options.attributes[i2]);
        if (keys) break;
      }
      //skip if nothing was found
      if (!keys) continue;

      //split the keys into multiple keys separated by a ;
      this.updateValue(node, keys);
    }
  }

  updateValue(node, value, params) {
    if (value === null || value === undefined) {
      return;
    }

    let keys = value.split(';');
    let i = keys.length;

    while (i--) {
      let key = keys[i];
      // remove the optional attribute
      let re = /\[([a-z\-]*)\]/ig;

      let m;
      let attr = 'text';
      //set default attribute to src if this is an image node
      if (node.nodeName === 'IMG') attr = 'src';

      //check if a attribute was specified in the key
      while ((m = re.exec(key)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        if (m) {
          key = key.replace(m[0], '');
          attr = m[1];
        }
      }

      if (!node._textContent) node._textContent = node.textContent;
      if (!node._innerHTML) node._innerHTML = node.innerHTML;

      // convert to camelCase
      attr = attr.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });

      //handle various attributes
      //anything other than text,prepend,append or html will be added as an attribute on the element.
      switch (attr) {
      case 'text':
        let newChild = DOM.createTextNode(this.tr(key, params));
        if (node._newChild) {
          node.removeChild(node._newChild);
        }

        node._newChild = newChild;
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        node.appendChild(node._newChild);
        break;
      case 'prepend':
        let prependParser = DOM.createElement('div');
        prependParser.innerHTML = this.tr(key, params);
        for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
          if (node.childNodes[ni]._prepended) {
            node.removeChild(node.childNodes[ni]);
          }
        }

        for (let pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
          prependParser.childNodes[pi]._prepended = true;
          if (node.firstChild) {
            node.insertBefore(prependParser.childNodes[pi], node.firstChild);
          } else {
            node.appendChild(prependParser.childNodes[pi]);
          }
        }
        break;
      case 'append':
        let appendParser = DOM.createElement('div');
        appendParser.innerHTML = this.tr(key, params);
        for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
          if (node.childNodes[ni]._appended) {
            node.removeChild(node.childNodes[ni]);
          }
        }

        while (appendParser.firstChild) {
          appendParser.firstChild._appended = true;
          node.appendChild(appendParser.firstChild);
        }
        break;
      case 'html':
        node.innerHTML = this.tr(key, params);
        break;
      default: //normal html attribute
        if (node.au &&
            node.au.controller &&
            node.au.controller.viewModel &&
            attr in node.au.controller.viewModel) {
          node.au.controller.viewModel[attr] = this.tr(key, params);
        } else {
          node.setAttribute(attr, this.tr(key, params));
        }

        break;
      }
    }
  }
}
