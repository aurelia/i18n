import {EventAggregator} from 'aurelia-event-aggregator';
import {ViewResources} from 'aurelia-templating';
import {DefaultLoader} from 'aurelia-loader-default';

console.log(DefaultLoader);

import {I18N} from './i18n';
import {RelativeTime} from './relativeTime';
import {DfValueConverter} from './df';
import {NfValueConverter} from './nf';
import {RtValueConverter} from './rt';
import {TValueConverter} from './t';
import {TCustomAttribute} from './t';
import {TParamsCustomAttribute} from './t';
import {BaseI18N} from './base-i18n';

function configure(frameworkConfig, cb) {
  if (cb === undefined || typeof cb !== 'function') {
    let errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
  }

  frameworkConfig.globalResources('./t');
  frameworkConfig.globalResources('./nf');
  frameworkConfig.globalResources('./df');
  frameworkConfig.globalResources('./rt');

  let instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(DefaultLoader));
  frameworkConfig.container.registerInstance(I18N, instance);

  let ret = cb(instance);

  frameworkConfig.postTask(() => {
    let resources = frameworkConfig.container.get(ViewResources);
    let htmlBehaviorResource = resources.getAttribute('t');
    let attributes = instance.i18next.options.attributes;

    // Register default attributes if none provided
    if (!attributes) {
      attributes = ['t', 'i18n'];
    }

    attributes.forEach(alias => resources.registerAttribute(alias, htmlBehaviorResource, 't'));
  });

  return ret;
}

export {
  configure,
  I18N,
  RelativeTime,
  DfValueConverter,
  NfValueConverter,
  RtValueConverter,
  TValueConverter,
  TCustomAttribute,
  TParamsCustomAttribute,
  BaseI18N,
  EventAggregator
};
