define(['exports', './i18n', 'aurelia-event-aggregator', 'aurelia-templating', './relativeTime', './df', './nf', './rt', './t', './base-i18n'], function (exports, _i18n, _aureliaEventAggregator, _aureliaTemplating, _relativeTime, _df, _nf, _rt, _t, _baseI18n) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.configure = configure;
  Object.defineProperty(exports, 'I18N', {
    enumerable: true,
    get: function get() {
      return _i18n.I18N;
    }
  });
  Object.defineProperty(exports, 'RelativeTime', {
    enumerable: true,
    get: function get() {
      return _relativeTime.RelativeTime;
    }
  });
  Object.defineProperty(exports, 'DfValueConverter', {
    enumerable: true,
    get: function get() {
      return _df.DfValueConverter;
    }
  });
  Object.defineProperty(exports, 'NfValueConverter', {
    enumerable: true,
    get: function get() {
      return _nf.NfValueConverter;
    }
  });
  Object.defineProperty(exports, 'RtValueConverter', {
    enumerable: true,
    get: function get() {
      return _rt.RtValueConverter;
    }
  });
  Object.defineProperty(exports, 'TValueConverter', {
    enumerable: true,
    get: function get() {
      return _t.TValueConverter;
    }
  });
  Object.defineProperty(exports, 'TCustomAttribute', {
    enumerable: true,
    get: function get() {
      return _t.TCustomAttribute;
    }
  });
  Object.defineProperty(exports, 'BaseI18N', {
    enumerable: true,
    get: function get() {
      return _baseI18n.BaseI18N;
    }
  });
  Object.defineProperty(exports, 'EventAggregator', {
    enumerable: true,
    get: function get() {
      return _aureliaEventAggregator.EventAggregator;
    }
  });

  function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== 'function') {
      throw 'You need to provide a callback method to properly configure the library';
    }

    frameworkConfig.globalResources('./t');
    frameworkConfig.globalResources('./nf');
    frameworkConfig.globalResources('./df');
    frameworkConfig.globalResources('./rt');
    var instance = new _i18n.I18N(frameworkConfig.container.get(_aureliaEventAggregator.EventAggregator));
    frameworkConfig.container.registerInstance(_i18n.I18N, instance);

    var ret = cb(instance);

    frameworkConfig.postTask(function () {
      var resources = frameworkConfig.container.get(_aureliaTemplating.ViewResources);
      var htmlBehaviorResource = resources.getAttribute('t');

      instance.i18next.options.attributes.forEach(function (alias) {
        return resources.registerAttribute(alias, htmlBehaviorResource, 't');
      });
    });

    return ret;
  }
});