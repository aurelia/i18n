import { I18N } from "../i18n";
export class NfValueConverter {
    constructor(service) {
        this.service = service;
    }
    static inject() { return [I18N]; }
    toView(value, nfOrOptions, locale) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
            return nfOrOptions.format(value);
        }
        const nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
        return nf.format(value);
    }
}
//# sourceMappingURL=nf-value-converter.js.map