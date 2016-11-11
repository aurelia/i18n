'use strict';

System.register(['i18next', 'aurelia-pal', 'aurelia-event-aggregator', 'aurelia-templating-resources'], function (_export, _context) {
  "use strict";

  var i18next, DOM, EventAggregator, BindingSignaler, _class, _temp, I18N;

  

  return {
    setters: [function (_i18next) {
      i18next = _i18next;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaTemplatingResources) {
      BindingSignaler = _aureliaTemplatingResources.BindingSignaler;
    }],
    execute: function () {
      _export('I18N', I18N = (_temp = _class = function () {
        function I18N(ea, signaler) {
          var _this = this;

          

          this.globalVars = {};
          this.params = {};
          this.i18nextDefered = {
            resolve: null,
            promise: null
          };

          this.i18next = i18next;
          this.ea = ea;
          this.Intl = window.Intl;
          this.signaler = signaler;
          this.i18nextDefered.promise = new Promise(function (resolve) {
            return _this.i18nextDefered.resolve = resolve;
          });
        }

        I18N.prototype.setup = function setup(options) {
          var _this2 = this;

          var defaultOptions = {
            compatibilityAPI: 'v1',
            compatibilityJSON: 'v1',
            lng: 'en',
            attributes: ['t', 'i18n'],
            fallbackLng: 'en',
            debug: false
          };

          i18next.init(options || defaultOptions, function (err, t) {
            if (i18next.options.attributes instanceof String) {
              i18next.options.attributes = [i18next.options.attributes];
            }

            _this2.i18nextDefered.resolve(_this2.i18next);
          });

          return this.i18nextDefered.promise;
        };

        I18N.prototype.i18nextReady = function i18nextReady() {
          return this.i18nextDefered.promise;
        };

        I18N.prototype.setLocale = function setLocale(locale) {
          var _this3 = this;

          return new Promise(function (resolve) {
            var oldLocale = _this3.getLocale();
            _this3.i18next.changeLanguage(locale, function (err, tr) {
              _this3.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
              _this3.signaler.signal('aurelia-translation-signal');
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
          if (!el || !el.querySelectorAll) {
            return;
          }

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

            var re = /\[([a-z\-]*)\]/ig;

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

            attr = attr.replace(/-([a-z])/g, function (g) {
              return g[1].toUpperCase();
            });

            switch (attr) {
              case 'text':
                var newChild = DOM.createTextNode(this.tr(key, params));
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
                var prependParser = DOM.createElement('div');
                prependParser.innerHTML = this.tr(key, params);
                for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
                  if (node.childNodes[ni]._prepended) {
                    node.removeChild(node.childNodes[ni]);
                  }
                }

                for (var pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
                  prependParser.childNodes[pi]._prepended = true;
                  if (node.firstChild) {
                    node.insertBefore(prependParser.childNodes[pi], node.firstChild);
                  } else {
                    node.appendChild(prependParser.childNodes[pi]);
                  }
                }
                break;
              case 'append':
                var appendParser = DOM.createElement('div');
                appendParser.innerHTML = this.tr(key, params);
                for (var _ni = node.childNodes.length - 1; _ni >= 0; _ni--) {
                  if (node.childNodes[_ni]._appended) {
                    node.removeChild(node.childNodes[_ni]);
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
              default:
                if (node.au && node.au.controller && node.au.controller.viewModel && node.au.controller.viewModel[attr]) {
                  node.au.controller.viewModel[attr] = this.tr(key, params);
                } else {
                  node.setAttribute(attr, this.tr(key, params));
                }

                break;
            }
          }
        };

        return I18N;
      }(), _class.inject = [EventAggregator, BindingSignaler], _temp));

      _export('I18N', I18N);
    }
  };
});