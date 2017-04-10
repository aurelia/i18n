'use strict';

System.register(['./relativeTime', 'aurelia-templating-resources', 'aurelia-binding'], function (_export, _context) {
  "use strict";

  var RelativeTime, SignalBindingBehavior, ValueConverter, RtValueConverter, RtBindingBehavior;

  

  return {
    setters: [function (_relativeTime) {
      RelativeTime = _relativeTime.RelativeTime;
    }, function (_aureliaTemplatingResources) {
      SignalBindingBehavior = _aureliaTemplatingResources.SignalBindingBehavior;
    }, function (_aureliaBinding) {
      ValueConverter = _aureliaBinding.ValueConverter;
    }],
    execute: function () {
      _export('RtValueConverter', RtValueConverter = function () {
        RtValueConverter.inject = function inject() {
          return [RelativeTime];
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
      }());

      _export('RtValueConverter', RtValueConverter);

      _export('RtBindingBehavior', RtBindingBehavior = function () {
        RtBindingBehavior.inject = function inject() {
          return [SignalBindingBehavior];
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
          sourceExpression.expression = new ValueConverter(expression, 'rt', sourceExpression.args, [expression].concat(sourceExpression.args));
        };

        RtBindingBehavior.prototype.unbind = function unbind(binding, source) {
          this.signalBindingBehavior.unbind(binding, source);
        };

        return RtBindingBehavior;
      }());

      _export('RtBindingBehavior', RtBindingBehavior);
    }
  };
});