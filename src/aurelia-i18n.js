import * as LogManager from 'aurelia-logging';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ViewResources} from 'aurelia-templating';
import {Loader} from 'aurelia-loader';
import {BindingSignaler} from 'aurelia-templating-resources';
import {PLATFORM} from 'aurelia-pal';

import {I18N} from './i18n';
import {RelativeTime} from './relativeTime';
import {
  DfValueConverter,
  DfBindingBehavior
} from './df';
import {
  NfValueConverter,
  NfBindingBehavior
} from './nf';
import {
  RtValueConverter,
  RtBindingBehavior
} from './rt';
import {
  TValueConverter,
  TBindingBehavior,
  TCustomAttribute,
  TParamsCustomAttribute
} from './t';
import {BaseI18N} from './base-i18n';
import {Backend} from './aurelia-i18n-loader';

function registerI18N(frameworkConfig, cb) {
  let instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(BindingSignaler));
  frameworkConfig.container.registerInstance(I18N, instance);

  let ret = cb(instance);

  frameworkConfig.postTask(() => {
    let resources = frameworkConfig.container.get(ViewResources);
    let htmlBehaviorResource = resources.getAttribute('t');
    let htmlParamsResource   = resources.getAttribute('t-params');
    let attributes = instance.i18next.options.attributes;

    // Register default attributes if none provided
    if (!attributes) {
      attributes = ['t', 'i18n'];
    }

    attributes.forEach(alias => resources.registerAttribute(alias, htmlBehaviorResource, 't'));
    attributes.forEach(alias => resources.registerAttribute(alias + '-params', htmlParamsResource, 't-params'));
  });

  return ret;
}

function configure(frameworkConfig, cb): Promise<void> {
  if (cb === undefined || typeof cb !== 'function') {
    let errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
  }

  frameworkConfig.globalResources(PLATFORM.moduleName('./t'));
  frameworkConfig.globalResources(PLATFORM.moduleName('./nf'));
  frameworkConfig.globalResources(PLATFORM.moduleName('./df'));
  frameworkConfig.globalResources(PLATFORM.moduleName('./rt'));

  // check whether Intl is available, otherwise load the polyfill
  if (window.Intl === undefined) {
    let i18nLogger = LogManager.getLogger('i18n');
    i18nLogger.warn('Intl API is not available. Trying to load the polyfill.');
    let loader = frameworkConfig.container.get(Loader);
    const normalizeErrorMessage = 'Failed to normalize {module} while loading the Intl polyfill.';

    return loader.normalize('aurelia-i18n').then((i18nName) => {
      return loader.normalize('intl', i18nName).then((intlName) => {
        return loader.loadModule(intlName).then((poly) => {
          window.Intl = poly;
          return registerI18N(frameworkConfig, cb);
        }, () => i18nLogger.warn('Failed to load the Intl polyfill.'));
      }, () => i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'intl')));
    }, () => i18nLogger.warn(normalizeErrorMessage.replace('{module}', 'aurelia-i18n')));
  }

  return Promise.resolve(registerI18N(frameworkConfig, cb));
}

export {
  configure,
  I18N,
  RelativeTime,
  DfValueConverter,
  DfBindingBehavior,
  NfValueConverter,
  NfBindingBehavior,
  RtValueConverter,
  RtBindingBehavior,
  TValueConverter,
  TBindingBehavior,
  TCustomAttribute,
  TParamsCustomAttribute,
  BaseI18N,
  EventAggregator,
  Backend
};
