'use strict';

exports.__esModule = true;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaTemplatingResources = require('aurelia-templating-resources');

var _aureliaBinding = require('aurelia-binding');

var _aureliaLoaderDefault = require('aurelia-loader-default');

var translations = {
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

exports.translations = translations;
var extend = function extend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }

  return destination;
};

exports.extend = extend;
var assignObjectToKeys = function assignObjectToKeys(root, obj) {
  if (obj === undefined || obj === null) {
    return obj;
  }

  var opts = {};

  Object.keys(obj).map(function (key) {
    if (typeof obj[key] === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};

exports.assignObjectToKeys = assignObjectToKeys;

var LazyOptional = (function () {
  function LazyOptional(key) {
    _classCallCheck(this, _LazyOptional);

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

  var _LazyOptional = LazyOptional;
  LazyOptional = _aureliaDependencyInjection.resolver()(LazyOptional) || LazyOptional;
  return LazyOptional;
})();

exports.LazyOptional = LazyOptional;

var I18N = (function () {
  function I18N(ea, signaler) {
    _classCallCheck(this, I18N);

    this.globalVars = {};

    this.i18next = _i18next2['default'];
    this.ea = ea;
    this.Intl = window.Intl;
    this.signaler = signaler;
  }

  I18N.prototype.setup = function setup(options) {
    var defaultOptions = {
      resGetPath: 'locale/__lng__/__ns__.json',
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      attributes: ['t', 'i18n'],
      fallbackLng: 'en',
      debug: false
    };

    _i18next2['default'].init(options || defaultOptions);

    if (_i18next2['default'].options.attributes instanceof String) {
      _i18next2['default'].options.attributes = [_i18next2['default'].options.attributes];
    }
  };

  I18N.prototype.setLocale = function setLocale(locale) {
    var _this2 = this;

    return new Promise(function (resolve) {
      var oldLocale = _this2.getLocale();
      _this2.i18next.setLng(locale, function (tr) {
        _this2.ea.publish('i18n:locale:changed', { oldValue: oldLocale, newValue: locale });
        _this2.signaler.signal('aurelia-translation-signal');
        resolve(tr);
      });
    });
  };

  I18N.prototype.getLocale = function getLocale() {
    return this.i18next.lng();
  };

  I18N.prototype.nf = function nf(options, locales) {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
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
    var i = undefined;
    var l = undefined;

    var selector = [].concat(this.i18next.options.attributes);
    for (i = 0, l = selector.length; i < l; i++) selector[i] = '[' + selector[i] + ']';
    selector = selector.join(',');

    var nodes = el.querySelectorAll(selector);
    for (i = 0, l = nodes.length; i < l; i++) {
      var node = nodes[i];
      var keys = undefined;

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

    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var key = _ref;

      var re = /\[([a-z]*)\]/g;

      var m = undefined;
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
        default:
          node.setAttribute(attr, this.tr(key, params));
          break;
      }
    }
  };

  return I18N;
})();

exports.I18N = I18N;

var BaseI18N = (function () {
  _createClass(BaseI18N, null, [{
    key: 'inject',
    value: [I18N, Element, _aureliaEventAggregator.EventAggregator],
    enumerable: true
  }]);

  function BaseI18N(i18n, element, ea) {
    var _this3 = this;

    _classCallCheck(this, BaseI18N);

    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function () {
      _this3.i18n.updateTranslations(_this3.element);
    });
  }

  BaseI18N.prototype.attached = function attached() {
    this.i18n.updateTranslations(this.element);
  };

  BaseI18N.prototype.detached = function detached() {
    this.__i18nDisposer.dispose();
  };

  return BaseI18N;
})();

exports.BaseI18N = BaseI18N;

var DfValueConverter = (function () {
  DfValueConverter.inject = function inject() {
    return [I18N];
  };

  function DfValueConverter(i18n) {
    _classCallCheck(this, DfValueConverter);

    this.service = i18n;
  }

  DfValueConverter.prototype.toView = function toView(value, formatOptions, locale, dateFormat) {
    var df = dateFormat || this.service.df(formatOptions, locale || this.service.getLocale());

    return df.format(value);
  };

  return DfValueConverter;
})();

exports.DfValueConverter = DfValueConverter;

var NfValueConverter = (function () {
  NfValueConverter.inject = function inject() {
    return [I18N];
  };

  function NfValueConverter(i18n) {
    _classCallCheck(this, NfValueConverter);

    this.service = i18n;
  }

  NfValueConverter.prototype.toView = function toView(value, formatOptions, locale, numberFormat) {
    var nf = numberFormat || this.service.nf(formatOptions, locale || this.service.getLocale());

    return nf.format(value);
  };

  return NfValueConverter;
})();

exports.NfValueConverter = NfValueConverter;

var RelativeTime = (function () {
  RelativeTime.inject = function inject() {
    return [I18N];
  };

  function RelativeTime(i18n) {
    var _this4 = this;

    _classCallCheck(this, RelativeTime);

    this.service = i18n;

    var trans = translations['default'] || translations;

    Object.keys(trans).map(function (key) {
      var translation = trans[key].translation;
      var options = i18n.i18next.options;

      if (options.interpolationPrefix !== '__' || options.interpolationSuffix !== '__') {
        for (var subkey in translation) {
          translation[subkey] = translation[subkey].replace('__count__', options.interpolationPrefix + 'count' + options.interpolationSuffix);
        }
      }

      _this4.service.i18next.addResources(key, 'translation', translation);
    });
  }

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
})();

exports.RelativeTime = RelativeTime;

var TValueConverter = (function () {
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
})();

exports.TValueConverter = TValueConverter;

var TParamsCustomAttribute = (function () {
  _createClass(TParamsCustomAttribute, null, [{
    key: 'inject',
    value: [Element],
    enumerable: true
  }]);

  function TParamsCustomAttribute(element) {
    _classCallCheck(this, _TParamsCustomAttribute);

    this.element = element;
  }

  TParamsCustomAttribute.prototype.valueChanged = function valueChanged() {};

  var _TParamsCustomAttribute = TParamsCustomAttribute;
  TParamsCustomAttribute = _aureliaTemplating.customAttribute('t-params')(TParamsCustomAttribute) || TParamsCustomAttribute;
  return TParamsCustomAttribute;
})();

exports.TParamsCustomAttribute = TParamsCustomAttribute;

var TCustomAttribute = (function () {
  _createClass(TCustomAttribute, null, [{
    key: 'inject',
    value: [Element, I18N, _aureliaEventAggregator.EventAggregator, LazyOptional.of(TParamsCustomAttribute)],
    enumerable: true
  }]);

  function TCustomAttribute(element, i18n, ea, tparams) {
    _classCallCheck(this, _TCustomAttribute);

    this.element = element;
    this.service = i18n;
    this.ea = ea;
    this.lazyParams = tparams;
  }

  TCustomAttribute.prototype.bind = function bind() {
    var _this5 = this;

    this.params = this.lazyParams();
    this.timers = [];

    this.timers.push(setTimeout(function () {
      if (_this5.params) {
        _this5.params.valueChanged = function (newParams, oldParams) {
          _this5.paramsChanged(_this5.value, newParams, oldParams);
        };
      }

      var p = _this5.params !== null ? _this5.params.value : undefined;
      _this5.subscription = _this5.ea.subscribe('i18n:locale:changed', function () {
        _this5.service.updateValue(_this5.element, _this5.value, p);
      });

      _this5.timers.push(setTimeout(function () {
        _this5.service.updateValue(_this5.element, _this5.value, p);
      }));
    }));
  };

  TCustomAttribute.prototype.paramsChanged = function paramsChanged(newValue, newParams) {
    this.service.updateValue(this.element, newValue, newParams);
  };

  TCustomAttribute.prototype.valueChanged = function valueChanged(newValue) {
    var p = this.params !== null ? this.params.value : undefined;
    this.service.updateValue(this.element, newValue, p);
  };

  TCustomAttribute.prototype.unbind = function unbind() {
    this.timers.forEach(function (t) {
      return clearTimeout(t);
    });

    if (this.subscription) {
      this.subscription.dispose();
    }
  };

  var _TCustomAttribute = TCustomAttribute;
  TCustomAttribute = _aureliaTemplating.customAttribute('t')(TCustomAttribute) || TCustomAttribute;
  return TCustomAttribute;
})();

exports.TCustomAttribute = TCustomAttribute;

var TBindingBehavior = (function () {
  _createClass(TBindingBehavior, null, [{
    key: 'inject',
    value: [_aureliaTemplatingResources.SignalBindingBehavior],
    enumerable: true
  }]);

  function TBindingBehavior(signalBindingBehavior) {
    _classCallCheck(this, TBindingBehavior);

    this.signalBindingBehavior = signalBindingBehavior;
  }

  TBindingBehavior.prototype.bind = function bind(binding, source) {
    this.signalBindingBehavior.bind(binding, source, 'aurelia-translation-signal');

    var sourceExpression = binding.sourceExpression;
    var expression = sourceExpression.expression;
    sourceExpression.expression = new _aureliaBinding.ValueConverter(expression, 't', sourceExpression.args, [expression].concat(sourceExpression.args));
  };

  TBindingBehavior.prototype.unbind = function unbind(binding, source) {
    binding.sourceExpression.expression = binding.sourceExpression.expression.expression;

    this.signalBindingBehavior.unbind(binding, source);
  };

  return TBindingBehavior;
})();

exports.TBindingBehavior = TBindingBehavior;

var RtValueConverter = (function () {
  RtValueConverter.inject = function inject() {
    return [RelativeTime];
  };

  function RtValueConverter(relativeTime) {
    _classCallCheck(this, RtValueConverter);

    this.service = relativeTime;
  }

  RtValueConverter.prototype.toView = function toView(value) {
    return this.service.getRelativeTime(value);
  };

  return RtValueConverter;
})();

exports.RtValueConverter = RtValueConverter;

function registerI18N(frameworkConfig, cb) {
  var instance = new I18N(frameworkConfig.container.get(_aureliaEventAggregator.EventAggregator), frameworkConfig.container.get(_aureliaTemplatingResources.BindingSignaler));
  frameworkConfig.container.registerInstance(I18N, instance);

  var ret = cb(instance);

  frameworkConfig.postTask(function () {
    var resources = frameworkConfig.container.get(_aureliaTemplating.ViewResources);
    var htmlBehaviorResource = resources.getAttribute('t');
    var htmlParamsResource = resources.getAttribute('t-params');
    var attributes = instance.i18next.options.attributes;

    if (!attributes) {
      attributes = ['t', 'i18n'];
    }

    attributes.forEach(function (alias) {
      return resources.registerAttribute(alias, htmlBehaviorResource, 't');
    });
    attributes.forEach(function (alias) {
      return resources.registerAttribute(alias + '-params', htmlParamsResource, 't-params');
    });
  });

  return ret;
}

function configure(frameworkConfig, cb) {
  if (cb === undefined || typeof cb !== 'function') {
    var errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
  }

  frameworkConfig.globalResources('./t');
  frameworkConfig.globalResources('./nf');
  frameworkConfig.globalResources('./df');
  frameworkConfig.globalResources('./rt');

  if (window.Intl === undefined) {
    var _ret = (function () {
      var loader = frameworkConfig.container.get(_aureliaLoaderDefault.DefaultLoader);

      return {
        v: loader.normalize('aurelia-i18n').then(function (i18nName) {
          return loader.normalize('Intl.js', i18nName).then(function (intlName) {
            return loader.loadModule(intlName).then(function (poly) {
              window.Intl = poly;
              return registerI18N(frameworkConfig, cb);
            });
          });
        })
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }

  return Promise.resolve(registerI18N(frameworkConfig, cb));
}

exports.configure = configure;
exports.I18N = I18N;
exports.RelativeTime = RelativeTime;
exports.DfValueConverter = DfValueConverter;
exports.NfValueConverter = NfValueConverter;
exports.RtValueConverter = RtValueConverter;
exports.TValueConverter = TValueConverter;
exports.TBindingBehavior = TBindingBehavior;
exports.TCustomAttribute = TCustomAttribute;
exports.TParamsCustomAttribute = TParamsCustomAttribute;
exports.BaseI18N = BaseI18N;
exports.EventAggregator = _aureliaEventAggregator.EventAggregator;