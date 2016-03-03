define(['exports', 'aurelia-event-aggregator', 'aurelia-templating', 'aurelia-loader', 'aurelia-templating-resources', './i18n', './relativeTime', './df', './nf', './rt', './t', './base-i18n'], function (exports, _aureliaEventAggregator, _aureliaTemplating, _aureliaLoader, _aureliaTemplatingResources, _i18n, _relativeTime, _df, _nf, _rt, _t, _baseI18n) {
  'use strict';

  exports.__esModule = true;

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

    frameworkConfig.globalResources('./t');
    frameworkConfig.globalResources('./nf');
    frameworkConfig.globalResources('./df');
    frameworkConfig.globalResources('./rt');

    if (window.Intl === undefined) {
      var _ret = (function () {
        var loader = frameworkConfig.container.get(_aureliaLoader.Loader);

        return {
          v: loader.normalize('aurelia-i18n').then(function (i18nName) {
            return loader.normalize('intl', i18nName).then(function (intlName) {
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
  exports.I18N = _i18n.I18N;
  exports.RelativeTime = _relativeTime.RelativeTime;
  exports.DfValueConverter = _df.DfValueConverter;
  exports.NfValueConverter = _nf.NfValueConverter;
  exports.RtValueConverter = _rt.RtValueConverter;
  exports.TValueConverter = _t.TValueConverter;
  exports.TBindingBehavior = _t.TBindingBehavior;
  exports.TCustomAttribute = _t.TCustomAttribute;
  exports.TParamsCustomAttribute = _t.TParamsCustomAttribute;
  exports.BaseI18N = _baseI18n.BaseI18N;
  exports.EventAggregator = _aureliaEventAggregator.EventAggregator;
});