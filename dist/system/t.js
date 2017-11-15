'use strict';

System.register(['./i18n', 'aurelia-event-aggregator', 'aurelia-metadata', 'aurelia-templating', 'aurelia-templating-resources', 'aurelia-binding', 'aurelia-pal', './utils'], function (_export, _context) {
  "use strict";

  var I18N, EventAggregator, metadata, customAttribute, HtmlBehaviorResource, SignalBindingBehavior, ValueConverter, DOM, LazyOptional, _dec, _class, _class2, _temp, _dec2, _class3, _class4, _temp2, _class5, _temp3, TValueConverter, TParamsCustomAttribute, TCustomAttribute, TBindingBehavior;

  

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaMetadata) {
      metadata = _aureliaMetadata.metadata;
    }, function (_aureliaTemplating) {
      customAttribute = _aureliaTemplating.customAttribute;
      HtmlBehaviorResource = _aureliaTemplating.HtmlBehaviorResource;
    }, function (_aureliaTemplatingResources) {
      SignalBindingBehavior = _aureliaTemplatingResources.SignalBindingBehavior;
    }, function (_aureliaBinding) {
      ValueConverter = _aureliaBinding.ValueConverter;
    }, function (_aureliaPal) {
      DOM = _aureliaPal.DOM;
    }, function (_utils) {
      LazyOptional = _utils.LazyOptional;
    }],
    execute: function () {
      _export('TValueConverter', TValueConverter = function () {
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
      }());

      _export('TValueConverter', TValueConverter);

      _export('TParamsCustomAttribute', TParamsCustomAttribute = (_dec = customAttribute('t-params'), _dec(_class = (_temp = _class2 = function () {
        TParamsCustomAttribute.configureAliases = function configureAliases(aliases) {
          var r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TParamsCustomAttribute);
          r.aliases = aliases;
        };

        function TParamsCustomAttribute(element) {
          

          this.element = element;
        }

        TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

        return TParamsCustomAttribute;
      }(), _class2.inject = [DOM.Element], _temp)) || _class));

      _export('TParamsCustomAttribute', TParamsCustomAttribute);

      _export('TCustomAttribute', TCustomAttribute = (_dec2 = customAttribute('t'), _dec2(_class3 = (_temp2 = _class4 = function () {
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
      }(), _class4.inject = [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)], _temp2)) || _class3));

      _export('TCustomAttribute', TCustomAttribute);

      _export('TBindingBehavior', TBindingBehavior = (_temp3 = _class5 = function () {
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
      }(), _class5.inject = [SignalBindingBehavior], _temp3));

      _export('TBindingBehavior', TBindingBehavior);
    }
  };
});