import i18next, { i18n, InitOptions } from "i18next";
import { EventAggregator } from "aurelia-event-aggregator";
import { BindingSignaler } from "aurelia-templating-resources";
export interface AureliaEnhancedOptions extends InitOptions {
    attributes?: string[];
    skipTranslationOnMissingKey?: boolean;
}
export interface AureliaEnhancedI18Next extends i18n {
    options: AureliaEnhancedOptions;
}
export interface I18NEventPayload {
    oldValue: string;
    newValue: string;
}
export declare const I18N_EA_SIGNAL = "i18n:locale:changed";
export declare class I18N {
    private ea;
    private signaler;
    i18nextDeferred: Promise<AureliaEnhancedI18Next>;
    i18next: AureliaEnhancedI18Next;
    Intl: typeof Intl;
    private globalVars;
    constructor(ea: EventAggregator, signaler: BindingSignaler);
    setup(options?: AureliaEnhancedOptions & InitOptions): Promise<AureliaEnhancedI18Next>;
    i18nextReady(): Promise<AureliaEnhancedI18Next>;
    setLocale(locale: string): Promise<i18next.TranslationFunction>;
    getLocale(): string;
    nf(options?: Intl.NumberFormatOptions, locales?: string | string[]): Intl.NumberFormat;
    uf(numberLike: string, locale?: string): number;
    df(options?: Intl.DateTimeFormatOptions, locales?: string | string[]): Intl.DateTimeFormat;
    tr(key: string | string[], options?: i18next.TranslationOptions<object>): any;
    registerGlobalVariable(key: string, value: any): void;
    unregisterGlobalVariable(key: string): void;
    /**
     * Scans an element for children that have a translation attribute and
     * updates their innerHTML with the current translation values.
     *
     * If an image is encountered the translated value will be applied to the src attribute.
     *
     * @param el    HTMLElement to search within
     */
    updateTranslations(el: HTMLElement): void;
    updateValue(node: Element & {
        au: any;
    }, value: string, params: any): void;
}
