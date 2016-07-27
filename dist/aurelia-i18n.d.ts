import i18next from 'i18next';
import * as LogManager from 'aurelia-logging';
import {
  resolver
} from 'aurelia-dependency-injection';
import {
  DOM
} from 'aurelia-pal';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
import {
  customAttribute
} from 'aurelia-templating';
import {
  SignalBindingBehavior
} from 'aurelia-templating-resources';
import {
  ValueConverter
} from 'aurelia-binding';

/*eslint no-irregular-whitespace: 0*/
export declare const translations: any;
export declare let extend: any;
export declare let assignObjectToKeys: any;
export declare class LazyOptional {
  constructor(key?: any);
  get(container?: any): any;
  static of(key?: any): any;
}

/*eslint no-cond-assign: 0*/
export declare class I18N {
  globalVars: any;
  params: any;
  i18nextDefered: any;
  constructor(ea?: any, signaler?: any);
  setup(options?: any): any;
  i18nextReady(): any;
  setLocale(locale?: any): any;
  getLocale(): any;
  nf(options?: any, locales?: any): any;
  uf(number?: any, locale?: any): any;
  df(options?: any, locales?: any): any;
  tr(key?: any, options?: any): any;
  registerGlobalVariable(key?: any, value?: any): any;
  unregisterGlobalVariable(key?: any): any;
  
  /**
     * Scans an element for children that have a translation attribute and
     * updates their innerHTML with the current translation values.
     *
     * If an image is encountered the translated value will be applied to the src attribute.
     *
     * @param el    HTMLElement to search within
     */
  updateTranslations(el?: any): any;
  updateValue(node?: any, value?: any, params?: any): any;
}
export declare class BaseI18N {
  static inject: any;
  constructor(i18n?: any, element?: any, ea?: any);
  attached(): any;
  detached(): any;
}
export declare class DfValueConverter {
  static inject(): any;
  constructor(i18n?: any);
  toView(value?: any, dfOrOptions?: any, locale?: any, df?: any): any;
}
export declare class NfValueConverter {
  static inject(): any;
  constructor(i18n?: any);
  toView(value?: any, nfOrOptions?: any, locale?: any, nf?: any): any;
}
export declare class RelativeTime {
  static inject(): any;
  constructor(i18n?: any, ea?: any);
  setup(locales?: any): any;
  addTranslationResource(key?: any, translation?: any): any;
  getRelativeTime(time?: any): any;
  getTimeDiffDescription(diff?: any, unit?: any, timeDivisor?: any): any;
}
export declare class TValueConverter {
  static inject(): any;
  constructor(i18n?: any);
  toView(value?: any, options?: any): any;
}
export declare class TParamsCustomAttribute {
  static inject: any;
  service: any;
  constructor(element?: any);
  valueChanged(): any;
}
export declare class TCustomAttribute {
  static inject: any;
  constructor(element?: any, i18n?: any, ea?: any, tparams?: any);
  bind(): any;
  paramsChanged(newValue?: any, newParams?: any): any;
  valueChanged(newValue?: any): any;
  unbind(): any;
}
export declare class TBindingBehavior {
  static inject: any;
  constructor(signalBindingBehavior?: any);
  bind(binding?: any, source?: any): any;
  unbind(binding?: any, source?: any): any;
}
export declare class RtValueConverter {
  static inject(): any;
  constructor(relativeTime?: any);
  toView(value?: any): any;
}