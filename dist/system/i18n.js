'use strict';

System.register(['i18next'], function (_export, _context) {
  var i18next, I18N;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_i18next) {
      i18next = _i18next.default;
    }],
    execute: function () {
      _export('I18N', I18N = function () {
        function I18N(ea, signaler) {
          _classCallCheck(this, I18N);

          this.globalVars = {};

          this.i18next = i18next;
          this.ea = ea;
          this.Intl = window.Intl;
          this.signaler = signaler;
        }

        I18N.prototype.setup = function setup(options) {
          var _this = this;

          var defaultOptions = {
            compatibilityAPI: 'v1',
            compatibilityJSON: 'v1',
            lng: 'en',
            attributes: ['t', 'i18n'],
            fallbackLng: 'en',
            debug: false
          };

          return new Promise(function (resolve) {
            i18next.init(options || defaultOptions, function (err, t) {
              if (i18next.options.attributes instanceof String) {
                i18next.options.attributes = [i18next.options.attributes];
              }

              resolve(_this.i18next);
            });
          });
        };

        I18N.prototype.setLocale = function setLocale(locale) {
          var _this2 = this;

          return new Promise(function (resolve) {
            var oldLocale = _this2.getLocale();
            _this2.i18next.changeLanguage(locale, function (err, tr) {
              _this2.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
              _this2.signaler.signal('aurelia-translation-signal');
              resolve(tr);
            });
          });
        };

        I18N.prototype.getLocale = function getLocale() {
          return this.i18next.language;
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
          var i = void 0;
          var l = void 0;

          var selector = [].concat(this.i18next.options.attributes);
          for (i = 0, l = selector.length; i < l; i++) {
            selector[i] = '[' + selector[i] + ']';
          }selector = selector.join(',');

          var nodes = el.querySelectorAll(selector);
          for (i = 0, l = nodes.length; i < l; i++) {
            var node = nodes[i];
            var keys = void 0;

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
          var i = keys.length;

          while (i--) {
            var key = keys[i];

            var re = /\[([a-z\-]*)\]/g;

            var m = void 0;
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
      }());

      _export('I18N', I18N);
    }
  };
});