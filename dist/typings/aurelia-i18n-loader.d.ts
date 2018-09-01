import { Loader } from "aurelia-loader";
export declare type LoadPathOption = string | ((lngs: string[], namespaces: string[]) => string);
export declare type LoadCallback = (error: any, result: string | false | undefined) => void;
export interface AureliaBackendOptions {
    loadPath?: LoadPathOption;
    parse?(data: string, url: string): string;
}
export declare class Backend {
    services: any;
    options: AureliaBackendOptions;
    static type: string;
    static loader: Loader;
    static with(loader: Loader): typeof Backend;
    type: string;
    constructor(services: any, options?: AureliaBackendOptions);
    init(services: any, options?: AureliaBackendOptions): void;
    readMulti(languages: string[], namespaces: string[], callback: LoadCallback): void;
    read(language: string, namespace: string, callback: LoadCallback): void;
    loadUrl(url: string, callback: LoadCallback): Promise<void>;
    create(_languages: string | string[], _namespace: string, _key: string, _fallbackValue: string): void;
}
export default Backend;
