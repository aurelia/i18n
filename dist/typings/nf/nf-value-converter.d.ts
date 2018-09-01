import { I18N } from "../i18n";
export declare class NfValueConverter {
    private service;
    static inject(): (typeof I18N)[];
    constructor(service: I18N);
    toView(value: any, nfOrOptions?: Intl.NumberFormat | Intl.NumberFormatOptions, locale?: string): any;
}
