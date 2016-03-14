/*eslint no-cond-assign: 0*/
import i18next from 'i18next';

export class I18N {

  globalVars = {};

  constructor(ea, signaler) {
    this.i18next = i18next;
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
  }

  setup(options?) {
    const defaultOptions = {
      compatibilityAPI: 'v1',
      compatibilityJSON: 'v1',
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    return new Promise((resolve) => {
      i18next.init(options || defaultOptions, (err, t) => {
        //make sure attributes is an array in case a string was provided
        if (i18next.options.attributes instanceof String) {
          i18next.options.attributes = [i18next.options.attributes];
        }
        
        resolve(this.i18next);
      });
    });
  }

  setLocale(locale) {
    return new Promise( resolve => {
      let oldLocale = this.getLocale();
      this.i18next.changeLanguage(locale, (err, tr) => {
        this.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        this.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  }

  getLocale() {
    return this.i18next.language;
  }

  nf(options?, locales?) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  }

  uf(number, locale?) {
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

  df(options?, locales?) {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  }

  tr(key, options?) {
    let fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  }

  registerGlobalVariable(key, value) {
    this.globalVars[key] = value;
  }

  unregisterGlobalVariable(key) {
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
  updateTranslations(el) {
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
      let re = /\[([a-z\-]*)\]/g;

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

      //handle various attributes
      //anything other than text,prepend,append or html will be added as an attribute on the element.
      switch (attr) {
      case 'text':
        node.textContent = this.tr(key, params);
        break;
      case 'prepend':
        node.innerHTML = this.tr(key, params) + node._innerHTML.trim();
        break;
      case 'append':
        node.innerHTML = node._innerHTML.trim() + this.tr(key, params);
        break;
      case 'html':
        node.innerHTML = this.tr(key, params);
        break;
      default: //normal html attribute
        node.setAttribute(attr, this.tr(key, params));
        break;
      }
    }
  }
}
