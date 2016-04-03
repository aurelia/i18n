
import i18next from 'i18next';

export let I18N = class I18N {

  constructor(ea, signaler) {
    this.globalVars = {};
    this.i18nextDefered = {
      resolve: null,
      promise: null
    };

    this.i18next = i18next;
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
    this.i18nextDefered.promise = new Promise(resolve => this.i18nextDefered.resolve = resolve);
  }

  setup(options) {
    const defaultOptions = {
      compatibilityAPI: 'v1',
      compatibilityJSON: 'v1',
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    i18next.init(options || defaultOptions, (err, t) => {
      if (i18next.options.attributes instanceof String) {
        i18next.options.attributes = [i18next.options.attributes];
      }

      this.i18nextDefered.resolve(this.i18next);
    });

    return this.i18nextDefered.promise;
  }

  i18nextReady() {
    return this.i18nextDefered.promise;
  }

  setLocale(locale) {
    return new Promise(resolve => {
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

  nf(options, locales) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  }

  uf(number, locale) {
    let nf = this.nf({}, locale || this.getLocale());
    let comparer = nf.format(10000 / 3);

    let thousandSeparator = comparer[1];
    let decimalSeparator = comparer[5];

    let result = number.replace(thousandSeparator, '').replace(/[^\d.,-]/g, '').replace(decimalSeparator, '.');

    return Number(result);
  }

  df(options, locales) {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  }

  tr(key, options) {
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

  updateTranslations(el) {
    let i;
    let l;

    let selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) selector[i] = '[' + selector[i] + ']';
    selector = selector.join(',');

    let nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      let node = nodes[i];
      let keys;

      for (let i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
        keys = node.getAttribute(this.i18next.options.attributes[i2]);
        if (keys) break;
      }

      if (!keys) continue;

      this.updateValue(node, keys);
    }
  }

  updateValue(node, value, params) {
    this.i18nextDefered.promise.then(() => this._updateValue(node, value, params));
  }

  _updateValue(node, value, params) {
    if (value === null || value === undefined) {
      return;
    }

    let keys = value.split(';');
    let i = keys.length;

    while (i--) {
      let key = keys[i];

      let re = /\[([a-z\-]*)\]/g;

      let m;
      let attr = 'text';

      if (node.nodeName === 'IMG') attr = 'src';

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
        default:
          node.setAttribute(attr, this.tr(key, params));
          break;
      }
    }
  }
};