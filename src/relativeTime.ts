import { EventAggregator } from "aurelia-event-aggregator";

import {
  I18N,
  I18NEventPayload,
  I18N_EA_SIGNAL
} from "./i18n";
import { translations } from "./defaultTranslations/relative.time";

export class RelativeTime {
  public static inject() { return [I18N, EventAggregator]; }
  constructor(private service: I18N, private ea: EventAggregator) {
    this.service.i18nextReady().then(() => {
      this.setup();
    });

    this.ea.subscribe(I18N_EA_SIGNAL, (locales: I18NEventPayload) => {
      this.setup(locales);
    });
  }

  public setup(locales?: { oldValue: string, newValue: string }) {
    const trans = (translations as any).default || translations;
    const fallbackLng = (this.service.i18next as any).fallbackLng;

    let alternateFb = fallbackLng || this.service.i18next.options.fallbackLng;
    if (Array.isArray(alternateFb) && alternateFb.length > 0) {
      alternateFb = alternateFb[0];
    }

    const key = ((locales && locales.newValue)
      ? locales.newValue
      : this.service.getLocale()) || alternateFb;

    let index = 0;

    // tslint:disable-next-line:no-conditional-assignment
    if ((index = key.indexOf("-")) >= 0) {
      const baseLocale = key.substring(0, index);

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

  public addTranslationResource(key: string, translation: any) {
    const options = this.service.i18next.options;

    if (options.interpolation && (options.interpolation.prefix !== "__" || options.interpolation.suffix !== "__")) {
      // tslint:disable-next-line:forin
      for (const subkey in translation) {
        translation[subkey] = translation[subkey]
          .replace("__count__", `${options.interpolation.prefix || "{{"}count${options.interpolation.suffix || "}}"}`);
      }
    }

    this.service.i18next.addResources(key, options.defaultNS || "translation", translation);
  }

  public getRelativeTime(time: Date) {
    const now = new Date();
    const diff = now.getTime() - time.getTime();

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
                timeDiff = this.service.tr<string>("now");
              }
            }
          }
        }
      }
    }

    return timeDiff;
  }

  public getTimeDiffDescription(
    diff: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second", timeDivisor: number
  ) {
    const unitAmount = parseInt((diff / timeDivisor).toFixed(0), 10);
    if (unitAmount > 0) {
      return this.service.tr(unit, { count: unitAmount, context: "ago" });
    } else if (unitAmount < 0) {
      const abs = Math.abs(unitAmount);
      return this.service.tr(unit, { count: abs, context: "in" });
    }

    return null;
  }
}
