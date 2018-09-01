import { I18N } from "../i18n";
import { isInteger } from "../utils";

export class DfValueConverter {
  public static inject() { return [I18N]; }

  constructor(private service: I18N) { }

  public toView(
    value: any,
    dfOrOptions?: Intl.DateTimeFormat | Intl.DateTimeFormatOptions,
    locale?: string
  ) {
    if (value === null
      || typeof value === "undefined"
      || (typeof value === "string" && value.trim() === "")
    ) {
      return value;
    }

    if (typeof value === "string" && isNaN(value as any) && !isInteger(value as any)) {
      value = new Date(value);
    }

    if (dfOrOptions && (dfOrOptions instanceof Intl.DateTimeFormat && typeof dfOrOptions.format === "function")) {
      return dfOrOptions.format(value);
    }

    const df = this.service.df(dfOrOptions as Intl.DateTimeFormatOptions, locale || this.service.getLocale());
    return df!.format(value);
  }
}
