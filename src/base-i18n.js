import {I18N} from './i18n';
import {EventAggregator} from 'aurelia-event-aggregator';

export class BaseI18N {

  static inject = [I18N, Element, EventAggregator];

  constructor(i18n, element, ea) {
    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', payload => {
      this.i18n.updateTranslations(this.element);
    });
  }

  attached() {
    this.i18n.updateTranslations(this.element);
  }

  detached() {
    this.__i18nDisposer();
  }
}
