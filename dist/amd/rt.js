define(['exports', './relativeTime', 'aurelia-templating-resources', 'aurelia-binding'], function (exports, _relativeTime, _aureliaTemplatingResources, _aureliaBinding) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RtBindingBehavior = exports.RtValueConverter = undefined;

  

  var RtValueConverter = exports.RtValueConverter = function () {
    RtValueConverter.inject = function inject() {
      return [_relativeTime.RelativeTime];
    };

    function RtValueConverter(relativeTime) {
      

      this.service = relativeTime;
    }

    RtValueConverter.prototype.toView = function toView(value) {
      if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
        return value;
      }

      if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
        value = new Date(value);
      }

      return this.service.getRelativeTime(value);
    };

    return RtValueConverter;
  }();

  var RtBindingBehavior = exports.RtBindingBehavior = function () {
    RtBindingBehavior.inject = function inject() {
      return [_aureliaTemplatingResources.SignalBindingBehavior];
    };

    function RtBindingBehavior(signalBindingBehavior) {
      

      this.signalBindingBehavior = signalBindingBehavior;
    }

    RtBindingBehavior.prototype.bind = function bind(binding, source) {
      this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

      var sourceExpression = binding.sourceExpression;

      if (sourceExpression.rewritten) {
        return;
      }
      sourceExpression.rewritten = true;

      var expression = sourceExpression.expression;
      sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'rt', sourceExpression.args, [expression].concat(sourceExpression.args));
    };

    RtBindingBehavior.prototype.unbind = function unbind(binding, source) {
      this.signalBindingBehavior.unbind(binding, source);
    };

    return RtBindingBehavior;
  }();
});