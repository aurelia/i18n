System.register(["../i18n"], function (exports_1, context_1) {
    "use strict";
    var i18n_1, TValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (i18n_1_1) {
                i18n_1 = i18n_1_1;
            }
        ],
        execute: function () {
            TValueConverter = /** @class */ (function () {
                function TValueConverter(service) {
                    this.service = service;
                }
                TValueConverter.inject = function () { return [i18n_1.I18N]; };
                TValueConverter.prototype.toView = function (value, options) {
                    return this.service.tr(value, options);
                };
                return TValueConverter;
            }());
            exports_1("TValueConverter", TValueConverter);
        }
    };
});
//# sourceMappingURL=t-value-converter.js.map