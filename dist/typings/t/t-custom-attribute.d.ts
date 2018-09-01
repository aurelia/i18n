import { EventAggregator } from "aurelia-event-aggregator";
import { I18N } from "../i18n";
import { LazyOptional } from "../utils";
export declare class TCustomAttribute {
    private element;
    private service;
    private ea;
    static inject(): ({
        new (): Element;
        prototype: Element;
    } | typeof EventAggregator | typeof I18N | LazyOptional)[];
    static configureAliases(aliases: string[]): void;
    private params;
    private lazyParams;
    private subscription;
    private value;
    constructor(element: Element & {
        au: any;
    }, service: I18N, ea: EventAggregator, p: any);
    bind(): void;
    paramsChanged(newValue: any, newParams: any): void;
    valueChanged(newValue: any): void;
    unbind(): void;
}
