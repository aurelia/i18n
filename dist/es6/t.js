import {I18N} from './i18n';
import {customAttribute} from 'aurelia-templating';


export class TValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, options) {
    return this.service.tr(value, options);
  }
}

@customAttribute('t')
export class TCustomAttribute {

  static inject = [Element, I18N];

  constructor(element, i18n) {
    this.element = element;
    this.service = i18n;
  }

  valueChanged() {
    if (this.element.parentElement !== undefined && this.element.parentElement !== null) {
      this.service.updateTranslations(this.element.parentElement);
    }
  }
}
