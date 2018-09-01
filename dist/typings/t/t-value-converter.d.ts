import i18next from "i18next";
import { I18N } from "../i18n";
export declare class TValueConverter {
    private service;
    static inject(): (typeof I18N)[];
    constructor(service: I18N);
    toView(value: any, options: i18next.TranslationOptions<object> | undefined): any;
}
