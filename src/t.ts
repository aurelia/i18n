import { I18N } from "./i18n";
import { EventAggregator, Subscription } from "aurelia-event-aggregator";
import { metadata } from "aurelia-metadata";
import { customAttribute, HtmlBehaviorResource } from "aurelia-templating";
import { SignalBindingBehavior } from "aurelia-templating-resources";
import { ValueConverter } from "aurelia-binding";
import { DOM } from "aurelia-pal";
import { LazyOptional } from "./utils";
import i18next from "i18next";

export class TValueConverter {
  static inject() { return [I18N]; }
  constructor(private service: I18N) {}

  toView(value: any, options: i18next.TranslationOptions<object> | undefined) {
    return this.service.tr(value, options);
  }
}

@customAttribute("t-params")
export class TParamsCustomAttribute {
  static inject() {
    return [DOM.Element];
  }
  static configureAliases(aliases: string[]) {
    let r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TParamsCustomAttribute);
    (r as any).aliases = aliases;
  }
  service: any;

  constructor(public element: Element) {}

  valueChanged() {

  }
}

@customAttribute("t")
export class TCustomAttribute {

  static inject() {
    return [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
  }
  static configureAliases(aliases: string[]) {
    let r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TCustomAttribute);
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

  bind() {
    this.params = this.lazyParams();

    if (this.params) {
      this.params.valueChanged = (newParams: any, oldParams: any) => {
        (this.paramsChanged as any)(this.value, newParams, oldParams);
      };
    }

    let p = this.params !== null ? this.params.value : undefined;
    this.subscription = this.ea.subscribe("i18n:locale:changed", () => {
      this.service.updateValue(this.element, this.value, this.params !== null ? this.params.value : undefined);
    });

    this.service.updateValue(this.element, this.value, p);
  }

  paramsChanged(newValue: any, newParams: any) {
    this.service.updateValue(this.element, newValue, newParams);
  }

  valueChanged(newValue: any) {
    let p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  }

  unbind() {
    // If unbind is called before timeout for subscription is triggered, subscription will be undefined
    if (this.subscription) {
      this.subscription.dispose();
    }
  }
}

export class TBindingBehavior {
  static inject = [SignalBindingBehavior];

  constructor(private signalBindingBehavior: SignalBindingBehavior) {}

  bind(binding: any, source: any) {
    // bind the signal behavior
    (this.signalBindingBehavior.bind as any)(binding, source, "aurelia-translation-signal");

    // rewrite the expression to use the TValueConverter.
    // pass through any args to the binding behavior to the TValueConverter
    let sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      "t",
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding: any, source: any) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
