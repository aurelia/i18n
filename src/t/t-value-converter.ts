import i18next from "i18next";

import { I18N } from "../i18n";
import { valueConverter } from "aurelia-framework";

@valueConverter("t")
export class TValueConverter {
  public static inject() { return [I18N]; }

  constructor(private service: I18N) { }

  public toView(value: any, countOrOptions?: number | i18next.TOptions<object>) {
    return this.service.tr(value, typeof options === "number" ? { count: countOrOptions } : countOrOptions);
  }
}
