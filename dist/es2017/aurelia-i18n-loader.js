export class Backend {
    constructor(services, options = {}) {
        this.services = services;
        this.options = options;
        this.type = "backend";
        this.init(services, options);
    }
    static with(loader) {
        this.loader = loader;
        return this;
    }
    init(services, options = {}) {
        this.services = services;
        this.options = Object.assign({}, {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            addPath: "locales/add/{{lng}}/{{ns}}",
            allowMultiLoading: false,
            parse: JSON.parse
        }, options);
    }
    readMulti(languages, namespaces, callback) {
        let loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === "function") {
            loadPath = this.options.loadPath(languages, namespaces);
        }
        const url = this.services
            .interpolator
            .interpolate(loadPath, { lng: languages.join("+"), ns: namespaces.join("+") });
        this.loadUrl(url, callback);
    }
    read(language, namespace, callback) {
        let loadPath = this.options.loadPath;
        if (typeof this.options.loadPath === "function") {
            loadPath = this.options.loadPath([language], [namespace]);
        }
        const url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });
        this.loadUrl(url, callback);
    }
    async loadUrl(url, callback) {
        try {
            const response = await Backend.loader.loadText(url);
            let ret;
            let err;
            try {
                ret = (response instanceof Object) ? response : this.options.parse(response, url);
            }
            catch (e) {
                err = "failed parsing " + url + " to json";
            }
            if (err) {
                return callback(err, false);
            }
            callback(null, ret);
        }
        catch (_a) {
            callback("failed loading " + url, false /* no retry */);
        }
    }
    // tslint:disable-next-line:variable-name
    create(_languages, _namespace, _key, _fallbackValue) {
        // not supported
    }
}
Backend.type = "backend";
export default Backend;
//# sourceMappingURL=aurelia-i18n-loader.js.map