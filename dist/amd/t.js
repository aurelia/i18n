define(['exports', './i18n', 'aurelia-event-aggregator', 'aurelia-templating', 'aurelia-templating-resources', 'aurelia-binding', './utils'], function (exports, _i18n, _aureliaEventAggregator, _aureliaTemplating, _aureliaTemplatingResources, _aureliaBinding, _utils) {
  'use strict';

  exports.__esModule = true;

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var TValueConverter = (function () {
    TValueConverter.inject = function inject() {
      return [_i18n.I18N];
    };

    function TValueConverter(i18n) {
      _classCallCheck(this, TValueConverter);

      this.service = i18n;
    }

    TValueConverter.prototype.toView = function toView(value, options) {
      return this.service.tr(value, options);
    };

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

    TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

    var _TParamsCustomAttribute = TParamsCustomAttribute;
    TParamsCustomAttribute = _aureliaTemplating.customAttribute('t-params')(TParamsCustomAttribute) || TParamsCustomAttribute;
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

    TCustomAttribute.prototype.bind = function bind() {
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
    };

    TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
      this.service.updateValue(this.element, newValue, newParams);
    };

    TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
      var p = this.params !== null ? this.params.value : undefined;
      this.service.updateValue(this.element, newValue, p);
    };

    TCustomAttribute.prototype.unbind = function unbind() {
      this.subscription.dispose();
    };

    var _TCustomAttribute = TCustomAttribute;
    TCustomAttribute = _aureliaTemplating.customAttribute('t')(TCustomAttribute) || TCustomAttribute;
    return TCustomAttribute;
  })();

  exports.TCustomAttribute = TCustomAttribute;

  var TBindingBehavior = (function () {
    _createClass(TBindingBehavior, null, [{
      key: 'inject',
      value: [_aureliaTemplatingResources.SignalBindingBehavior],
      enumerable: true
    }]);

    function TBindingBehavior(signalBindingBehavior) {
      _classCallCheck(this, TBindingBehavior);

      this.signalBindingBehavior = signalBindingBehavior;
    }

    TBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

      var sourceExpression = binding.sourceExpression;
      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
    };

    TBindingBehavior.prototype.unbind = function unbind(binding, source) {
      binding.sourceExpression.expression = binding.sourceExpression.expression.expression;

      this.signalBindingBehavior.unbind(binding, source);
    };

    return TBindingBehavior;
  })();

  exports.TBindingBehavior = TBindingBehavior;
});