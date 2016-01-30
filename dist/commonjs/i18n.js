'use strict';

exports.__esModule = true;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _i18next = require('i18next');

var i18n = _interopRequireWildcard(_i18next);

var I18N = (function () {
  function I18N(ea, signaler) {
    _classCallCheck(this, I18N);

    this.globalVars = {};

    this.i18next = i18n;
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
  }

  I18N.prototype.setup = function setup(options) {
    var defaultOptions = {
      resGetPath: 'locale/__lng__/__ns__.json',
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    i18n.init(options || defaultOptions);

    if (i18n.options.attributes instanceof String) {
      i18n.options.attributes = [i18n.options.attributes];
    }
  };

  I18N.prototype.setLocale = function setLocale(locale) {
    var _this = this;

    return new Promise(function (resolve) {
      var oldLocale = _this.getLocale();
      _this.i18next.setLng(locale, function (tr) {
        _this.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        _this.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  };

  I18N.prototype.getLocale = function getLocale() {
    return this.i18next.lng();
  };

  I18N.prototype.nf = function nf(options, locales) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  };

  I18N.prototype.uf = function uf(number, locale) {
    var nf = this.nf({}, locale || this.getLocale());
    var comparer = nf.format(10000 / 3);

    var thousandSeparator = comparer[1];
    var decimalSeparator = comparer[5];

    var result = number.replace(thousandSeparator, '').replace(/[^\d.,-]/g, '').replace(decimalSeparator, '.');

    return Number(result);
  };

  I18N.prototype.df = function df(options, locales) {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  };

  I18N.prototype.tr = function tr(key, options) {
    var fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  };

  I18N.prototype.registerGlobalVariable = function registerGlobalVariable(key, value) {
    this.globalVars[key] = value;
  };

  I18N.prototype.unregisterGlobalVariable = function unregisterGlobalVariable(key) {
    delete this.globalVars[key];
  };

  I18N.prototype.updateTranslations = function updateTranslations(el) {
    var i = undefined;
    var l = undefined;

    var selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) selector[i] = '[' + selector[i] + ']';
    selector = selector.join(',');

    var nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      var keys = undefined;

      for (var i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
        keys = node.getAttribute(this.i18next.options.attributes[i2]);
        if (keys) break;
      }

      if (!keys) continue;

      this.updateValue(node, keys);
    }
  };

  I18N.prototype.updateValue = function updateValue(node, value, params) {
    if (value === null || value === undefined) {
      return;
    }

    var keys = value.split(';');

    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var key = _ref;

      var re = /\[([a-z]*)\]/g;

      var m = undefined;
      var attr = 'text';

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
  };

  return I18N;
})();

exports.I18N = I18N;