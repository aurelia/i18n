var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customAttribute, HtmlBehaviorResource } from "aurelia-templating";
import { EventAggregator } from "aurelia-event-aggregator";
import { metadata } from "aurelia-metadata";
import { DOM } from "aurelia-pal";
import { I18N, I18N_EA_SIGNAL } from "../i18n";
import { LazyOptional } from "../utils";
import { TParamsCustomAttribute } from "./t-params-custom-attribute";
var TCustomAttribute = /** @class */ (function () {
    function TCustomAttribute(element, service, ea, p) {
        this.element = element;
        this.service = service;
        this.ea = ea;
        this.lazyParams = p;
    }
    TCustomAttribute_1 = TCustomAttribute;
    TCustomAttribute.inject = function () {
        return [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
    };
    TCustomAttribute.configureAliases = function (aliases) {
        var r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TCustomAttribute_1);
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
        this.subscription = this.ea.subscribe(I18N_EA_SIGNAL, function () {
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
        customAttribute("t")
    ], TCustomAttribute);
    return TCustomAttribute;
}());
export { TCustomAttribute };
//# sourceMappingURL=t-custom-attribute.js.map