define(["require", "exports", "../i18n", "../utils"], function (require, exports, i18n_1, utils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DfValueConverter = /** @class */ (function () {
        function DfValueConverter(service) {
            this.service = service;
        }
        DfValueConverter.inject = function () { return [i18n_1.I18N]; };
        DfValueConverter.prototype.toView = function (value, dfOrOptions, locale) {
            if (value === null
                || typeof value === "undefined"
                || (typeof value === "string" && value.trim() === "")) {
                return value;
            }
            if (typeof value === "string" && isNaN(value) && !utils_1.isInteger(value)) {
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
    exports.DfValueConverter = DfValueConverter;
});
//# sourceMappingURL=df-value-converter.js.map