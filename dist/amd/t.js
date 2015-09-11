define(['exports', './i18n', 'aurelia-templating', 'aurelia-dependency-injection'], function (exports, _i18n, _aureliaTemplating, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
      value: function valueChanged(newValue, oldValue) {}
    }]);

    var _TParamsCustomAttribute = TParamsCustomAttribute;
    TParamsCustomAttribute = (0, _aureliaTemplating.customAttribute)('t-params')(TParamsCustomAttribute) || TParamsCustomAttribute;
    return TParamsCustomAttribute;
  })();

  exports.TParamsCustomAttribute = TParamsCustomAttribute;

  var TCustomAttribute = (function () {
    _createClass(TCustomAttribute, null, [{
      key: 'inject',
      value: [Element, _i18n.I18N, _aureliaDependencyInjection.Optional.of(TParamsCustomAttribute)],
      enumerable: true
    }]);

    function TCustomAttribute(element, i18n, tparams) {
      _classCallCheck(this, _TCustomAttribute);

      this.element = element;
      this.service = i18n;
      this.params = tparams;
    }

    _createClass(TCustomAttribute, [{
      key: 'bind',
      value: function bind() {
        var _this = this;

        if (this.params) {
          this.params.valueChanged = function (newParams, oldParams) {
            _this.paramsChanged(_this.value, newParams, oldParams);
          };
        }

        setTimeout(function () {
          var p = _this.params !== null ? _this.params.value : undefined;
          _this.service.updateValue(_this.element, _this.value, p);
        });
      }
    }, {
      key: 'paramsChanged',
      value: function paramsChanged(newValue, newParams, oldParams) {
        this.service.updateValue(this.element, newValue, newParams);
      }
    }, {
      key: 'valueChanged',
      value: function valueChanged(newValue) {
        var p = this.params !== null ? this.params.value : undefined;
        this.service.updateValue(this.element, newValue, p);
      }
    }]);

    var _TCustomAttribute = TCustomAttribute;
    TCustomAttribute = (0, _aureliaTemplating.customAttribute)('t')(TCustomAttribute) || TCustomAttribute;
    return TCustomAttribute;
  })();

  exports.TCustomAttribute = TCustomAttribute;
});