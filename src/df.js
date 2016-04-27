import {I18N} from './i18n';

export class DfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }
  
  toView(value, dfOrOptions, locale, df) {
    if (dfOrOptions && (typeof dfOrOptions.format === 'function')) {
      return dfOrOptions.format(value);
    } else if(df) {
      console.warn("This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [dfOrOptions, locale]");
      return df.format(value);
    } else {
      df = this.service.df(dfOrOptions, locale || this.service.getLocale());
      return df.format(value);
    }
  }
}
