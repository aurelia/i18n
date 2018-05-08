'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TBindingBehavior = exports.TCustomAttribute = exports.TParamsCustomAttribute = exports.TValueConverter = undefined;

var _dec, _class, _dec2, _class2, _class3, _temp;

var _i18n = require('./i18n');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaTemplatingResources = require('aurelia-templating-resources');

var _aureliaBinding = require('aurelia-binding');

var _aureliaPal = require('aurelia-pal');

var _utils = require('./utils');



var TValueConverter = exports.TValueConverter = function () {
  TValueConverter.inject = function inject() {
    return [_i18n.I18N];
  };

  function TValueConverter(i18n) {
    

    this.service = i18n;
  }

  TValueConverter.prototype.toView = function toView(value, options) {
    return this.service.tr(value, options);
  };

  return TValueConverter;
}();

var TParamsCustomAttribute = exports.TParamsCustomAttribute = (_dec = (0, _aureliaTemplating.customAttribute)('t-params'), _dec(_class = function () {
  TParamsCustomAttribute.inject = function inject() {
    return [_aureliaPal.DOM.Element];
  };

  TParamsCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, _aureliaTemplating.HtmlBehaviorResource, TParamsCustomAttribute);
    r.aliases = aliases;
  };

  function TParamsCustomAttribute(element) {
    

    this.element = element;
  }

  TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

  return TParamsCustomAttribute;
}()) || _class);
var TCustomAttribute = exports.TCustomAttribute = (_dec2 = (0, _aureliaTemplating.customAttribute)('t'), _dec2(_class2 = function () {
  TCustomAttribute.inject = function inject() {
    return [_aureliaPal.DOM.Element, _i18n.I18N, _aureliaEventAggregator.EventAggregator, _utils.LazyOptional.of(TParamsCustomAttribute)];
  };

  TCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, _aureliaTemplating.HtmlBehaviorResource, TCustomAttribute);
    r.aliases = aliases;
  };

  function TCustomAttribute(element, i18n, ea, tparams) {
    

    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  TCustomAttribute.prototype.bind = function bind() {
    var _this = this;

    this.params = this.lazyParams();

    if (this.params) {
      this.params.valueChanged = function (newParams, oldParams) {
        _this.paramsChanged(_this.value, newParams, oldParams);
      };
    }

    var p = this.params !== null ? this.params.value : undefined;
    this.subscription = this.ea.subscribe('i18n:locale:changed', function () {
      _this.service.updateValue(_this.element, _this.value, _this.params !== null ? _this.params.value : undefined);
    });

    this.service.updateValue(this.element, this.value, p);
  };

  TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
    this.service.updateValue(this.element, newValue, newParams);
  };

  TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
    var p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  };

  TCustomAttribute.prototype.unbind = function unbind() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  };

  return TCustomAttribute;
}()) || _class2);
var TBindingBehavior = exports.TBindingBehavior = (_temp = _class3 = function () {
  function TBindingBehavior(signalBindingBehavior) {
    

    this.signalBindingBehavior = signalBindingBehavior;
  }

  TBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  TBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return TBindingBehavior;
}(), _class3.inject = [_aureliaTemplatingResources.SignalBindingBehavior], _temp);