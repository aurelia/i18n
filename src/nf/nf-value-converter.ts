import * as LogManager from "aurelia-logging";

import { I18N } from "../i18n";

export class NfValueConverter {
  public static inject() { return [I18N]; }
  constructor(private service: I18N) {}

  public toView(
    value: any,
    nfOrOptions?: Intl.NumberFormat | Intl.NumberFormatOptions,
    locale?: string,
    nf?: Intl.NumberFormat
  ) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
      ) {
      return value;
    }

    if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
      return nfOrOptions.format(value);
    } else if (nf) {
      const i18nLogger = LogManager.getLogger("i18n");
      // tslint:disable-next-line:max-line-length
      i18nLogger.warn("This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]");
    } else {
      nf = this.service.nf(nfOrOptions as Intl.NumberFormatOptions, locale || this.service.getLocale());
    }

    return nf!.format(value);
  }
}
