import * as LogManager from 'aurelia-logging';
import { EventAggregator } from 'aurelia-event-aggregator';
import { ViewResources } from 'aurelia-templating';
import { Loader } from 'aurelia-loader';
import { BindingSignaler } from 'aurelia-templating-resources';
import { PLATFORM } from 'aurelia-pal';

import { I18N } from './i18n';
import { RelativeTime } from './relativeTime';
import { DfValueConverter, DfBindingBehavior } from './df';
import { NfValueConverter, NfBindingBehavior } from './nf';
import { RtValueConverter, RtBindingBehavior } from './rt';
import { TValueConverter, TBindingBehavior, TCustomAttribute, TParamsCustomAttribute } from './t';
import { BaseI18N } from './base-i18n';
import { Backend } from './aurelia-i18n-loader';

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

  if (PLATFORM.global.Intl === undefined) {
    var i18nLogger = LogManager.getLogger('i18n');
    i18nLogger.warn('Intl API is not available. Trying to load the polyfill.');
    var loader = frameworkConfig.container.get(Loader);
    var normalizeErrorMessage = 'Failed to normalize {module} while loading the Intl polyfill.';

    return loader.normalize('aurelia-i18n').then(function (i18nName) {
      return loader.normalize('intl', i18nName).then(function (intlName) {
        return loader.loadModule(intlName).then(function (poly) {
          PLATFORM.global.Intl = poly;
          return registerI18N(frameworkConfig, cb);
        }, function () {
          return i18nLogger.warn('Failed to load the Intl polyfill.');
        });
      }, function () {
        return i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'intl'));
      });
    }, function () {
      return i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'aurelia-i18n'));
    });
  }

  return Promise.resolve(registerI18N(frameworkConfig, cb));
}

export { configure, I18N, RelativeTime, DfValueConverter, DfBindingBehavior, NfValueConverter, NfBindingBehavior, RtValueConverter, RtBindingBehavior, TValueConverter, TBindingBehavior, TCustomAttribute, TParamsCustomAttribute, BaseI18N, EventAggregator, Backend };