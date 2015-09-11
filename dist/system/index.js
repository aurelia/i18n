System.register(['./i18n', 'aurelia-event-aggregator', 'aurelia-templating', './relativeTime', './df', './nf', './rt', './t', './base-i18n'], function (_export) {
  'use strict';

  var I18N, EventAggregator, ViewResources;

  _export('configure', configure);

  function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== 'function') {
      var errorMsg = 'You need to provide a callback method to properly configure the library';
      throw errorMsg;
    }

    frameworkConfig.globalResources('./t');
    frameworkConfig.globalResources('./nf');
    frameworkConfig.globalResources('./df');
    frameworkConfig.globalResources('./rt');
    var instance = new I18N(frameworkConfig.container.get(EventAggregator));
    frameworkConfig.container.registerInstance(I18N, instance);

    var ret = cb(instance);

    frameworkConfig.postTask(function () {
      var resources = frameworkConfig.container.get(ViewResources);
      var htmlBehaviorResource = resources.getAttribute('t');

      instance.i18next.options.attributes.forEach(function (alias) {
        return resources.registerAttribute(alias, htmlBehaviorResource, 't');
      });
    });

    return ret;
  }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;

      _export('I18N', _i18n.I18N);
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;

      _export('EventAggregator', _aureliaEventAggregator.EventAggregator);
    }, function (_aureliaTemplating) {
      ViewResources = _aureliaTemplating.ViewResources;
    }, function (_relativeTime) {
      _export('RelativeTime', _relativeTime.RelativeTime);
    }, function (_df) {
      _export('DfValueConverter', _df.DfValueConverter);
    }, function (_nf) {
      _export('NfValueConverter', _nf.NfValueConverter);
    }, function (_rt) {
      _export('RtValueConverter', _rt.RtValueConverter);
    }, function (_t) {
      _export('TValueConverter', _t.TValueConverter);

      _export('TCustomAttribute', _t.TCustomAttribute);

      _export('TParamsCustomAttribute', _t.TParamsCustomAttribute);
    }, function (_baseI18n) {
      _export('BaseI18N', _baseI18n.BaseI18N);
    }],
    execute: function () {}
  };
});