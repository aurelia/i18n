import {I18N} from './i18n';
import {customAttribute} from 'aurelia-templating';
import {Optional} from 'aurelia-dependency-injection';


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

  valueChanged(newValue, oldValue) {

  }
}

@customAttribute('t')
export class TCustomAttribute {

  static inject = [Element, I18N, Optional.of(TParamsCustomAttribute)];

  constructor(element, i18n, tparams) {
    this.element = element;
    this.service = i18n;
    this.params = tparams;
  }

  bind() {
    if (this.params) {
      this.params.valueChanged = (newParams, oldParams) => {
        this.paramsChanged(this.value, newParams, oldParams);
      };
    }

    setTimeout( () => {
      let p = this.params !== null ? this.params.value : undefined;
      this.service.updateValue(this.element, this.value, p);
    });
  }

  paramsChanged(newValue, newParams, oldParams) {
    this.service.updateValue(this.element, newValue, newParams);
  }

  valueChanged(newValue) {
    let p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  }
}
