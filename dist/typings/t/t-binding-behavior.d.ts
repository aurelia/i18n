import { SignalBindingBehavior } from "aurelia-templating-resources";
export declare class TBindingBehavior {
    private signalBindingBehavior;
    static inject: (typeof SignalBindingBehavior)[];
    constructor(signalBindingBehavior: SignalBindingBehavior);
    bind(binding: any, source: any): void;
    unbind(binding: any, source: any): void;
}
