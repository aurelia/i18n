System.register(["../i18n"], function (exports_1, context_1) {
    "use strict";
    var i18n_1, NfValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (i18n_1_1) {
                i18n_1 = i18n_1_1;
            }
        ],
        execute: function () {
            NfValueConverter = /** @class */ (function () {
                function NfValueConverter(service) {
                    this.service = service;
                }
                NfValueConverter.inject = function () { return [i18n_1.I18N]; };
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
            exports_1("NfValueConverter", NfValueConverter);
        }
    };
});
//# sourceMappingURL=nf-value-converter.js.map