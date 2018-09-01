import { I18N } from "../i18n";
export class TValueConverter {
    constructor(service) {
        this.service = service;
    }
    static inject() { return [I18N]; }
    toView(value, options) {
        return this.service.tr(value, options);
    }
}
//# sourceMappingURL=t-value-converter.js.map