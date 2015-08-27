'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _i18n = require('./i18n');

var _aureliaTemplating = require('aurelia-templating');

var TValueConverter = (function () {
  _createClass(TValueConverter, null, [{
    key: 'inject',
    value: function inject() {
      return [_i18n.I18N];
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

exports.TValueConverter = TValueConverter;

var TCustomAttribute = (function () {
  _createClass(TCustomAttribute, null, [{
    key: 'inject',
    value: [Element, _i18n.I18N],
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
  TCustomAttribute = (0, _aureliaTemplating.customAttribute)('t')(TCustomAttribute) || TCustomAttribute;
  return TCustomAttribute;
})();

exports.TCustomAttribute = TCustomAttribute;