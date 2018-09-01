import { I18N } from "../i18n";
var NfValueConverter = /** @class */ (function () {
    function NfValueConverter(service) {
        this.service = service;
    }
    NfValueConverter.inject = function () { return [I18N]; };
    NfValueConverter.prototype.toView = function (value, nfOrOptions, locale) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
            return nfOrOptions.format(value);
        }
        var nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
        return nf.format(value);
    };
    return NfValueConverter;
}());
export { NfValueConverter };
//# sourceMappingURL=nf-value-converter.js.map