export declare class TParamsCustomAttribute {
    element: Element;
    static inject(): {
        new (): Element;
        prototype: Element;
    }[];
    static configureAliases(aliases: string[]): void;
    service: any;
    constructor(element: Element);
    valueChanged(): void;
}
