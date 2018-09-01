var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-templating", "aurelia-event-aggregator", "aurelia-metadata", "aurelia-pal", "../i18n", "../utils", "./t-params-custom-attribute"], function (require, exports, aurelia_templating_1, aurelia_event_aggregator_1, aurelia_metadata_1, aurelia_pal_1, i18n_1, utils_1, t_params_custom_attribute_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TCustomAttribute = /** @class */ (function () {
        function TCustomAttribute(element, service, ea, p) {
            this.element = element;
            this.service = service;
            this.ea = ea;
            this.lazyParams = p;
        }
        TCustomAttribute_1 = TCustomAttribute;
        TCustomAttribute.inject = function () {
            return [aurelia_pal_1.DOM.Element, i18n_1.I18N, aurelia_event_aggregator_1.EventAggregator, utils_1.LazyOptional.of(t_params_custom_attribute_1.TParamsCustomAttribute)];
        };
        TCustomAttribute.configureAliases = function (aliases) {
            var r = aurelia_metadata_1.metadata.getOrCreateOwn(aurelia_metadata_1.metadata.resource, aurelia_templating_1.HtmlBehaviorResource, TCustomAttribute_1);
            r.aliases = aliases;
        };
        TCustomAttribute.prototype.bind = function () {
            var _this = this;
            this.params = this.lazyParams();
            if (this.params) {
                this.params.valueChanged = function (newParams, oldParams) {
                    _this.paramsChanged(_this.value, newParams, oldParams);
                };
            }
            var p = this.params !== null ? this.params.value : undefined;
            this.subscription = this.ea.subscribe(i18n_1.I18N_EA_SIGNAL, function () {
                _this.service.updateValue(_this.element, _this.value, _this.params !== null ? _this.params.value : undefined);
            });
            this.service.updateValue(this.element, this.value, p);
        };
        TCustomAttribute.prototype.paramsChanged = function (newValue, newParams) {
            this.service.updateValue(this.element, newValue, newParams);
        };
        TCustomAttribute.prototype.valueChanged = function (newValue) {
            var p = this.params !== null ? this.params.value : undefined;
            this.service.updateValue(this.element, newValue, p);
        };
        TCustomAttribute.prototype.unbind = function () {
            // If unbind is called before timeout for subscription is triggered, subscription will be undefined
            if (this.subscription) {
                this.subscription.dispose();
            }
        };
        var TCustomAttribute_1;
        TCustomAttribute = TCustomAttribute_1 = __decorate([
            aurelia_templating_1.customAttribute("t")
        ], TCustomAttribute);
        return TCustomAttribute;
    }());
    exports.TCustomAttribute = TCustomAttribute;
});
//# sourceMappingURL=t-custom-attribute.js.map