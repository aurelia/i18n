import {
  customAttribute,
  HtmlBehaviorResource
} from "aurelia-templating";
import {
  EventAggregator,
  Subscription
} from "aurelia-event-aggregator";
import { metadata } from "aurelia-metadata";
import { DOM } from "aurelia-pal";

import {
  I18N,
  I18N_EA_SIGNAL
} from "../i18n";
import { LazyOptional } from "../utils";
import { TParamsCustomAttribute } from "./t-params-custom-attribute";

@customAttribute("t")
export class TCustomAttribute {
  public static inject() {
    return [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
  }
  public static configureAliases(aliases: string[]) {
    const r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TCustomAttribute);
    (r as any).aliases = aliases;
  }

  private params: any;
  private lazyParams: () => any;
  private subscription: Subscription;
  private value: any;

  constructor(
    private element: Element & { au: any },
    private service: I18N,
    private ea: EventAggregator,
    p: any
  ) {
    this.lazyParams = p;
  }

  public bind() {
    this.params = this.lazyParams();

    if (this.params) {
      this.params.valueChanged = (newParams: any, oldParams: any) => {
        (this.paramsChanged as any)(this.value, newParams, oldParams);
      };
    }

    this.subscription = this.ea.subscribe(I18N_EA_SIGNAL, () => {
      this.service.updateValue(this.element, this.value, this.params !== null ? this.params.value : undefined);
    });

    // Don’t update the translation if params are given, but not yet bound.
    // (Otherwise, we’ll get warnings about missing variables during interpolation.)
    // In that case, the initial translation will happen via the paramsChanged handler.
    if (!this.params || this.params.value !== undefined) {
      const p = this.params ? this.params.value : undefined;
      this.service.updateValue(this.element, this.value, p);
    }
  }

  public paramsChanged(newValue: any, newParams: any) {
    this.service.updateValue(this.element, newValue, newParams);
  }

  public valueChanged(newValue: any) {
    const p = this.params ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  }

  public unbind() {
    // If unbind is called before timeout for subscription is triggered, subscription will be undefined
    if (this.subscription) {
      this.subscription.dispose();
    }
  }
}
