

import { I18N } from './i18n';
import { DOM } from 'aurelia-pal';
import { EventAggregator } from 'aurelia-event-aggregator';

export var BaseI18N = function () {
  BaseI18N.inject = function inject() {
    return [I18N, DOM.Element, EventAggregator];
  };

  function BaseI18N(i18n, element, ea) {
    var _this = this;

    

    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function () {
      _this.i18n.updateTranslations(_this.element);
    });
  }

  BaseI18N.prototype.attached = function attached() {
    this.i18n.updateTranslations(this.element);
  };

  BaseI18N.prototype.detached = function detached() {
    this.__i18nDisposer.dispose();
  };

  return BaseI18N;
}();