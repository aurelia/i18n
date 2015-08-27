'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _i18n = require('./i18n');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var BaseI18N = (function () {
  _createClass(BaseI18N, null, [{
    key: 'inject',
    value: [_i18n.I18N, Element, _aureliaEventAggregator.EventAggregator],
    enumerable: true
  }]);

  function BaseI18N(i18n, element, ea) {
    var _this = this;

    _classCallCheck(this, BaseI18N);

    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function (payload) {
      _this.i18n.updateTranslations(_this.element);
    });
  }

  _createClass(BaseI18N, [{
    key: 'attached',
    value: function attached() {
      this.i18n.updateTranslations(this.element);
    }
  }, {
    key: 'detached',
    value: function detached() {
      this.__i18nDisposer();
    }
  }]);

  return BaseI18N;
})();

exports.BaseI18N = BaseI18N;