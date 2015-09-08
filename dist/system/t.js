System.register(['./i18n', 'aurelia-templating'], function (_export) {
  'use strict';

  var I18N, customAttribute, TValueConverter, TCustomAttribute;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
    }],
    execute: function () {
      TValueConverter = (function () {
        _createClass(TValueConverter, null, [{
          key: 'inject',
          value: function inject() {
            return [I18N];
          }
        }]);

        function TValueConverter(i18n) {
          _classCallCheck(this, TValueConverter);

          this.service = i18n;
        }

        _createClass(TValueConverter, [{
          key: 'toView',
          value: function toView(value, options) {
            return this.service.tr(value, options);
          }
        }]);

        return TValueConverter;
      })();

      _export('TValueConverter', TValueConverter);

      TCustomAttribute = (function () {
        _createClass(TCustomAttribute, null, [{
          key: 'inject',
          value: [Element, I18N],
          enumerable: true
        }]);

        function TCustomAttribute(element, i18n) {
          _classCallCheck(this, _TCustomAttribute);

          this.element = element;
          this.service = i18n;
        }

        _createClass(TCustomAttribute, [{
          key: 'valueChanged',
          value: function valueChanged() {
            if (this.element.parentElement !== undefined && this.element.parentElement !== null) {
              this.service.updateTranslations(this.element.parentElement);
            }
          }
        }]);

        var _TCustomAttribute = TCustomAttribute;
        TCustomAttribute = customAttribute('t')(TCustomAttribute) || TCustomAttribute;
        return TCustomAttribute;
      })();

      _export('TCustomAttribute', TCustomAttribute);
    }
  };
});