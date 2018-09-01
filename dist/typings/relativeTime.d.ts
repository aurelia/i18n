import { EventAggregator } from "aurelia-event-aggregator";
import { I18N } from "./i18n";
export declare class RelativeTime {
    private service;
    private ea;
    static inject(): (typeof EventAggregator | typeof I18N)[];
    constructor(service: I18N, ea: EventAggregator);
    setup(locales?: {
        oldValue: string;
        newValue: string;
    }): void;
    addTranslationResource(key: string, translation: any): void;
    getRelativeTime(time: Date): any;
    getTimeDiffDescription(diff: number, unit: "year" | "month" | "day" | "hour" | "minute" | "second", timeDivisor: number): any;
}
