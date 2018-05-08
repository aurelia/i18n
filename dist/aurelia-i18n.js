import * as LogManager from 'aurelia-logging';
import i18next from 'i18next';
import {resolver} from 'aurelia-dependency-injection';
import {DOM,PLATFORM} from 'aurelia-pal';
import {EventAggregator} from 'aurelia-event-aggregator';
import {BindingSignaler,SignalBindingBehavior} from 'aurelia-templating-resources';
import {ValueConverter} from 'aurelia-binding';
import {metadata} from 'aurelia-metadata';
import {customAttribute,HtmlBehaviorResource} from 'aurelia-templating';

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
      'day_in_plural': 'في __count__ أيام',
      'month_ago': 'منذ __count__ شهر',
      'month_ago_plural': 'منذ __count__ أشهر',
      'month_in': 'في __count__ شهر',
      'month_in_plural': 'في __count__ أشهر',
      'year_ago': 'منذ __count__ سنة',
      'year_ago_plural': 'منذ __count__ سنوات',
      'year_in': 'في __count__ سنة',
      'year_in_plural': 'في __count__ سنوات'
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
  es: {
    translation: {
      'now': 'ahora mismo',
      'second_ago': 'hace __count__ segundo',
      'second_ago_plural': 'hace __count__ segundos',
      'second_in': 'en __count__ segundo',
      'second_in_plural': 'en __count__ segundos',
      'minute_ago': 'hace __count__ minuto',
      'minute_ago_plural': 'hace __count__ minutos',
      'minute_in': 'en __count__ minuto',
      'minute_in_plural': 'en __count__ minutos',
      'hour_ago': 'hace __count__ hora',
      'hour_ago_plural': 'hace __count__ horas',
      'hour_in': 'en __count__ hora',
      'hour_in_plural': 'en __count__ horas',
      'day_ago': 'hace __count__ día',
      'day_ago_plural': 'hace __count__ días',
      'day_in': 'en __count__ día',
      'day_in_plural': 'en __count__ días',
      'month_ago': 'hace __count__ mes',
      'month_ago_plural': 'hace __count__ meses',
      'month_in': 'en __count__ mes',
      'month_in_plural': 'en __count__ meses',
      'year_ago': 'hace __count__ año',
      'year_ago_plural': 'hace __count__ años',
      'year_in': 'en __count__ año',
      'year_in_plural': 'en __count__ años'
    }
  },
  it: {
    translation: {
      'now': 'adesso',
      'second_ago': '__count__ secondo fa',
      'second_ago_plural': '__count__ secondi fa',
      'second_in': 'in __count__ secondo',
      'second_in_plural': 'in __count__ secondi',
      'minute_ago': '__count__ minuto fa',
      'minute_ago_plural': '__count__ minuti fa',
      'minute_in': 'in __count__ minuto',
      'minute_in_plural': 'in __count__ minuti',
      'hour_ago': '__count__ ora fa',
      'hour_ago_plural': '__count__ ore fa',
      'hour_in': 'in __count__ ora',
      'hour_in_plural': 'in __count__ ore',
      'day_ago': '__count__ giorno fa',
      'day_ago_plural': '__count__ giorni fa',
      'day_in': 'in __count__ giorno',
      'day_in_plural': 'in __count__ giorni',
      'month_ago': '__count__ mese fa',
      'month_ago_plural': '__count__ mesi fa',
      'month_in': 'in __count__ mese',
      'month_in_plural': 'in __count__ mesi',
      'year_ago': '__count__ anno fa',
      'year_ago_plural': '__count__ anni fa',
      'year_in': 'in __count__ anno',
      'year_in_plural': 'in __count__ anni'
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
      'day_in_plural': 'in __count__ dagen',
      'month_ago': '__count__ maand geleden',
      'month_ago_plural': '__count__ maanden geleden',
      'month_in': 'in __count__ maand',
      'month_in_plural': 'in __count__ maanden',
      'year_ago': '__count__ jaar geleden',
      'year_ago_plural': '__count__ jaren geleden',
      'year_in': 'in __count__ jaar',
      'year_in_plural': 'in __count__ jaren'
    }
  },
  fr: {
    translation: {
      'now': 'maintenant',
      'second_ago': 'il y a __count__ seconde',
      'second_ago_plural': 'il y a __count__ secondes',
      'second_in': 'dans __count__ seconde',
      'second_in_plural': 'dans __count__ secondes',
      'minute_ago': 'il y a __count__ minute',
      'minute_ago_plural': 'il y a __count__ minutes',
      'minute_in': 'dans __count__ minute',
      'minute_in_plural': 'dans __count__ minutes',
      'hour_ago': 'il y a __count__ heure',
      'hour_ago_plural': 'il y a __count__ heures',
      'hour_in': 'dans __count__ heure',
      'hour_in_plural': 'dans __count__ heures',
      'day_ago': 'il y a __count__ jour',
      'day_ago_plural': 'il y a __count__ jours',
      'day_in': 'dans __count__ jour',
      'day_in_plural': 'dans __count__ jours',
      'month_ago': 'il y a __count__ mois',
      'month_ago_plural': 'il y a __count__ mois',
      'month_in': 'dans __count__ mois',
      'month_in_plural': 'dans __count__ mois',
      'year_ago': 'il y a __count__ an',
      'year_ago_plural': 'il y a __count__ ans',
      'year_in': 'dans __count__ an',
      'year_in_plural': 'dans __count__ ans'
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
  ja: {
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
      'day_in_plural': 'あと __count__ 日間',
      'month_ago': '__count__ ヶ月前',
      'month_ago_plural': '__count__ ヶ月前',
      'month_in': 'あと __count__ ヶ月前',
      'month_in_plural': 'あと __count__ ヶ月前',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': 'あと __count__ 年',
      'year_in_plural': 'あと __count__ 年'
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
      'day_in_plural': 'あと __count__ 日間',
      'month_ago': '__count__ ヶ月前',
      'month_ago_plural': '__count__ ヶ月前',
      'month_in': 'あと __count__ ヶ月前',
      'month_in_plural': 'あと __count__ ヶ月前',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': 'あと __count__ 年',
      'year_in_plural': 'あと __count__ 年'
    }
  },
  pt: {
    translation: {
      'now': 'neste exato momento',
      'second_ago': '__count__ segundo atrás',
      'second_ago_plural': '__count__ segundos atrás',
      'second_in': 'em __count__ segundo',
      'second_in_plural': 'em __count__ segundos',
      'minute_ago': '__count__ minuto atrás',
      'minute_ago_plural': '__count__ minutos atrás',
      'minute_in': 'em __count__ minuto',
      'minute_in_plural': 'em __count__ minutos',
      'hour_ago': '__count__ hora atrás',
      'hour_ago_plural': '__count__ horas atrás',
      'hour_in': 'em __count__ hora',
      'hour_in_plural': 'em __count__ horas',
      'day_ago': '__count__ dia atrás',
      'day_ago_plural': '__count__ dias atrás',
      'day_in': 'em __count__ dia',
      'day_in_plural': 'em __count__ dias',
      'month_ago': '__count__ mês atrás',
      'month_ago_plural': '__count__ meses atrás',
      'month_in': 'em __count__ mês',
      'month_in_plural': 'em __count__ meses',
      'year_ago': '__count__ ano atrás',
      'year_ago_plural': '__count__ anos atrás',
      'year_in': 'em __count__ ano',
      'year_in_plural': 'em __count__ anos'
    }
  },
  zh: {
    translation: {
      'now': '刚才',
      'second_ago': '__count__ 秒钟前',
      'second_ago_plural': '__count__ 秒钟前',
      'second_in': '__count__ 秒内',
      'second_in_plural': '__count__ 秒内',
      'minute_ago': '__count__ 分钟前',
      'minute_ago_plural': '__count__ 分钟前',
      'minute_in': '__count__ 分钟内',
      'minute_in_plural': '__count__ 分钟内',
      'hour_ago': '__count__ 小时前',
      'hour_ago_plural': '__count__ 小时前',
      'hour_in': '__count__ 小时内',
      'hour_in_plural': '__count__ 小时内',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天内',
      'day_in_plural': '__count__ 天内',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月内',
      'month_in_plural': '__count__ 月内',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年内',
      'year_in_plural': '__count__ 年内'
    }
  },
  'zh-CN': {
    translation: {
      'now': '刚才',
      'second_ago': '__count__ 秒钟前',
      'second_ago_plural': '__count__ 秒钟前',
      'second_in': '__count__ 秒内',
      'second_in_plural': '__count__ 秒内',
      'minute_ago': '__count__ 分钟前',
      'minute_ago_plural': '__count__ 分钟前',
      'minute_in': '__count__ 分钟内',
      'minute_in_plural': '__count__ 分钟内',
      'hour_ago': '__count__ 小时前',
      'hour_ago_plural': '__count__ 小时前',
      'hour_in': '__count__ 小时内',
      'hour_in_plural': '__count__ 小时内',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天内',
      'day_in_plural': '__count__ 天内',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月内',
      'month_in_plural': '__count__ 月内',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年内',
      'year_in_plural': '__count__ 年内'
    }
  },
  'zh-HK': {
    translation: {
      'now': '剛才',
      'second_ago': '__count__ 秒鐘前',
      'second_ago_plural': '__count__ 秒鐘前',
      'second_in': '__count__ 秒內',
      'second_in_plural': '__count__ 秒內',
      'minute_ago': '__count__ 分鐘前',
      'minute_ago_plural': '__count__ 分鐘前',
      'minute_in': '__count__ 分鐘內',
      'minute_in_plural': '__count__ 分鐘內',
      'hour_ago': '__count__ 小時前',
      'hour_ago_plural': '__count__ 小時前',
      'hour_in': '__count__ 小時內',
      'hour_in_plural': '__count__ 小時內',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天內',
      'day_in_plural': '__count__ 天內',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月內',
      'month_in_plural': '__count__ 月內',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年內',
      'year_in_plural': '__count__ 年內'
    }
  },
  'zh-TW': {
    translation: {
      'now': '剛才',
      'second_ago': '__count__ 秒鐘前',
      'second_ago_plural': '__count__ 秒鐘前',
      'second_in': '__count__ 秒內',
      'second_in_plural': '__count__ 秒內',
      'minute_ago': '__count__ 分鐘前',
      'minute_ago_plural': '__count__ 分鐘前',
      'minute_in': '__count__ 分鐘內',
      'minute_in_plural': '__count__ 分鐘內',
      'hour_ago': '__count__ 小時前',
      'hour_ago_plural': '__count__ 小時前',
      'hour_in': '__count__ 小時內',
      'hour_in_plural': '__count__ 小時內',
      'day_ago': '__count__ 天前',
      'day_ago_plural': '__count__ 天前',
      'day_in': '__count__ 天內',
      'day_in_plural': '__count__ 天內',
      'month_ago': '__count__ 月前',
      'month_ago_plural': '__count__ 月前',
      'month_in': '__count__ 月內',
      'month_in_plural': '__count__ 月內',
      'year_ago': '__count__ 年前',
      'year_ago_plural': '__count__ 年前',
      'year_in': '__count__ 年內',
      'year_in_plural': '__count__ 年內'
    }
  }
};

export let extend = (destination, source) => {
  for (let property in source) {
    destination[property] = source[property];
  }

  return destination;
};

export const isInteger = Number.isInteger || function(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
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
  static inject = [EventAggregator, BindingSignaler];

  globalVars = {};
  params = {};
  i18nextDefered = {
    resolve: null,
    promise: null
  };
  i18next;
  ea: EventAggregator;

  constructor(ea, signaler) {
    this.i18next = i18next;
    this.ea = ea;
    this.Intl = PLATFORM.global.Intl;
    this.signaler = signaler;
    this.i18nextDefered.promise = new Promise((resolve) => this.i18nextDefered.resolve = resolve);
  }

  setup(options?): Promise<any> {
    const defaultOptions = {
      skipTranslationOnMissingKey: false,
      compatibilityAPI: 'v1',
      compatibilityJSON: 'v1',
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };


    i18next.init(options || defaultOptions, (err, t) => {
      //make sure attributes is an array in case a string was provided
      if (i18next.options.attributes instanceof String) {
        i18next.options.attributes = [i18next.options.attributes];
      }

      this.i18nextDefered.resolve(this.i18next);
    });

    return this.i18nextDefered.promise;
  }

  i18nextReady(): Promise<any> {
    return this.i18nextDefered.promise;
  }

  setLocale(locale): Promise<any> {
    return new Promise(resolve => {
      let oldLocale = this.getLocale();
      this.i18next.changeLanguage(locale, (err, tr) => {
        this.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        this.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  }

  getLocale(): string {
    return this.i18next.language;
  }

  nf(options?, locales?): any {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  }

  uf(number, locale?): number {
    let nf = this.nf({}, locale || this.getLocale());
    let comparer = nf.format(10000 / 3);

    let thousandSeparator = comparer[1];
    let decimalSeparator = comparer[5];

    if (thousandSeparator === '.') {
      thousandSeparator = '\\.';
    }

    // remove all thousand seperators
    let result = number.replace(new RegExp(thousandSeparator, 'g'), '')
      // remove non-numeric signs except -> , .
      .replace(/[^\d.,-]/g, '')
      // replace original decimalSeparator with english one
      .replace(decimalSeparator, '.');

    // return real number
    return Number(result);
  }

  df(options?, locales?): any {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  }

  tr(key, options?): string {
    let fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  }

  registerGlobalVariable(key, value): void {
    this.globalVars[key] = value;
  }

  unregisterGlobalVariable(key): void {
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
  updateTranslations(el): void {
    if (!el || !el.querySelectorAll) {
      return;
    }

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

    let keys = value.toString().split(';');
    let i = keys.length;

    while (i--) {
      let key = keys[i];
      // remove the optional attribute
      let re = /\[([a-z\-]*)\]/ig;

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

      // convert to camelCase
      const attrCC = attr.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
      const reservedNames = ['prepend', 'append', 'text', 'html'];
      const i18nLogger = LogManager.getLogger('i18n');

      if (reservedNames.indexOf(attr) > -1 &&
        node.au &&
        node.au.controller &&
        node.au.controller.viewModel &&
        attrCC in node.au.controller.viewModel) {
        i18nLogger.warn(`Aurelia I18N reserved attribute name\n
[${reservedNames.join(', ')}]\n
Your custom element has a bindable named ${attr} which is a reserved word.\n
If you'd like Aurelia I18N to translate your bindable instead, please consider giving it another name.`);
      }

      if (this.i18next.options.skipTranslationOnMissingKey &&
        this.tr(key, params) === key) {
        i18nLogger.warn(`Couldn't find translation for key: ${key}`);
        return;
      }

      //handle various attributes
      //anything other than text,prepend,append or html will be added as an attribute on the element.
      switch (attr) {
      case 'text':
        let newChild = DOM.createTextNode(this.tr(key, params));
        if (node._newChild && node._newChild.parentNode === node) {
          node.removeChild(node._newChild);
        }

        node._newChild = newChild;
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
        node.appendChild(node._newChild);
        break;
      case 'prepend':
        let prependParser = DOM.createElement('div');
        prependParser.innerHTML = this.tr(key, params);
        for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
          if (node.childNodes[ni]._prepended) {
            node.removeChild(node.childNodes[ni]);
          }
        }

        for (let pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
          prependParser.childNodes[pi]._prepended = true;
          if (node.firstChild) {
            node.insertBefore(prependParser.childNodes[pi], node.firstChild);
          } else {
            node.appendChild(prependParser.childNodes[pi]);
          }
        }
        break;
      case 'append':
        let appendParser = DOM.createElement('div');
        appendParser.innerHTML = this.tr(key, params);
        for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
          if (node.childNodes[ni]._appended) {
            node.removeChild(node.childNodes[ni]);
          }
        }

        while (appendParser.firstChild) {
          appendParser.firstChild._appended = true;
          node.appendChild(appendParser.firstChild);
        }
        break;
      case 'html':
        node.innerHTML = this.tr(key, params);
        break;
      default: //normal html attribute
        if (node.au &&
          node.au.controller &&
          node.au.controller.viewModel &&
          attrCC in node.au.controller.viewModel) {
          node.au.controller.viewModel[attrCC] = this.tr(key, params);
        } else {
          node.setAttribute(attr, this.tr(key, params));
        }

        break;
      }
    }
  }
}

// aurelia-i18n-loader
// an implementation of an i18next Backend that uses the aurelia loader to load the json translation files
// based on i18next-xhr-backend
//
// usage:
// aurelia.use.plugin('aurelia-i18n', (instance) => {
//    // register backend plugin
//    instance.i18next.use(Backend.with(aurelia.loader));

export class Backend {
  static loader = null; // static loader to support passing the aurelia-loader

  static with(loader) {
    this.loader = loader;
    return this;
  }

  constructor(services, options = {}) {
    this.init(services, options);
    this.type = 'backend';
  }

  init(services, options = {}) {
    this.services = services;
    this.options = defaults(options, this.options || {}, getDefaults());
  }

  readMulti(languages, namespaces, callback) {
    let loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath(languages, namespaces);
    }

    let url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

    this.loadUrl(url, callback);
  }

  read(language, namespace, callback) {
    let loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath([language], [namespace]);
    }

    let url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

    this.loadUrl(url, callback);
  }

  loadUrl(url, callback) {
    this.constructor.loader.loadText(url)
    .then(response=>{
      let ret;
      let err;
      try {
        ret = (response instanceof Object) ? response : this.options.parse(response, url);
      } catch (e) {
        err = 'failed parsing ' + url + ' to json';
      }
      if (err) return callback(err, false);
      callback(null, ret);
    },
    response=>{
      return callback('failed loading ' + url, false /* no retry */);
    });
  }

  create(languages, namespace, key, fallbackValue) {
    // create is not (yet) supported
  }
}

Backend.type = 'backend';
export default Backend;

// helper functions
let arr = [];
let each = arr.forEach;
let slice = arr.slice;

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse
  };
}

function defaults(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (let prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

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

export class DfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, dfOrOptions, locale, df) {
    if (value === null
      || typeof value === 'undefined'
      || (typeof value === 'string' && value.trim() === '')
      ) {
      return value;
    }

    if (dfOrOptions && (typeof dfOrOptions.format === 'function')) {
      return dfOrOptions.format(value);
    } else if (df) {
      let i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]');
    } else {
      df = this.service.df(dfOrOptions, locale || this.service.getLocale());
    }

    if (typeof value === 'string' && isNaN(value) && !isInteger(value)) {
      value = new Date(value);
    }

    return df.format(value);
  }
}

export class DfBindingBehavior {
  static inject() {return [SignalBindingBehavior];}

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    // bind the signal behavior
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    // rewrite the expression to use the DfValueConverter.
    // pass through any args to the binding behavior to the DfValueConverter
    let sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      'df',
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}

export class NfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, nfOrOptions, locale, nf) {
    if (value === null
      || typeof value === 'undefined'
      || (typeof value === 'string' && value.trim() === '')
      ) {
      return value;
    }

    if (nfOrOptions && (typeof nfOrOptions.format === 'function')) {
      return nfOrOptions.format(value);
    } else if (nf) {
      let i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
    } else {
      nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
    }

    return nf.format(value);
  }
}

export class NfBindingBehavior {
  static inject() {return [SignalBindingBehavior];}

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    // bind the signal behavior
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    // rewrite the expression to use the NfValueConverter.
    // pass through any args to the binding behavior to the NfValueConverter
    let sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      'nf',
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}

export class RelativeTime {
  static inject() { return [I18N, EventAggregator]; }
  constructor(i18n, ea) {
    this.service = i18n;
    this.ea = ea;

    this.service.i18nextReady().then(() => {
      this.setup();
    });
    this.ea.subscribe('i18n:locale:changed', locales => {
      this.setup(locales);
    });
  }

  setup(locales) {
    let trans = translations.default || translations;
    let fallbackLng = this.service.i18next.fallbackLng;

    let alternateFb = fallbackLng || this.service.i18next.options.fallbackLng;
    if (Array.isArray(alternateFb) && alternateFb.length > 0) {
      alternateFb = alternateFb[0];
    }

    let key = ((locales && locales.newValue)
      ? locales.newValue
      : this.service.getLocale()) || alternateFb;

    let index = 0;

    if ((index = key.indexOf('-')) >= 0) { // eslint-disable-line no-cond-assign
      let baseLocale = key.substring(0, index);

      if (trans[baseLocale]) {
        this.addTranslationResource(baseLocale, trans[baseLocale].translation);
      }
    }

    if (trans[key]) {
      this.addTranslationResource(key, trans[key].translation);
    }
    if (trans[fallbackLng]) {
      this.addTranslationResource(key, trans[fallbackLng].translation);
    }
  }

  addTranslationResource(key, translation) {
    let options = this.service.i18next.options;

    if (options.interpolation && options.interpolation.prefix !== '__' || options.interpolation.suffix !== '__') {
      for (let subkey in translation) {
        translation[subkey] = translation[subkey].replace('__count__', `${options.interpolation.prefix || '{{'}count${options.interpolation.suffix || '}}'}`);
      }
    }

    this.service.i18next.addResources(key, options.defaultNS, translation);
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
      return this.service.tr(unit, { count: abs, context: 'in' });
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
  static inject() {
    return [DOM.Element];
  }
  static configureAliases(aliases) {
    let r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TParamsCustomAttribute);
    r.aliases = aliases;
  }
  service;

  constructor(element) {
    this.element = element;
  }

  valueChanged() {

  }
}

@customAttribute('t')
export class TCustomAttribute {

  static inject() {
    return [DOM.Element, I18N, EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
  }
  static configureAliases(aliases) {
    let r = metadata.getOrCreateOwn(metadata.resource, HtmlBehaviorResource, TCustomAttribute);
    r.aliases = aliases;
  }

  constructor(element, i18n, ea, tparams) {
    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  bind() {
    this.params = this.lazyParams();

    if (this.params) {
      this.params.valueChanged = (newParams, oldParams) => {
        this.paramsChanged(this.value, newParams, oldParams);
      };
    }

    let p = this.params !== null ? this.params.value : undefined;
    this.subscription = this.ea.subscribe('i18n:locale:changed', () => {
      this.service.updateValue(this.element, this.value, this.params !== null ? this.params.value : undefined);
    });

    this.service.updateValue(this.element, this.value, p);
  }

  paramsChanged(newValue, newParams) {
    this.service.updateValue(this.element, newValue, newParams);
  }

  valueChanged(newValue) {
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

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    // bind the signal behavior
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

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
      't',
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}

export class RtValueConverter {
  static inject() { return [RelativeTime]; }
  constructor(relativeTime) {
    this.service = relativeTime;
  }

  toView(value) {
    if (value === null
      || typeof value === 'undefined'
      || (typeof value === 'string' && value.trim() === '')
      ) {
      return value;
    }

    if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  }
}

export class RtBindingBehavior {
  static inject() {return [SignalBindingBehavior];}

  constructor(signalBindingBehavior) {
    this.signalBindingBehavior = signalBindingBehavior;
  }

  bind(binding, source) {
    // bind the signal behavior
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal', 'aurelia-relativetime-signal');

    // rewrite the expression to use the RtValueConverter.
    // pass through any args to the binding behavior to the RtValueConverter
    let sourceExpression = binding.sourceExpression;

    // do create the sourceExpression only once
    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    let expression = sourceExpression.expression;
    sourceExpression.expression = new ValueConverter(
      expression,
      'rt',
      sourceExpression.args,
      [expression, ...sourceExpression.args]);
  }

  unbind(binding, source) {
    // unbind the signal behavior
    this.signalBindingBehavior.unbind(binding, source);
  }
}
