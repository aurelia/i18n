import {I18N} from './i18n';
import {translations} from  './defaultTranslations/relative.time';
import {EventAggregator} from 'aurelia-event-aggregator';

export class RelativeTime {
  static inject() { return [I18N, EventAggregator]; }
  constructor(i18n, ea) {
    this.service = i18n;
    this.ea = ea;

    this.service.i18nextReady().then(() => {
       this.setup();
    });
    this.ea.subscribe('i18n:locale:changed', locales => {
      this.setup(locales);
    });
  }

  setup(locales) {
    let trans = translations.default || translations;
    let key = locales && locales.newValue ? locales.newValue : this.service.getLocale();
    let translation = trans[key].translation;
    let options = this.service.i18next.options;

    if (options.interpolation && options.interpolation.prefix !== '__' || options.interpolation.suffix !== '__') {
      for (let subkey in translation) {
        translation[subkey] = translation[subkey].replace('__count__', options.interpolation.prefix + 'count' + options.interpolation.suffix);
      }
    }

    this.service.i18next.addResources(key, 'translation', translation);
  }

  getRelativeTime(time) {
    let now = new Date();
    let diff = now.getTime() - time.getTime();

    let timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
    if (!timeDiff) {
      timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
      if (!timeDiff) {
        timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, 'hour', 3600000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, 'minute', 60000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, 'second', 1000);
              if (!timeDiff) {
                timeDiff = this.service.tr('now');
              }
            }
          }
        }
      }
    }

    return timeDiff;
  }

  getTimeDiffDescription(diff, unit, timeDivisor) {
    let unitAmount = (diff / timeDivisor).toFixed(0);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
    } else if (unitAmount < 0) {
      let abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: 'in'});
    }

    return null;
  }
}
