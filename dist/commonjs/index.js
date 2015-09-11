'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.configure = configure;

var _i18n = require('./i18n');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTemplating = require('aurelia-templating');

Object.defineProperty(exports, 'I18N', {
  enumerable: true,
  get: function get() {
    return _i18n.I18N;
  }
});

var _relativeTime = require('./relativeTime');

Object.defineProperty(exports, 'RelativeTime', {
  enumerable: true,
  get: function get() {
    return _relativeTime.RelativeTime;
  }
});

var _df = require('./df');

Object.defineProperty(exports, 'DfValueConverter', {
  enumerable: true,
  get: function get() {
    return _df.DfValueConverter;
  }
});

var _nf = require('./nf');

Object.defineProperty(exports, 'NfValueConverter', {
  enumerable: true,
  get: function get() {
    return _nf.NfValueConverter;
  }
});

var _rt = require('./rt');

Object.defineProperty(exports, 'RtValueConverter', {
  enumerable: true,
  get: function get() {
    return _rt.RtValueConverter;
  }
});

var _t = require('./t');

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
Object.defineProperty(exports, 'TParamsCustomAttribute', {
  enumerable: true,
  get: function get() {
    return _t.TParamsCustomAttribute;
  }
});

var _baseI18n = require('./base-i18n');

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
    var errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
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