'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RtBindingBehavior = exports.RtValueConverter = exports.TBindingBehavior = exports.TCustomAttribute = exports.TParamsCustomAttribute = exports.TValueConverter = exports.RelativeTime = exports.NfBindingBehavior = exports.NfValueConverter = exports.DfBindingBehavior = exports.DfValueConverter = exports.BaseI18N = exports.Backend = exports.I18N = exports.LazyOptional = exports.assignObjectToKeys = exports.isInteger = exports.extend = exports.translations = undefined;

var _dec, _class, _class2, _temp, _class3, _temp2, _class4, _temp3, _dec2, _class5, _class6, _temp4, _dec3, _class7, _class8, _temp5, _class9, _temp6;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _aureliaLogging = require('aurelia-logging');

var LogManager = _interopRequireWildcard(_aureliaLogging);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaPal = require('aurelia-pal');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTemplatingResources = require('aurelia-templating-resources');

var _aureliaBinding = require('aurelia-binding');

var _aureliaMetadata = require('aurelia-metadata');

var _aureliaTemplating = require('aurelia-templating');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var translations = exports.translations = {
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
      'second_ago': '__count__ seconde plus tôt',
      'second_ago_plural': '__count__ secondes plus tôt',
      'second_in': 'en __count__ seconde',
      'second_in_plural': 'en __count__ secondes',
      'minute_ago': '__count__ minute plus tôt',
      'minute_ago_plural': '__count__ minutes plus tôt',
      'minute_in': 'en __count__ minute',
      'minute_in_plural': 'en __count__ minutes',
      'hour_ago': '__count__ heure plus tôt',
      'hour_ago_plural': '__count__ heures plus tôt',
      'hour_in': 'en __count__ heure',
      'hour_in_plural': 'en __count__ heures',
      'day_ago': '__count__ jour plus tôt',
      'day_ago_plural': '__count__ jours plus tôt',
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

var extend = exports.extend = function extend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }

  return destination;
};

var isInteger = exports.isInteger = Number.isInteger || function (value) {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
};

var assignObjectToKeys = exports.assignObjectToKeys = function assignObjectToKeys(root, obj) {
  if (obj === undefined || obj === null) {
    return obj;
  }

  var opts = {};

  Object.keys(obj).map(function (key) {
    if (_typeof(obj[key]) === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};

var LazyOptional = exports.LazyOptional = (_dec = (0, _aureliaDependencyInjection.resolver)(), _dec(_class = function () {
  function LazyOptional(key) {
    _classCallCheck(this, LazyOptional);

    this.key = key;
  }

  LazyOptional.prototype.get = function get(container) {
    var _this = this;

    return function () {
      if (container.hasResolver(_this.key, false)) {
        return container.get(_this.key);
      }
      return null;
    };
  };

  LazyOptional.of = function of(key) {
    return new LazyOptional(key);
  };

  return LazyOptional;
}()) || _class);
var I18N = exports.I18N = (_temp = _class2 = function () {
  function I18N(ea, signaler) {
    var _this2 = this;

    _classCallCheck(this, I18N);

    this.globalVars = {};
    this.params = {};
    this.i18nextDefered = {
      resolve: null,
      promise: null
    };

    this.i18next = _i18next2.default;
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
    this.i18nextDefered.promise = new Promise(function (resolve) {
      return _this2.i18nextDefered.resolve = resolve;
    });
  }

  I18N.prototype.setup = function setup(options) {
    var _this3 = this;

    var defaultOptions = {
      compatibilityAPI: 'v1',
      compatibilityJSON: 'v1',
      lng: 'en',
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    _i18next2.default.init(options || defaultOptions, function (err, t) {
      if (_i18next2.default.options.attributes instanceof String) {
        _i18next2.default.options.attributes = [_i18next2.default.options.attributes];
      }

      _this3.i18nextDefered.resolve(_this3.i18next);
    });

    return this.i18nextDefered.promise;
  };

  I18N.prototype.i18nextReady = function i18nextReady() {
    return this.i18nextDefered.promise;
  };

  I18N.prototype.setLocale = function setLocale(locale) {
    var _this4 = this;

    return new Promise(function (resolve) {
      var oldLocale = _this4.getLocale();
      _this4.i18next.changeLanguage(locale, function (err, tr) {
        _this4.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        _this4.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  };

  I18N.prototype.getLocale = function getLocale() {
    return this.i18next.language;
  };

  I18N.prototype.nf = function nf(options, locales) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  };

  I18N.prototype.uf = function uf(number, locale) {
    var nf = this.nf({}, locale || this.getLocale());
    var comparer = nf.format(10000 / 3);

    var thousandSeparator = comparer[1];
    var decimalSeparator = comparer[5];

    if (thousandSeparator === '.') {
      thousandSeparator = '\\.';
    }

    var result = number.replace(new RegExp(thousandSeparator, 'g'), '').replace(/[^\d.,-]/g, '').replace(decimalSeparator, '.');

    return Number(result);
  };

  I18N.prototype.df = function df(options, locales) {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  };

  I18N.prototype.tr = function tr(key, options) {
    var fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  };

  I18N.prototype.registerGlobalVariable = function registerGlobalVariable(key, value) {
    this.globalVars[key] = value;
  };

  I18N.prototype.unregisterGlobalVariable = function unregisterGlobalVariable(key) {
    delete this.globalVars[key];
  };

  I18N.prototype.updateTranslations = function updateTranslations(el) {
    if (!el || !el.querySelectorAll) {
      return;
    }

    var i = void 0;
    var l = void 0;

    var selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) {
      selector[i] = '[' + selector[i] + ']';
    }selector = selector.join(',');

    var nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      var keys = void 0;

      for (var i2 = 0, l2 = this.i18next.options.attributes.length; i2 < l2; i2++) {
        keys = node.getAttribute(this.i18next.options.attributes[i2]);
        if (keys) break;
      }

      if (!keys) continue;

      this.updateValue(node, keys);
    }
  };

  I18N.prototype.updateValue = function updateValue(node, value, params) {
    if (value === null || value === undefined) {
      return;
    }

    var keys = value.split(';');
    var i = keys.length;

    while (i--) {
      var key = keys[i];

      var re = /\[([a-z\-]*)\]/ig;

      var m = void 0;
      var attr = 'text';

      if (node.nodeName === 'IMG') attr = 'src';

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

      var attrCC = attr.replace(/-([a-z])/g, function (g) {
        return g[1].toUpperCase();
      });
      var reservedNames = ['prepend', 'append', 'text', 'html'];
      if (reservedNames.indexOf(attr) > -1 && node.au && node.au.controller && node.au.controller.viewModel && attrCC in node.au.controller.viewModel) {
        var i18nLogger = LogManager.getLogger('i18n');
        i18nLogger.warn('Aurelia I18N reserved attribute name\n\n[' + reservedNames.join(', ') + ']\n\nYour custom element has a bindable named ' + attr + ' which is a reserved word.\n\nIf you\'d like Aurelia I18N to translate your bindable instead, please consider giving it another name.');
      }

      switch (attr) {
        case 'text':
          var newChild = _aureliaPal.DOM.createTextNode(this.tr(key, params));
          if (node._newChild) {
            node.removeChild(node._newChild);
          }

          node._newChild = newChild;
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
          node.appendChild(node._newChild);
          break;
        case 'prepend':
          var prependParser = _aureliaPal.DOM.createElement('div');
          prependParser.innerHTML = this.tr(key, params);
          for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
            if (node.childNodes[ni]._prepended) {
              node.removeChild(node.childNodes[ni]);
            }
          }

          for (var pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
            prependParser.childNodes[pi]._prepended = true;
            if (node.firstChild) {
              node.insertBefore(prependParser.childNodes[pi], node.firstChild);
            } else {
              node.appendChild(prependParser.childNodes[pi]);
            }
          }
          break;
        case 'append':
          var appendParser = _aureliaPal.DOM.createElement('div');
          appendParser.innerHTML = this.tr(key, params);
          for (var _ni = node.childNodes.length - 1; _ni >= 0; _ni--) {
            if (node.childNodes[_ni]._appended) {
              node.removeChild(node.childNodes[_ni]);
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
        default:
          if (node.au && node.au.controller && node.au.controller.viewModel && attrCC in node.au.controller.viewModel) {
            node.au.controller.viewModel[attrCC] = this.tr(key, params);
          } else {
            node.setAttribute(attr, this.tr(key, params));
          }

          break;
      }
    }
  };

  return I18N;
}(), _class2.inject = [_aureliaEventAggregator.EventAggregator, _aureliaTemplatingResources.BindingSignaler], _temp);
var Backend = exports.Backend = (_temp2 = _class3 = function () {
  Backend.with = function _with(loader) {
    this.loader = loader;
    return this;
  };

  function Backend(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Backend);

    this.init(services, options);
    this.type = 'backend';
  }

  Backend.prototype.init = function init(services) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    this.services = services;
    this.options = defaults(options, this.options || {}, getDefaults());
  };

  Backend.prototype.readMulti = function readMulti(languages, namespaces, callback) {
    var loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath(languages, namespaces);
    }

    var url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

    this.loadUrl(url, callback);
  };

  Backend.prototype.read = function read(language, namespace, callback) {
    var loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === 'function') {
      loadPath = this.options.loadPath([language], [namespace]);
    }

    var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

    this.loadUrl(url, callback);
  };

  Backend.prototype.loadUrl = function loadUrl(url, callback) {
    var _this5 = this;

    this.constructor.loader.loadText(url).then(function (response) {
      var ret = void 0;
      var err = void 0;
      try {
        ret = _this5.options.parse(response, url);
      } catch (e) {
        err = 'failed parsing ' + url + ' to json';
      }
      if (err) return callback(err, false);
      callback(null, ret);
    }, function (response) {
      return callback('failed loading ' + url, false);
    });
  };

  Backend.prototype.create = function create(languages, namespace, key, fallbackValue) {};

  return Backend;
}(), _class3.loader = null, _temp2);


Backend.type = 'backend';
exports.default = Backend;

var arr = [];
var each = arr.forEach;
var slice = arr.slice;

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse
  };
}

function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

var BaseI18N = exports.BaseI18N = (_temp3 = _class4 = function () {
  function BaseI18N(i18n, element, ea) {
    var _this6 = this;

    _classCallCheck(this, BaseI18N);

    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function () {
      _this6.i18n.updateTranslations(_this6.element);
    });
  }

  BaseI18N.prototype.attached = function attached() {
    this.i18n.updateTranslations(this.element);
  };

  BaseI18N.prototype.detached = function detached() {
    this.__i18nDisposer.dispose();
  };

  return BaseI18N;
}(), _class4.inject = [I18N, Element, _aureliaEventAggregator.EventAggregator], _temp3);

var DfValueConverter = exports.DfValueConverter = function () {
  DfValueConverter.inject = function inject() {
    return [I18N];
  };

  function DfValueConverter(i18n) {
    _classCallCheck(this, DfValueConverter);

    this.service = i18n;
  }

  DfValueConverter.prototype.toView = function toView(value, dfOrOptions, locale, df) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (dfOrOptions && typeof dfOrOptions.format === 'function') {
      return dfOrOptions.format(value);
    } else if (df) {
      var i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]');
    } else {
      df = this.service.df(dfOrOptions, locale || this.service.getLocale());
    }

    if (typeof value === 'string' && isNaN(value) && !isInteger(value)) {
      value = new Date(value);
    }

    return df.format(value);
  };

  return DfValueConverter;
}();

var DfBindingBehavior = exports.DfBindingBehavior = function () {
  DfBindingBehavior.inject = function inject() {
    return [_aureliaTemplatingResources.SignalBindingBehavior];
  };

  function DfBindingBehavior(signalBindingBehavior) {
    _classCallCheck(this, DfBindingBehavior);

    this.signalBindingBehavior = signalBindingBehavior;
  }

  DfBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'df', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  DfBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return DfBindingBehavior;
}();

var NfValueConverter = exports.NfValueConverter = function () {
  NfValueConverter.inject = function inject() {
    return [I18N];
  };

  function NfValueConverter(i18n) {
    _classCallCheck(this, NfValueConverter);

    this.service = i18n;
  }

  NfValueConverter.prototype.toView = function toView(value, nfOrOptions, locale, nf) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (nfOrOptions && typeof nfOrOptions.format === 'function') {
      return nfOrOptions.format(value);
    } else if (nf) {
      var i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
    } else {
      nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
    }

    return nf.format(value);
  };

  return NfValueConverter;
}();

var NfBindingBehavior = exports.NfBindingBehavior = function () {
  NfBindingBehavior.inject = function inject() {
    return [_aureliaTemplatingResources.SignalBindingBehavior];
  };

  function NfBindingBehavior(signalBindingBehavior) {
    _classCallCheck(this, NfBindingBehavior);

    this.signalBindingBehavior = signalBindingBehavior;
  }

  NfBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'nf', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  NfBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return NfBindingBehavior;
}();

var RelativeTime = exports.RelativeTime = function () {
  RelativeTime.inject = function inject() {
    return [I18N, _aureliaEventAggregator.EventAggregator];
  };

  function RelativeTime(i18n, ea) {
    var _this7 = this;

    _classCallCheck(this, RelativeTime);

    this.service = i18n;
    this.ea = ea;

    this.service.i18nextReady().then(function () {
      _this7.setup();
    });
    this.ea.subscribe('i18n:locale:changed', function (locales) {
      _this7.setup(locales);
    });
  }

  RelativeTime.prototype.setup = function setup(locales) {
    var trans = translations.default || translations;
    var key = locales && locales.newValue ? locales.newValue : this.service.getLocale();
    var fallbackLng = this.service.i18next.fallbackLng;
    var index = 0;

    if ((index = key.indexOf('-')) >= 0) {
      var baseLocale = key.substring(0, index);

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
  };

  RelativeTime.prototype.addTranslationResource = function addTranslationResource(key, translation) {
    var options = this.service.i18next.options;

    if (options.interpolation && options.interpolation.prefix !== '__' || options.interpolation.suffix !== '__') {
      for (var subkey in translation) {
        translation[subkey] = translation[subkey].replace('__count__', (options.interpolation.prefix || '{{') + 'count' + (options.interpolation.suffix || '}}'));
      }
    }

    this.service.i18next.addResources(key, options.defaultNS, translation);
  };

  RelativeTime.prototype.getRelativeTime = function getRelativeTime(time) {
    var now = new Date();
    var diff = now.getTime() - time.getTime();

    var timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
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
  };

  RelativeTime.prototype.getTimeDiffDescription = function getTimeDiffDescription(diff, unit, timeDivisor) {
    var unitAmount = (diff / timeDivisor).toFixed(0);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
    } else if (unitAmount < 0) {
      var abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: 'in' });
    }

    return null;
  };

  return RelativeTime;
}();

var TValueConverter = exports.TValueConverter = function () {
  TValueConverter.inject = function inject() {
    return [I18N];
  };

  function TValueConverter(i18n) {
    _classCallCheck(this, TValueConverter);

    this.service = i18n;
  }

  TValueConverter.prototype.toView = function toView(value, options) {
    return this.service.tr(value, options);
  };

  return TValueConverter;
}();

var TParamsCustomAttribute = exports.TParamsCustomAttribute = (_dec2 = (0, _aureliaTemplating.customAttribute)('t-params'), _dec2(_class5 = (_temp4 = _class6 = function () {
  TParamsCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, _aureliaTemplating.HtmlBehaviorResource, TParamsCustomAttribute);
    r.aliases = aliases;
  };

  function TParamsCustomAttribute(element) {
    _classCallCheck(this, TParamsCustomAttribute);

    this.element = element;
  }

  TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

  return TParamsCustomAttribute;
}(), _class6.inject = [Element], _temp4)) || _class5);
var TCustomAttribute = exports.TCustomAttribute = (_dec3 = (0, _aureliaTemplating.customAttribute)('t'), _dec3(_class7 = (_temp5 = _class8 = function () {
  TCustomAttribute.configureAliases = function configureAliases(aliases) {
    var r = _aureliaMetadata.metadata.getOrCreateOwn(_aureliaMetadata.metadata.resource, _aureliaTemplating.HtmlBehaviorResource, TCustomAttribute);
    r.aliases = aliases;
  };

  function TCustomAttribute(element, i18n, ea, tparams) {
    _classCallCheck(this, TCustomAttribute);

    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  TCustomAttribute.prototype.bind = function bind() {
    var _this8 = this;

    this.params = this.lazyParams();

    if (this.params) {
      this.params.valueChanged = function (newParams, oldParams) {
        _this8.paramsChanged(_this8.value, newParams, oldParams);
      };
    }

    var p = this.params !== null ? this.params.value : undefined;
    this.subscription = this.ea.subscribe('i18n:locale:changed', function () {
      _this8.service.updateValue(_this8.element, _this8.value, _this8.params !== null ? _this8.params.value : undefined);
    });

    this.service.updateValue(this.element, this.value, p);
  };

  TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
    this.service.updateValue(this.element, newValue, newParams);
  };

  TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
    var p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  };

  TCustomAttribute.prototype.unbind = function unbind() {
    if (this.subscription) {
      this.subscription.dispose();
    }
  };

  return TCustomAttribute;
}(), _class8.inject = [Element, I18N, _aureliaEventAggregator.EventAggregator, LazyOptional.of(TParamsCustomAttribute)], _temp5)) || _class7);
var TBindingBehavior = exports.TBindingBehavior = (_temp6 = _class9 = function () {
  function TBindingBehavior(signalBindingBehavior) {
    _classCallCheck(this, TBindingBehavior);

    this.signalBindingBehavior = signalBindingBehavior;
  }

  TBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  TBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return TBindingBehavior;
}(), _class9.inject = [_aureliaTemplatingResources.SignalBindingBehavior], _temp6);

var RtValueConverter = exports.RtValueConverter = function () {
  RtValueConverter.inject = function inject() {
    return [RelativeTime];
  };

  function RtValueConverter(relativeTime) {
    _classCallCheck(this, RtValueConverter);

    this.service = relativeTime;
  }

  RtValueConverter.prototype.toView = function toView(value) {
    if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
      return value;
    }

    if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
      value = new Date(value);
    }

    return this.service.getRelativeTime(value);
  };

  return RtValueConverter;
}();

var RtBindingBehavior = exports.RtBindingBehavior = function () {
  RtBindingBehavior.inject = function inject() {
    return [_aureliaTemplatingResources.SignalBindingBehavior];
  };

  function RtBindingBehavior(signalBindingBehavior) {
    _classCallCheck(this, RtBindingBehavior);

    this.signalBindingBehavior = signalBindingBehavior;
  }

  RtBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;

    if (sourceExpression.rewritten) {
      return;
    }
    sourceExpression.rewritten = true;

    var expression = sourceExpression.expression;
    sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 'rt', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  RtBindingBehavior.prototype.unbind = function unbind(binding, source) {
    this.signalBindingBehavior.unbind(binding, source);
  };

  return RtBindingBehavior;
}();