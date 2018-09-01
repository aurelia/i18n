import { Container } from "aurelia-dependency-injection";
export declare let extend: (destination: any, source: any) => any;
export declare const isInteger: (number: number) => boolean;
export declare let assignObjectToKeys: (root: any, obj: any) => any;
export declare class LazyOptional {
    private key;
    static of(key: any): LazyOptional;
    constructor(key: string);
    get(container: Container): () => any;
}
