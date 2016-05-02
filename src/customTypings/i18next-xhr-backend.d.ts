declare module 'i18next-xhr-backend' {
    export class Backend {
        type: any;
        services: any;
        options: any;
        constructor(services: any, options?: {});
        init(services: any, options?: {}): void;
        readMulti(languages: any, namespaces: any, callback: any): void;
        read(language: any, namespace: any, callback: any): void;
        loadUrl(url: any, callback: any): void;
        create(languages: any, namespace: any, key: any, fallbackValue: any): void;
    }
}