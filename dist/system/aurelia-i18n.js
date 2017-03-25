'use strict';

System.register(['aurelia-logging', 'aurelia-event-aggregator', 'aurelia-templating', 'aurelia-loader', 'aurelia-templating-resources', 'aurelia-pal', './i18n', './relativeTime', './df', './nf', './rt', './t', './base-i18n', './aurelia-i18n-loader'], function (_export, _context) {
  "use strict";

  var LogManager, EventAggregator, ViewResources, Loader, BindingSignaler, PLATFORM, I18N, RelativeTime, DfValueConverter, NfValueConverter, RtValueConverter, TValueConverter, TBindingBehavior, TCustomAttribute, TParamsCustomAttribute, BaseI18N, Backend, _typeof;

  function registerI18N(frameworkConfig, cb) {
    var instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(BindingSignaler));
    frameworkConfig.container.registerInstance(I18N, instance);

    var ret = cb(instance);

    frameworkConfig.postTask(function () {
      var resources = frameworkConfig.container.get(ViewResources);
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

    frameworkConfig.globalResources(PLATFORM.moduleName('./t'));
    frameworkConfig.globalResources(PLATFORM.moduleName('./nf'));
    frameworkConfig.globalResources(PLATFORM.moduleName('./df'));
    frameworkConfig.globalResources(PLATFORM.moduleName('./rt'));

    if (window.Intl === undefined) {
      var _ret = function () {
        var i18nLogger = LogManager.getLogger('i18n');
        i18nLogger.warn('Intl API is not available. Trying to load the polyfill.');
        var loader = frameworkConfig.container.get(Loader);
        var normalizeErrorMessage = 'Failed to normalize {module} while loading the Intl polyfill.';

        return {
          v: loader.normalize('aurelia-i18n').then(function (i18nName) {
            return loader.normalize('intl', i18nName).then(function (intlName) {
              return loader.loadModule(intlName).then(function (poly) {
                window.Intl = poly;
                return registerI18N(frameworkConfig, cb);
              }, function () {
                return i18nLogger.warn('Failed to load the Intl polyfill.');
              });
            }, function () {
              return i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'intl'));
            });
          }, function () {
            return i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'aurelia-i18n'));
          })
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return Promise.resolve(registerI18N(frameworkConfig, cb));
  }

  return {
    setters: [function (_aureliaLogging) {
      LogManager = _aureliaLogging;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaTemplating) {
      ViewResources = _aureliaTemplating.ViewResources;
    }, function (_aureliaLoader) {
      Loader = _aureliaLoader.Loader;
    }, function (_aureliaTemplatingResources) {
      BindingSignaler = _aureliaTemplatingResources.BindingSignaler;
    }, function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_relativeTime) {
      RelativeTime = _relativeTime.RelativeTime;
    }, function (_df) {
      DfValueConverter = _df.DfValueConverter;
    }, function (_nf) {
      NfValueConverter = _nf.NfValueConverter;
    }, function (_rt) {
      RtValueConverter = _rt.RtValueConverter;
    }, function (_t) {
      TValueConverter = _t.TValueConverter;
      TBindingBehavior = _t.TBindingBehavior;
      TCustomAttribute = _t.TCustomAttribute;
      TParamsCustomAttribute = _t.TParamsCustomAttribute;
    }, function (_baseI18n) {
      BaseI18N = _baseI18n.BaseI18N;
    }, function (_aureliaI18nLoader) {
      Backend = _aureliaI18nLoader.Backend;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('configure', configure);

      _export('I18N', I18N);

      _export('RelativeTime', RelativeTime);

      _export('DfValueConverter', DfValueConverter);

      _export('NfValueConverter', NfValueConverter);

      _export('RtValueConverter', RtValueConverter);

      _export('TValueConverter', TValueConverter);

      _export('TBindingBehavior', TBindingBehavior);

      _export('TCustomAttribute', TCustomAttribute);

      _export('TParamsCustomAttribute', TParamsCustomAttribute);

      _export('BaseI18N', BaseI18N);

      _export('EventAggregator', EventAggregator);

      _export('Backend', Backend);
    }
  };
});