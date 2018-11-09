import { I18N } from "../i18n";
import { valueConverter } from "aurelia-binding";

@valueConverter("nf")
export class NfValueConverter {
  public static inject() { return [I18N]; }

  constructor(private service: I18N) {}

  public toView(
    value: any,
    nfOrOptions?: Intl.NumberFormat | Intl.NumberFormatOptions,
    locale?: string
  ) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
      ) {
      return value;
    }

    if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
      return nfOrOptions.format(value);
    }

    const nf = this.service.nf(nfOrOptions as Intl.NumberFormatOptions, locale || this.service.getLocale());
    return nf.format(value);
  }
}
