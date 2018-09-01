import { I18N } from "../i18n";
export declare class DfValueConverter {
    private service;
    static inject(): (typeof I18N)[];
    constructor(service: I18N);
    toView(value: any, dfOrOptions?: Intl.DateTimeFormat | Intl.DateTimeFormatOptions, locale?: string): any;
}
