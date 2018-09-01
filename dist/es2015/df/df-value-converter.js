import { I18N } from "../i18n";
import { isInteger } from "../utils";
var DfValueConverter = /** @class */ (function () {
    function DfValueConverter(service) {
        this.service = service;
    }
    DfValueConverter.inject = function () { return [I18N]; };
    DfValueConverter.prototype.toView = function (value, dfOrOptions, locale) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (typeof value === "string" && isNaN(value) && !isInteger(value)) {
            value = new Date(value);
        }
        if (dfOrOptions && (dfOrOptions instanceof Intl.DateTimeFormat && typeof dfOrOptions.format === "function")) {
            return dfOrOptions.format(value);
        }
        var df = this.service.df(dfOrOptions, locale || this.service.getLocale());
        return df.format(value);
    };
    return DfValueConverter;
}());
export { DfValueConverter };
//# sourceMappingURL=df-value-converter.js.map