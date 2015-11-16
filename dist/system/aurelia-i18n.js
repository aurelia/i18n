System.register(['aurelia-event-aggregator', 'aurelia-templating', 'aurelia-loader-default', './i18n', './relativeTime', './df', './nf', './rt', './t', './base-i18n'], function (_export) {
  'use strict';

  var EventAggregator, ViewResources, DefaultLoader, I18N, RelativeTime, DfValueConverter, NfValueConverter, RtValueConverter, TValueConverter, TCustomAttribute, TParamsCustomAttribute, BaseI18N;

  function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== 'function') {
      var errorMsg = 'You need to provide a callback method to properly configure the library';
      throw errorMsg;
    }

    frameworkConfig.globalResources('./t');
    frameworkConfig.globalResources('./nf');
    frameworkConfig.globalResources('./df');
    frameworkConfig.globalResources('./rt');

    var instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(DefaultLoader));
    frameworkConfig.container.registerInstance(I18N, instance);

    var ret = cb(instance);

    frameworkConfig.postTask(function () {
      var resources = frameworkConfig.container.get(ViewResources);
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

  return {
    setters: [function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }, function (_aureliaTemplating) {
      ViewResources = _aureliaTemplating.ViewResources;
    }, function (_aureliaLoaderDefault) {
      DefaultLoader = _aureliaLoaderDefault.DefaultLoader;
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
      TCustomAttribute = _t.TCustomAttribute;
      TParamsCustomAttribute = _t.TParamsCustomAttribute;
    }, function (_baseI18n) {
      BaseI18N = _baseI18n.BaseI18N;
    }],
    execute: function () {

      console.log(DefaultLoader);

      _export('configure', configure);

      _export('I18N', I18N);

      _export('RelativeTime', RelativeTime);

      _export('DfValueConverter', DfValueConverter);

      _export('NfValueConverter', NfValueConverter);

      _export('RtValueConverter', RtValueConverter);

      _export('TValueConverter', TValueConverter);

      _export('TCustomAttribute', TCustomAttribute);

      _export('TParamsCustomAttribute', TParamsCustomAttribute);

      _export('BaseI18N', BaseI18N);

      _export('EventAggregator', EventAggregator);
    }
  };
});