import { RelativeTime } from "../relativeTime";
export declare class RtValueConverter {
    private service;
    static inject(): (typeof RelativeTime)[];
    constructor(service: RelativeTime);
    toView(value: any): any;
}
