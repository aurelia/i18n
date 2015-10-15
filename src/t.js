import {I18N} from './i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {customAttribute} from 'aurelia-templating';
import {LazyOptional} from './utils';


export class TValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, options) {
    return this.service.tr(value, options);
  }
}

@customAttribute('t-params')
export class TParamsCustomAttribute {
  static inject = [Element];
  service;

  constructor(element) {
    this.element = element;
  }

  valueChanged() {

  }
}

@customAttribute('t')
export class TCustomAttribute {

  static inject = [Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];

  constructor(element, i18n, ea, tparams) {
    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  bind() {
    this.params = this.lazyParams();

    setTimeout( () => {
      if (this.params) {
        this.params.valueChanged = (newParams, oldParams) => {
          this.paramsChanged(this.value, newParams, oldParams);
        };
      }

      let p = this.params !== null ? this.params.value : undefined;
      this.subscription = this.ea.subscribe('i18n:locale:changed', () => {
        this.service.updateValue(this.element, this.value, p);
      });

      setTimeout( () => {
        this.service.updateValue(this.element, this.value, p);
      });
    });
  }

  paramsChanged(newValue, newParams) {
    this.service.updateValue(this.element, newValue, newParams);
  }

  valueChanged(newValue) {
    let p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  }

  unbind() {
    this.subscription.dispose();
  }
}
