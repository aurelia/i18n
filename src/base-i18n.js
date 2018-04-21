import { I18N } from './i18n';
import { DOM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';

export class BaseI18N {

  static inject() {
    return [I18N, DOM.Element, EventAggregator];
  }

  constructor(i18n, element, ea) {
    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', () => {
      this.i18n.updateTranslations(this.element);
    });
  }

  attached() {
    this.i18n.updateTranslations(this.element);
  }

  detached() {
    this.__i18nDisposer.dispose();
  }
}
