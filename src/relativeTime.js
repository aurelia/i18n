import {I18N} from './i18n';
import * as translations from  './defaultTranslations/relative.time';

export class RelativeTime {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;

    let trans = translations.default || translations;

    Object.keys(trans).map( (key) => {
      let translation = trans[key]['translation'];
      let options = i18n.i18next.options;

      if(options.interpolationPrefix !== '__' || options.interpolationSuffix !== '__') {
        for(let subkey in translation) {
          translation[subkey] = translation[subkey].replace('__count__', options.interpolationPrefix + 'count' + options.interpolationSuffix);
        }
      }

      this.service.i18next.addResources(key, 'translation', translation);
    });
  }

  getRelativeTime(time)
  {
    var now = new Date();
    var diff = now.getTime() - time.getTime();

    var timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
    if (!timeDiff) {
      var timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
      if (!timeDiff) {
        var timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
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

  getTimeDiffDescription(diff, unit, timeDivisor)
  {
    var unitAmount = (diff / timeDivisor).toFixed(0);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: parseInt(unitAmount), context: 'ago' });
    } else if (unitAmount < 0) {
      var abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: 'in'});
    } else {
      return null;
    }
  }
}
