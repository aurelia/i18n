define(['exports', 'aurelia-event-aggregator', 'aurelia-templating', 'aurelia-loader-default', './i18n', './relativeTime', './df', './nf', './rt', './t', './base-i18n'], function (exports, _aureliaEventAggregator, _aureliaTemplating, _aureliaLoaderDefault, _i18n, _relativeTime, _df, _nf, _rt, _t, _baseI18n) {
  'use strict';

  exports.__esModule = true;

  console.log(_aureliaLoaderDefault.DefaultLoader);

  function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== 'function') {
      var errorMsg = 'You need to provide a callback method to properly configure the library';
      throw errorMsg;
    }

    frameworkConfig.globalResources('./t');
    frameworkConfig.globalResources('./nf');
    frameworkConfig.globalResources('./df');
    frameworkConfig.globalResources('./rt');

    var instance = new _i18n.I18N(frameworkConfig.container.get(_aureliaEventAggregator.EventAggregator), frameworkConfig.container.get(_aureliaLoaderDefault.DefaultLoader));
    frameworkConfig.container.registerInstance(_i18n.I18N, instance);

    var ret = cb(instance);

    frameworkConfig.postTask(function () {
      var resources = frameworkConfig.container.get(_aureliaTemplating.ViewResources);
      var htmlBehaviorResource = resources.getAttribute('t');
      var attributes = instance.i18next.options.attributes;

      if (!attributes) {
        attributes = ['t', 'i18n'];
      }

      attributes.forEach(function (alias) {
        return resources.registerAttribute(alias, htmlBehaviorResource, 't');
      });
    });

    return ret;
  }

  exports.configure = configure;
  exports.I18N = _i18n.I18N;
  exports.RelativeTime = _relativeTime.RelativeTime;
  exports.DfValueConverter = _df.DfValueConverter;
  exports.NfValueConverter = _nf.NfValueConverter;
  exports.RtValueConverter = _rt.RtValueConverter;
  exports.TValueConverter = _t.TValueConverter;
  exports.TCustomAttribute = _t.TCustomAttribute;
  exports.TParamsCustomAttribute = _t.TParamsCustomAttribute;
  exports.BaseI18N = _baseI18n.BaseI18N;
  exports.EventAggregator = _aureliaEventAggregator.EventAggregator;
});