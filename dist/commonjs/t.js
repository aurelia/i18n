'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _i18n = require('./i18n');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTemplating = require('aurelia-templating');

var _utils = require('./utils');

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

var TParamsCustomAttribute = (function () {
  _createClass(TParamsCustomAttribute, null, [{
    key: 'inject',
    value: [Element],
    enumerable: true
  }]);

  function TParamsCustomAttribute(element) {
    _classCallCheck(this, _TParamsCustomAttribute);

    this.element = element;
  }

  _createClass(TParamsCustomAttribute, [{
    key: 'valueChanged',
    value: function valueChanged() {}
  }]);

  var _TParamsCustomAttribute = TParamsCustomAttribute;
  TParamsCustomAttribute = (0, _aureliaTemplating.customAttribute)('t-params')(TParamsCustomAttribute) || TParamsCustomAttribute;
  return TParamsCustomAttribute;
})();

exports.TParamsCustomAttribute = TParamsCustomAttribute;

var TCustomAttribute = (function () {
  _createClass(TCustomAttribute, null, [{
    key: 'inject',
    value: [Element, _i18n.I18N, _aureliaEventAggregator.EventAggregator, _utils.LazyOptional.of(TParamsCustomAttribute)],
    enumerable: true
  }]);

  function TCustomAttribute(element, i18n, ea, tparams) {
    _classCallCheck(this, _TCustomAttribute);

    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  _createClass(TCustomAttribute, [{
    key: 'bind',
    value: function bind() {
      var _this = this;

      this.params = this.lazyParams();

      setTimeout(function () {
        if (_this.params) {
          _this.params.valueChanged = function (newParams, oldParams) {
            _this.paramsChanged(_this.value, newParams, oldParams);
          };
        }

        var p = _this.params !== null ? _this.params.value : undefined;
        _this.subscription = _this.ea.subscribe('i18n:locale:changed', function () {
          _this.service.updateValue(_this.element, _this.value, p);
        });

        setTimeout(function () {
          _this.service.updateValue(_this.element, _this.value, p);
        });
      });
    }
  }, {
    key: 'paramsChanged',
    value: function paramsChanged(newValue, newParams) {
      this.service.updateValue(this.element, newValue, newParams);
    }
  }, {
    key: 'valueChanged',
    value: function valueChanged(newValue) {
      var p = this.params !== null ? this.params.value : undefined;
      this.service.updateValue(this.element, newValue, p);
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      this.subscription();
    }
  }]);

  var _TCustomAttribute = TCustomAttribute;
  TCustomAttribute = (0, _aureliaTemplating.customAttribute)('t')(TCustomAttribute) || TCustomAttribute;
  return TCustomAttribute;
})();

exports.TCustomAttribute = TCustomAttribute;