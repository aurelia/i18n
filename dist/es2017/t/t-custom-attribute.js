var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TCustomAttribute_1;
import { customAttribute, HtmlBehaviorResource } from "aurelia-templating";
import { EventAggregator } from "aurelia-event-aggregator";
import { metadata } from "aurelia-metadata";
import { DOM } from "aurelia-pal";
import { I18N, I18N_EA_SIGNAL } from "../i18n";
import { LazyOptional } from "../utils";
import { TParamsCustomAttribute } from "./t-params-custom-attribute";
let TCustomAttribute = TCustomAttribute_1 = class TCustomAttribute {
    constructor(element, service, ea, p) {
        this.element = element;
        this.service = service;
        this.ea = ea;
        this.lazyParams = p;
    }
    static inject() {
        return [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
    }
    static configureAliases(aliases) {
        const r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TCustomAttribute_1);
        r.aliases = aliases;
    }
    bind() {
        this.params = this.lazyParams();
        if (this.params) {
            this.params.valueChanged = (newParams, oldParams) => {
                this.paramsChanged(this.value, newParams, oldParams);
            };
        }
        const p = this.params !== null ? this.params.value : undefined;
        this.subscription = this.ea.subscribe(I18N_EA_SIGNAL, () => {
            this.service.updateValue(this.element, this.value, this.params !== null ? this.params.value : undefined);
        });
        this.service.updateValue(this.element, this.value, p);
    }
    paramsChanged(newValue, newParams) {
        this.service.updateValue(this.element, newValue, newParams);
    }
    valueChanged(newValue) {
        const p = this.params !== null ? this.params.value : undefined;
        this.service.updateValue(this.element, newValue, p);
    }
    unbind() {
        // If unbind is called before timeout for subscription is triggered, subscription will be undefined
        if (this.subscription) {
            this.subscription.dispose();
        }
    }
};
TCustomAttribute = TCustomAttribute_1 = __decorate([
    customAttribute("t")
], TCustomAttribute);
export { TCustomAttribute };
//# sourceMappingURL=t-custom-attribute.js.map