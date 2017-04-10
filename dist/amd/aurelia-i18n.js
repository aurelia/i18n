define(['exports', 'aurelia-logging', 'aurelia-event-aggregator', 'aurelia-templating', 'aurelia-loader', 'aurelia-templating-resources', 'aurelia-pal', './i18n', './relativeTime', './df', './nf', './rt', './t', './base-i18n', './aurelia-i18n-loader'], function (exports, _aureliaLogging, _aureliaEventAggregator, _aureliaTemplating, _aureliaLoader, _aureliaTemplatingResources, _aureliaPal, _i18n, _relativeTime, _df, _nf, _rt, _t, _baseI18n, _aureliaI18nLoader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Backend = exports.EventAggregator = exports.BaseI18N = exports.TParamsCustomAttribute = exports.TCustomAttribute = exports.TBindingBehavior = exports.TValueConverter = exports.RtBindingBehavior = exports.RtValueConverter = exports.NfBindingBehavior = exports.NfValueConverter = exports.DfBindingBehavior = exports.DfValueConverter = exports.RelativeTime = exports.I18N = exports.configure = undefined;

  var LogManager = _interopRequireWildcard(_aureliaLogging);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function registerI18N(frameworkConfig, cb) {
    var instance = new _i18n.I18N(frameworkConfig.container.get(_aureliaEventAggregator.EventAggregator), frameworkConfig.container.get(_aureliaTemplatingResources.BindingSignaler));
    frameworkConfig.container.registerInstance(_i18n.I18N, instance);

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

    frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./t'));
    frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./nf'));
    frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./df'));
    frameworkConfig.globalResources(_aureliaPal.PLATFORM.moduleName('./rt'));

    if (window.Intl === undefined) {
      var _ret = function () {
        var i18nLogger = LogManager.getLogger('i18n');
        i18nLogger.warn('Intl API is not available. Trying to load the polyfill.');
        var loader = frameworkConfig.container.get(_aureliaLoader.Loader);
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

  exports.configure = configure;
  exports.I18N = _i18n.I18N;
  exports.RelativeTime = _relativeTime.RelativeTime;
  exports.DfValueConverter = _df.DfValueConverter;
  exports.DfBindingBehavior = _df.DfBindingBehavior;
  exports.NfValueConverter = _nf.NfValueConverter;
  exports.NfBindingBehavior = _nf.NfBindingBehavior;
  exports.RtValueConverter = _rt.RtValueConverter;
  exports.RtBindingBehavior = _rt.RtBindingBehavior;
  exports.TValueConverter = _t.TValueConverter;
  exports.TBindingBehavior = _t.TBindingBehavior;
  exports.TCustomAttribute = _t.TCustomAttribute;
  exports.TParamsCustomAttribute = _t.TParamsCustomAttribute;
  exports.BaseI18N = _baseI18n.BaseI18N;
  exports.EventAggregator = _aureliaEventAggregator.EventAggregator;
  exports.Backend = _aureliaI18nLoader.Backend;
});