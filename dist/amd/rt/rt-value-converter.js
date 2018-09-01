define(["require", "exports", "../relativeTime"], function (require, exports, relativeTime_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var RtValueConverter = /** @class */ (function () {
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
    exports.RtValueConverter = RtValueConverter;
});
//# sourceMappingURL=rt-value-converter.js.map