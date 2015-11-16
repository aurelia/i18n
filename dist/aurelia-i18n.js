import i18n from 'i18next';
import {resolver} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {customAttribute,ViewResources} from 'aurelia-templating';
import {DefaultLoader} from 'aurelia-loader-default';

/*eslint no-irregular-whitespace: 0*/
export const translations = {
  ar: {
    translation: {
      'now': 'الآن',
      'second_ago': 'منذ __count__ ثانية',
      'second_ago_plural': 'منذ __count__ ثواني',
      'second_in': 'في __count__ ثانية',
      'second_in_plural': 'في __count__ ثواني',
      'minute_ago': 'منذ __count__ دقيقة',
      'minute_ago_plural': 'منذ __count__ دقائق',
      'minute_in': 'في __count__ دقيقة',
      'minute_in_plural': 'في __count__ دقائق',
      'hour_ago': 'منذ __count__ ساعة',
      'hour_ago_plural': 'منذ __count__ ساعات',
      'hour_in': 'في __count__ ساعة',
      'hour_in_plural': 'في __count__ ساعات',
      'day_ago': 'منذ __count__ يوم',
      'day_ago_plural': 'منذ __count__ أيام',
      'day_in': 'في __count__ يوم',
      'day_in_plural': 'في __count__ أيام'
    }
  },
  en: {
    translation: {
      'now': 'just now',
      'second_ago': '__count__ second ago',
      'second_ago_plural': '__count__ seconds ago',
      'second_in': 'in __count__ second',
      'second_in_plural': 'in __count__ seconds',
      'minute_ago': '__count__ minute ago',
      'minute_ago_plural': '__count__ minutes ago',
      'minute_in': 'in __count__ minute',
      'minute_in_plural': 'in __count__ minutes',
      'hour_ago': '__count__ hour ago',
      'hour_ago_plural': '__count__ hours ago',
      'hour_in': 'in __count__ hour',
      'hour_in_plural': 'in __count__ hours',
      'day_ago': '__count__ day ago',
      'day_ago_plural': '__count__ days ago',
      'day_in': 'in __count__ day',
      'day_in_plural': 'in __count__ days',
      'month_ago': '__count__ month ago',
      'month_ago_plural': '__count__ months ago',
      'month_in': 'in __count__ month',
      'month_in_plural': 'in __count__ months',
      'year_ago': '__count__ year ago',
      'year_ago_plural': '__count__ years ago',
      'year_in': 'in __count__ year',
      'year_in_plural': 'in __count__ years'
    }
  },
  de: {
    translation: {
      'now': 'jetzt gerade',
      'second_ago': 'vor __count__ Sekunde',
      'second_ago_plural': 'vor __count__ Sekunden',
      'second_in': 'in __count__ Sekunde',
      'second_in_plural': 'in __count__ Sekunden',
      'minute_ago': 'vor __count__ Minute',
      'minute_ago_plural': 'vor __count__ Minuten',
      'minute_in': 'in __count__ Minute',
      'minute_in_plural': 'in __count__ Minuten',
      'hour_ago': 'vor __count__ Stunde',
      'hour_ago_plural': 'vor __count__ Stunden',
      'hour_in': 'in __count__ Stunde',
      'hour_in_plural': 'in __count__ Stunden',
      'day_ago': 'vor __count__ Tag',
      'day_ago_plural': 'vor __count__ Tagen',
      'day_in': 'in __count__ Tag',
      'day_in_plural': 'in __count__ Tagen',
      'month_ago': 'vor __count__ Monat',
      'month_ago_plural': 'vor __count__ Monaten',
      'month_in': 'in __count__ Monat',
      'month_in_plural': 'in __count__ Monaten',
      'year_ago': 'vor __count__ Jahr',
      'year_ago_plural': 'vor __count__ Jahren',
      'year_in': 'in __count__ Jahr',
      'year_in_plural': 'in __count__ Jahren'
    }
  },
  nl: {
    translation: {
      'now': 'zonet',
      'second_ago': '__count__ seconde geleden',
      'second_ago_plural': '__count__ seconden geleden',
      'second_in': 'in __count__ seconde',
      'second_in_plural': 'in __count__ seconden',
      'minute_ago': '__count__ minuut geleden',
      'minute_ago_plural': '__count__ minuten geleden',
      'minute_in': 'in __count__ minuut',
      'minute_in_plural': 'in __count__ minuten',
      'hour_ago': '__count__ uur geleden',
      'hour_ago_plural': '__count__ uren geleden',
      'hour_in': 'in __count__ uur',
      'hour_in_plural': 'in __count__ uren',
      'day_ago': '__count__ dag geleden',
      'day_ago_plural': '__count__ dagen geleden',
      'day_in': 'in __count__ dag',
      'day_in_plural': 'in __count__ dagen'
    }
  },
  fr: {
    translation: {
      'now': 'juste',
      'second_ago': '__count__ seconde passé',
      'second_ago_plural': '__count__ secondes passé',
      'second_in': 'en __count__ seconde',
      'second_in_plural': 'en __count__ secondes',
      'minute_ago': '__count__ minute passé',
      'minute_ago_plural': '__count__ minutes passé',
      'minute_in': 'en __count__ minute',
      'minute_in_plural': 'en __count__ minutes',
      'hour_ago': '__count__ heure passé',
      'hour_ago_plural': '__count__ heures passé',
      'hour_in': 'en __count__ heure',
      'hour_in_plural': 'en __count__ heures',
      'day_ago': '__count__ jour passé',
      'day_ago_plural': '__count__ jours passé',
      'day_in': 'en __count__ jour',
      'day_in_plural': 'en __count__ jours'
    }
  },
  th: {
    translation: {
      'now': 'เมื่อกี้',
      'second_ago': '__count__ วินาที ที่ผ่านมา',
      'second_ago_plural': '__count__ วินาที ที่ผ่านมา',
      'second_in': 'อีก __count__ วินาที',
      'second_in_plural': 'อีก __count__ วินาที',
      'minute_ago': '__count__ นาที ที่ผ่านมา',
      'minute_ago_plural': '__count__ นาที ที่ผ่านมา',
      'minute_in': 'อีก __count__ นาที',
      'minute_in_plural': 'อีก __count__ นาที',
      'hour_ago': '__count__ ชั่วโมง ที่ผ่านมา',
      'hour_ago_plural': '__count__ ชั่วโมง ที่ผ่านมา',
      'hour_in': 'อีก __count__ ชั่วโมง',
      'hour_in_plural': 'อีก __count__ ชั่วโมง',
      'day_ago': '__count__ วัน ที่ผ่านมา',
      'day_ago_plural': '__count__ วัน ที่ผ่านมา',
      'day_in': 'อีก __count__ วัน',
      'day_in_plural': 'อีก __count__ วัน'
    }
  },
  sv: {
    translation: {
      'now': 'just nu',
      'second_ago': '__count__ sekund sedan',
      'second_ago_plural': '__count__ sekunder sedan',
      'second_in': 'om __count__ sekund',
      'second_in_plural': 'om __count__ sekunder',
      'minute_ago': '__count__ minut sedan',
      'minute_ago_plural': '__count__ minuter sedan',
      'minute_in': 'om __count__ minut',
      'minute_in_plural': 'om __count__ minuter',
      'hour_ago': '__count__ timme sedan',
      'hour_ago_plural': '__count__ timmar sedan',
      'hour_in': 'om __count__ timme',
      'hour_in_plural': 'om __count__ timmar',
      'day_ago': '__count__ dag sedan',
      'day_ago_plural': '__count__ dagar sedan',
      'day_in': 'om __count__ dag',
      'day_in_plural': 'om __count__ dagar'
    }
  },
  da: {
    translation: {
      'now': 'lige nu',
      'second_ago': '__count__ sekunder siden',
      'second_ago_plural': '__count__ sekunder siden',
      'second_in': 'om __count__ sekund',
      'second_in_plural': 'om __count__ sekunder',
      'minute_ago': '__count__ minut siden',
      'minute_ago_plural': '__count__ minutter siden',
      'minute_in': 'om __count__ minut',
      'minute_in_plural': 'om __count__ minutter',
      'hour_ago': '__count__ time siden',
      'hour_ago_plural': '__count__ timer siden',
      'hour_in': 'om __count__ time',
      'hour_in_plural': 'om __count__ timer',
      'day_ago': '__count__ dag siden',
      'day_ago_plural': '__count__ dage siden',
      'day_in': 'om __count__ dag',
      'day_in_plural': 'om __count__ dage'
    }
  },
  no: {
    translation: {
      'now': 'akkurat nå',
      'second_ago': '__count__ sekund siden',
      'second_ago_plural': '__count__ sekunder siden',
      'second_in': 'om __count__ sekund',
      'second_in_plural': 'om __count__ sekunder',
      'minute_ago': '__count__ minutt siden',
      'minute_ago_plural': '__count__ minutter siden',
      'minute_in': 'om __count__ minutt',
      'minute_in_plural': 'om __count__ minutter',
      'hour_ago': '__count__ time siden',
      'hour_ago_plural': '__count__ timer siden',
      'hour_in': 'om __count__ time',
      'hour_in_plural': 'om __count__ timer',
      'day_ago': '__count__ dag siden',
      'day_ago_plural': '__count__ dager siden',
      'day_in': 'om __count__ dag',
      'day_in_plural': 'om __count__ dager'
    }
  },
  jp: {
    translation: {
      'now': 'たった今',
      'second_ago': '__count__ 秒前',
      'second_ago_plural': '__count__ 秒前',
      'second_in': 'あと __count__ 秒',
      'second_in_plural': 'あと __count__ 秒',
      'minute_ago': '__count__ 分前',
      'minute_ago_plural': '__count__ 分前',
      'minute_in': 'あと __count__ 分',
      'minute_in_plural': 'あと __count__ 分',
      'hour_ago': '__count__ 時間前',
      'hour_ago_plural': '__count__ 時間前',
      'hour_in': 'あと __count__ 時間',
      'hour_in_plural': 'あと __count__ 時間',
      'day_ago': '__count__ 日間前',
      'day_ago_plural': '__count__ 日間前',
      'day_in': 'あと __count__ 日間',
      'day_in_plural': 'あと __count__ 日間'
    }
  }
};

export let extend = (destination, source) => {
  for (let property in source)
    destination[property] = source[property];
  return destination;
};

export let assignObjectToKeys = (root, obj) => {
  if (obj === undefined || obj === null) {
    return obj;
  }

  let opts = {};

  Object.keys(obj).map( (key) => {
    if (typeof obj[key] === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};

@resolver()
export class LazyOptional {
  constructor(key) {
    this.key = key;
  }

  get(container) {
    return () => {
      if (container.hasResolver(this.key, false)) {
        return container.get(this.key);
      }
      return null;
    };
  }

  static of(key) {
    return new LazyOptional(key);
  }
}

/*eslint no-cond-assign: 0*/
export class I18N {

  globalVars = {};

  constructor(ea, loader) {
    this.i18next = i18n;
    this.ea = ea;
    this.Intl = window.Intl;

    // check whether Intl is available, otherwise load the polyfill
    let i18nName = loader.normalizeSync('aurelia-i18n');
    let intlName = loader.normalizeSync('Intl.js', i18nName);

    if (window.Intl === undefined) {
      loader.loadModule(intlName).then( (poly) => {
        window.Intl = poly;
      });
    }
  }

  setup(options) {
    const defaultOptions = {
      resGetPath: 'locale/__lng__/__ns__.json',
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    i18n.init(options || defaultOptions);

    //make sure attributes is an array in case a string was provided
    if (i18n.options.attributes instanceof String) {
      i18n.options.attributes = [i18n.options.attributes];
    }
  }

  setLocale(locale) {
    return new Promise( resolve => {
      let oldLocale = this.getLocale();
      this.i18next.setLng(locale, tr => {
        this.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        resolve(tr);
      });
    });
  }

  getLocale() {
    return this.i18next.lng();
  }

  nf(options, locales) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  }

  df(options, locales) {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  }

  tr(key, options) {
    let fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, assignObjectToKeys('', fullOptions));
  }

  registerGlobalVariable(key, value) {
    this.globalVars[key] = value;
  }

  unregisterGlobalVariable(key) {
    delete this.globalVars[key];
  }

  /**
   * Scans an element for children that have a translation attribute and
   * updates their innerHTML with the current translation values.
   *
   * If an image is encountered the translated value will be applied to the src attribute.
   *
   * @param el    HTMLElement to search within
   */
  updateTranslations(el) {
    let i;
    let l;

    //create a selector from the specified attributes to look for
    //var selector = [].concat(this.i18next.options.attributes);
    let selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) selector[i] = '[' + selector[i] + ']';
    selector = selector.join(',');

    //get the nodes
    let nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      let node = nodes[i];
      let keys;
      //test every attribute and get the first one that has a value
      for (let i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
        keys = node.getAttribute(this.i18next.options.attributes[i2]);
        if (keys) break;
      }
      //skip if nothing was found
      if (!keys) continue;

      //split the keys into multiple keys separated by a ;
      this.updateValue(node, keys);
    }
  }

  updateValue(node, value, params) {
    if (value === null || value === undefined) {
      return;
    }

    let keys = value.split(';');

    for (let key of keys) {
      // remove the optional attribute
      let re = /\[([a-z]*)\]/g;

      let m;
      let attr = 'text';
      //set default attribute to src if this is an image node
      if (node.nodeName === 'IMG') attr = 'src';

      //check if a attribute was specified in the key
      while ((m = re.exec(key)) !== null) {
        if (m.index === re.lastIndex) {
          re.lastIndex++;
        }
        if (m) {
          key = key.replace(m[0], '');
          attr = m[1];
        }
      }

      if (!node._textContent) node._textContent = node.textContent;
      if (!node._innerHTML) node._innerHTML = node.innerHTML;

      //handle various attributes
      //anything other than text,prepend,append or html will be added as an attribute on the element.
      switch (attr) {
      case 'text':
        node.textContent = this.tr(key, params);
        break;
      case 'prepend':
        node.innerHTML = this.tr(key, params) + node._innerHTML.trim();
        break;
      case 'append':
        node.innerHTML = node._innerHTML.trim() + this.tr(key, params);
        break;
      case 'html':
        node.innerHTML = this.tr(key, params);
        break;
      default: //normal html attribute
        node.setAttribute(attr, this.tr(key, params));
        break;
      }
    }
  }
}

export class BaseI18N {

  static inject = [I18N, Element, EventAggregator];

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

export class DfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, formatOptions, locale, dateFormat) {
    let df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());

    return df.format(value);
  }
}

export class NfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, formatOptions, locale, numberFormat) {
    let nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());

    return nf.format(value);
  }
}

export class RelativeTime {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;

    let trans = translations.default || translations;

    Object.keys(trans).map( (key) => {
      let translation = trans[key].translation;
      let options = i18n.i18next.options;

      if (options.interpolationPrefix !== '__' || options.interpolationSuffix !== '__') {
        for (let subkey in translation) {
          translation[subkey] = translation[subkey].replace('__count__', options.interpolationPrefix + 'count' + options.interpolationSuffix);
        }
      }

      this.service.i18next.addResources(key, 'translation', translation);
    });
  }

  getRelativeTime(time) {
    let now = new Date();
    let diff = now.getTime() - time.getTime();

    let timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
    if (!timeDiff) {
      timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
      if (!timeDiff) {
        timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, 'hour', 3600000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, 'minute', 60000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, 'second', 1000);
              if (!timeDiff) {
                timeDiff = this.service.tr('now');
              }
            }
          }
        }
      }
    }

    return timeDiff;
  }

  getTimeDiffDescription(diff, unit, timeDivisor) {
    let unitAmount = (diff / timeDivisor).toFixed(0);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
    } else if (unitAmount < 0) {
      let abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: 'in'});
    }

    return null;
  }
}

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

export class RtValueConverter {
  static inject() { return [RelativeTime]; }
  constructor(relativeTime) {
    this.service = relativeTime;
  }

  toView(value) {
    return this.service.getRelativeTime(value);
  }
}

console.log(DefaultLoader);

function configure(frameworkConfig, cb) {
  if (cb === undefined || typeof cb !== 'function') {
    let errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
  }

  frameworkConfig.globalResources('./t');
  frameworkConfig.globalResources('./nf');
  frameworkConfig.globalResources('./df');
  frameworkConfig.globalResources('./rt');

  let instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(DefaultLoader));
  frameworkConfig.container.registerInstance(I18N, instance);

  let ret = cb(instance);

  frameworkConfig.postTask(() => {
    let resources = frameworkConfig.container.get(ViewResources);
    let htmlBehaviorResource = resources.getAttribute('t');
    let attributes = instance.i18next.options.attributes;

    // Register default attributes if none provided
    if (!attributes) {
      attributes = ['t', 'i18n'];
    }

    attributes.forEach(alias => resources.registerAttribute(alias, htmlBehaviorResource, 't'));
  });

  return ret;
}

export {
  configure,
  I18N,
  RelativeTime,
  DfValueConverter,
  NfValueConverter,
  RtValueConverter,
  TValueConverter,
  TCustomAttribute,
  TParamsCustomAttribute,
  BaseI18N,
  EventAggregator
};
