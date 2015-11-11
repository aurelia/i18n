import {I18N} from './i18n';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ViewResources} from 'aurelia-templating';

export {I18N} from './i18n';
export {RelativeTime} from './relativeTime';
export {DfValueConverter} from './df';
export {NfValueConverter} from './nf';
export {RtValueConverter} from './rt';
export {TValueConverter} from './t';
export {TCustomAttribute} from './t';
export {TParamsCustomAttribute} from './t';
export {BaseI18N} from './base-i18n';
export {EventAggregator} from 'aurelia-event-aggregator';

export function configure(frameworkConfig, cb) {
  if (cb === undefined || typeof cb !== 'function') {
    let errorMsg = 'You need to provide a callback method to properly configure the library';
    throw errorMsg;
  }

  frameworkConfig.globalResources('./t');
  frameworkConfig.globalResources('./nf');
  frameworkConfig.globalResources('./df');
  frameworkConfig.globalResources('./rt');
  let instance = new I18N(frameworkConfig.container.get(EventAggregator));
  frameworkConfig.container.registerInstance(I18N, instance);

  let ret = cb(instance);

  frameworkConfig.postTask(() => {
    let resources = frameworkConfig.container.get(ViewResources);
    let htmlBehaviorResource = resources._getAttribute('t');
    let attributes = instance.i18next.options.attributes;

    // Register default attributes if none provided
    if (!attributes) {
      attributes = ['t', 'i18n'];
    }

    attributes.forEach(alias => resources.registerAttribute(alias, htmlBehaviorResource, 't'));
  });

  return ret;
}
