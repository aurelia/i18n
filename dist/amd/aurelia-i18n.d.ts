declare module 'aurelia-i18n' {
  import i18n from 'i18next';
  import { resolver }  from 'aurelia-dependency-injection';
  import { EventAggregator }  from 'aurelia-event-aggregator';
  import { customAttribute, ViewResources }  from 'aurelia-templating';
  import { DefaultLoader }  from 'aurelia-loader-default';
  
  /*eslint no-irregular-whitespace: 0*/
  export const translations: any;
  export let extend: any;
  export let assignObjectToKeys: any;
  export class LazyOptional {
    constructor(key: any);
    get(container: any): any;
    static of(key: any): any;
  }
  
  /*eslint no-cond-assign: 0*/
  export class I18N {
    globalVars: any;
    constructor(ea: any, loader: any);
    setup(options: any): any;
    setLocale(locale: any): any;
    getLocale(): any;
    nf(options: any, locales: any): any;
    df(options: any, locales: any): any;
    tr(key: any, options: any): any;
    registerGlobalVariable(key: any, value: any): any;
    unregisterGlobalVariable(key: any): any;
    
    /**
       * Scans an element for children that have a translation attribute and
       * updates their innerHTML with the current translation values.
       *
       * If an image is encountered the translated value will be applied to the src attribute.
       *
       * @param el    HTMLElement to search within
       */
    updateTranslations(el: any): any;
    updateValue(node: any, value: any, params: any): any;
  }
  export class BaseI18N {
    static inject: any;
    constructor(i18n: any, element: any, ea: any);
    attached(): any;
    detached(): any;
  }
  export class DfValueConverter {
    static inject(): any;
    constructor(i18n: any);
    toView(value: any, formatOptions: any, locale: any, dateFormat: any): any;
  }
  export class NfValueConverter {
    static inject(): any;
    constructor(i18n: any);
    toView(value: any, formatOptions: any, locale: any, numberFormat: any): any;
  }
  export class RelativeTime {
    static inject(): any;
    constructor(i18n: any);
    getRelativeTime(time: any): any;
    getTimeDiffDescription(diff: any, unit: any, timeDivisor: any): any;
  }
  export class TValueConverter {
    static inject(): any;
    constructor(i18n: any);
    toView(value: any, options: any): any;
  }
  export class TParamsCustomAttribute {
    static inject: any;
    service: any;
    constructor(element: any);
    valueChanged(): any;
  }
  export class TCustomAttribute {
    static inject: any;
    constructor(element: any, i18n: any, ea: any, tparams: any);
    bind(): any;
    paramsChanged(newValue: any, newParams: any): any;
    valueChanged(newValue: any): any;
    unbind(): any;
  }
  export class RtValueConverter {
    static inject(): any;
    constructor(relativeTime: any);
    toView(value: any): any;
  }
}