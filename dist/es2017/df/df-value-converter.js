import { I18N } from "../i18n";
import { isInteger } from "../utils";
export class DfValueConverter {
    constructor(service) {
        this.service = service;
    }
    static inject() { return [I18N]; }
    toView(value, dfOrOptions, locale) {
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
        const df = this.service.df(dfOrOptions, locale || this.service.getLocale());
        return df.format(value);
    }
}
//# sourceMappingURL=df-value-converter.js.map