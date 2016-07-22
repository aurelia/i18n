import * as LogManager from 'aurelia-logging';
import {I18N} from './i18n';

export class NfValueConverter {
  static inject() { return [I18N]; }
  constructor(i18n) {
    this.service = i18n;
  }

  toView(value, nfOrOptions, locale, nf) {
    if (value === null
      || typeof value === 'undefined'
      || (typeof value === 'string' && value.trim() === '')
      ) {
      return value;
    }

    if (nfOrOptions && (typeof nfOrOptions.format === 'function')) {
      return nfOrOptions.format(value);
    } else if (nf) {
      let i18nLogger = LogManager.getLogger('i18n');
      i18nLogger.warn('This ValueConverter signature is depcrecated and will be removed in future releases. Please use the signature [nfOrOptions, locale]');
    } else {
      nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
    }

    return nf.format(value);
  }
}
