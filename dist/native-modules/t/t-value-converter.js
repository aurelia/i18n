import { I18N } from "../i18n";
var TValueConverter = /** @class */ (function () {
    function TValueConverter(service) {
        this.service = service;
    }
    TValueConverter.inject = function () { return [I18N]; };
    TValueConverter.prototype.toView = function (value, options) {
        return this.service.tr(value, options);
    };
    return TValueConverter;
}());
export { TValueConverter };
//# sourceMappingURL=t-value-converter.js.map