import { I18N, I18NEventPayload } from "./i18n";
import { translations } from "./defaultTranslations/relative.time";
import { EventAggregator } from "aurelia-event-aggregator";

export class RelativeTime {
  static inject() { return [I18N, EventAggregator]; }
  constructor(private service: I18N, private ea: EventAggregator) {
    this.service.i18nextReady().then(() => {
      this.setup();
    });

    this.ea.subscribe("i18n:locale:changed", (locales: I18NEventPayload) => {
      this.setup(locales);
    });
  }

  setup(locales?: { oldValue: string, newValue: string }) {
    let trans = (translations as any).default || translations;
    let fallbackLng = (this.service.i18next as any).fallbackLng;

    let alternateFb = fallbackLng || this.service.i18next.options.fallbackLng;
    if (Array.isArray(alternateFb) && alternateFb.length > 0) {
      alternateFb = alternateFb[0];
    }

    let key = ((locales && locales.newValue)
      ? locales.newValue
      : this.service.getLocale()) || alternateFb;

    let index = 0;

    if ((index = key.indexOf("-")) >= 0) { // eslint-disable-line no-cond-assign
      let baseLocale = key.substring(0, index);

      if (trans[baseLocale]) {
        this.addTranslationResource(baseLocale, trans[baseLocale].translation);
      }
    }

    if (trans[key]) {
      this.addTranslationResource(key, trans[key].translation);
    }
    if (trans[fallbackLng]) {
      this.addTranslationResource(key, trans[fallbackLng].translation);
    }
  }

  addTranslationResource(key: string, translation: any) {
    let options = this.service.i18next.options;

    if (options.interpolation && (options.interpolation.prefix !== "__" || options.interpolation.suffix !== "__")) {
      for (let subkey in translation) {
        translation[subkey] = translation[subkey].replace("__count__", `${options.interpolation.prefix || "{{"}count${options.interpolation.suffix || "}}"}`);
      }
    }

    this.service.i18next.addResources(key, options.defaultNS || "translation", translation);
  }

  getRelativeTime(time: Date) {
    let now = new Date();
    let diff = now.getTime() - time.getTime();

    let timeDiff = this.getTimeDiffDescription(diff, "year", 31104000000);
    if (!timeDiff) {
      timeDiff = this.getTimeDiffDescription(diff, "month", 2592000000);
      if (!timeDiff) {
        timeDiff = this.getTimeDiffDescription(diff, "day", 86400000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, "hour", 3600000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, "minute", 60000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, "second", 1000);
              if (!timeDiff) {
                timeDiff = this.service.tr("now");
              }
            }
          }
        }
      }
    }

    return timeDiff;
  }

  getTimeDiffDescription(diff: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second", timeDivisor: number) {
    let unitAmount = parseInt((diff / timeDivisor).toFixed(0), 10);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: unitAmount, context: "ago" });
    } else if (unitAmount < 0) {
      let abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: "in" });
    }

    return null;
  }
}
