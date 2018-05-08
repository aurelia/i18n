var _dec, _class, _dec2, _class2, _class3, _temp;



import { I18N } from './i18n';
import { EventAggregator } from 'aurelia-event-aggregator';
import { metadata } from 'aurelia-metadata';
import { customAttribute, HtmlBehaviorResource } from 'aurelia-templating';
import { SignalBindingBehavior } from 'aurelia-templating-resources';
import { ValueConverter } from 'aurelia-binding';
import { DOM } from 'aurelia-pal';
import { LazyOptional } from './utils';

export var TValueConverter = function () {
  TValueConverter.inject = function inject() {
    return [I18N];
  };

  function TValueConverter(i18n) {
    

    this.service = i18n;
  }

  TValueConverter.prototype.toView = function toView(value, options) {
    return this.service.tr(value, options);
  };

  return TValueConverter;
}();

export var TParamsCustomAttribute = (_dec = customAttribute('t-params'), _dec(_class = function () {
  TParamsCustomAttribute.inject = function inject() {
    return [DOM.Element];
  };

  TParamsCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TParamsCustomAttribute);
    r.aliases = aliases;
  };

  function TParamsCustomAttribute(element) {
    

    this.element = element;
  }

  TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

  return TParamsCustomAttribute;
}()) || _class);

export var TCustomAttribute = (_dec2 = customAttribute('t'), _dec2(_class2 = function () {
  TCustomAttribute.inject = function inject() {
    return [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
  };

  TCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TCustomAttribute);
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

export var TBindingBehavior = (_temp = _class3 = function () {
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
    sourceExpression.expression = new ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  TBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return TBindingBehavior;
}(), _class3.inject = [SignalBindingBehavior], _temp);