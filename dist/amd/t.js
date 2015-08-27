define(['exports', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n', 'aurelia-templating'], function (exports, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _i18n, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var TValueConverter = (function () {
    (0, _babelRuntimeHelpersCreateClass['default'])(TValueConverter, null, [{
      key: 'inject',
      value: function inject() {
        return [_i18n.I18N];
      }
    }]);

    function TValueConverter(i18n) {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, TValueConverter);

      this.service = i18n;
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(TValueConverter, [{
      key: 'toView',
      value: function toView(value, options) {
        return this.service.tr(value, options);
      }
    }]);
    return TValueConverter;
  })();

  exports.TValueConverter = TValueConverter;

  var TCustomAttribute = (function () {
    (0, _babelRuntimeHelpersCreateClass['default'])(TCustomAttribute, null, [{
      key: 'inject',
      value: [Element, _i18n.I18N],
      enumerable: true
    }]);

    function TCustomAttribute(element, i18n) {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, _TCustomAttribute);

      this.element = element;
      this.service = i18n;
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(TCustomAttribute, [{
      key: 'valueChanged',
      value: function valueChanged() {
        if (this.element.parentElement !== undefined && this.element.parentElement !== null) {
          this.service.updateTranslations(this.element.parentElement);
        }
      }
    }]);
    var _TCustomAttribute = TCustomAttribute;
    TCustomAttribute = (0, _aureliaTemplating.customAttribute)('t')(TCustomAttribute) || TCustomAttribute;
    return TCustomAttribute;
  })();

  exports.TCustomAttribute = TCustomAttribute;
});