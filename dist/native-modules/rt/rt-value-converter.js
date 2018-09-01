import { RelativeTime } from "../relativeTime";
var RtValueConverter = /** @class */ (function () {
    function RtValueConverter(service) {
        this.service = service;
    }
    RtValueConverter.inject = function () { return [RelativeTime]; };
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
export { RtValueConverter };
//# sourceMappingURL=rt-value-converter.js.map