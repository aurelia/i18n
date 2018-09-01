System.register(["../relativeTime"], function (exports_1, context_1) {
    "use strict";
    var relativeTime_1, RtValueConverter;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (relativeTime_1_1) {
                relativeTime_1 = relativeTime_1_1;
            }
        ],
        execute: function () {
            RtValueConverter = /** @class */ (function () {
                function RtValueConverter(service) {
                    this.service = service;
                }
                RtValueConverter.inject = function () { return [relativeTime_1.RelativeTime]; };
                RtValueConverter.prototype.toView = function (value) {
                    if (value === null
                        || typeof value === "undefined"
                        || (typeof value === "string" && value.trim() === "")) {
                        return value;
                    }
                    if (typeof value === "string" && isNaN(value) && !Number.isInteger(value)) {
                        value = new Date(value);
                    }
                    return this.service.getRelativeTime(value);
                };
                return RtValueConverter;
            }());
            exports_1("RtValueConverter", RtValueConverter);
        }
    };
});
//# sourceMappingURL=rt-value-converter.js.map