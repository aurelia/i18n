System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n', 'aurelia-templating'], function (_export) {
  var _createClass, _classCallCheck, I18N, customAttribute, TValueConverter, TCustomAttribute;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
    }],
    execute: function () {
      'use strict';

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