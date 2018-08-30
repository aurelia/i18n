import { I18N } from "../i18n";
import i18next from "i18next";

export class TValueConverter {
  static inject() { return [I18N]; }

  constructor(private service: I18N) { }

  toView(value: any, options: i18next.TranslationOptions<object> | undefined) {
    return this.service.tr(value, options);
  }
}
