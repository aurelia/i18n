import { RelativeTime } from "../relativeTime";
export class RtValueConverter {
    constructor(service) {
        this.service = service;
    }
    static inject() { return [RelativeTime]; }
    toView(value) {
        if (value === null
            || typeof value === "undefined"
            || (typeof value === "string" && value.trim() === "")) {
            return value;
        }
        if (typeof value === "string" && isNaN(value) && !Number.isInteger(value)) {
            value = new Date(value);
        }
        return this.service.getRelativeTime(value);
    }
}
//# sourceMappingURL=rt-value-converter.js.map