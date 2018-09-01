System.register(["../i18n", "../utils"], function (exports_1, context_1) {
    "use strict";
    var i18n_1, utils_1, DfValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (i18n_1_1) {
                i18n_1 = i18n_1_1;
            },
            function (utils_1_1) {
                utils_1 = utils_1_1;
            }
        ],
        execute: function () {
            DfValueConverter = /** @class */ (function () {
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
            exports_1("DfValueConverter", DfValueConverter);
        }
    };
});
//# sourceMappingURL=df-value-converter.js.map