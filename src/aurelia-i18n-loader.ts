import { Loader } from "aurelia-loader";
import { Module } from "i18next";

// aurelia-i18n-loader
// an implementation of an i18next Backend that uses the aurelia loader to load the json translation files
// based on i18next-xhr-backend
//
// usage:
// aurelia.use.plugin('aurelia-i18n', (instance) => {
//    // register backend plugin
//    instance.i18next.use(Backend.with(aurelia.loader));

export type LoadPathOption = string | ((lngs: string[], namespaces: string[]) => string);
export type LoadCallback = (error: any, result: string | false | undefined) => void;

export interface AureliaBackendOptions {
  loadPath?: LoadPathOption;
  parse?(data: string, url: string): string;
}

export class Backend implements Module {

  public static type: "backend" = "backend";
  public static loader: Loader; // static loader to support passing the aurelia-loader

  public static with(loader: Loader) {
    this.loader = loader;
    return this;
  }
  public type: "backend" = "backend";

  constructor(public services: any, public options: AureliaBackendOptions = {}) {
    this.init(services, options);
  }

  public init(services: any, options: AureliaBackendOptions = {}) {
    this.services = services;
    this.options = Object.assign({}, {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
      addPath: "locales/add/{{lng}}/{{ns}}",
      allowMultiLoading: false,
      parse: JSON.parse
    }, options);
  }

  public readMulti(languages: string[], namespaces: string[], callback: LoadCallback) {
    let loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === "function") {
      loadPath = this.options.loadPath(languages, namespaces);
    }

    const url = this.services
      .interpolator
      .interpolate(loadPath, { lng: languages.join("+"), ns: namespaces.join("+") });

    this.loadUrl(url, callback);
  }

  public read(language: string, namespace: string, callback: LoadCallback) {
    let loadPath = this.options.loadPath;

    if (typeof this.options.loadPath === "function") {
      loadPath = this.options.loadPath([language], [namespace]);
    }

    const url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

    this.loadUrl(url, callback);
  }

  public async loadUrl(url: string, callback: LoadCallback) {
    try {
      const response = await Backend.loader.loadText(url);
      let ret;
      let err;
      try {
        ret = (response as any instanceof Object) ? response : this.options.parse!(response, url);
      } catch (e) {
        err = "failed parsing " + url + " to json";
      }

      if (err) {
        return callback(err, false);
      }
      callback(null, ret);
    } catch {
      callback("failed loading " + url, false /* no retry */);
    }
  }

  // tslint:disable-next-line:variable-name
  public create(_languages: string | string[], _namespace: string, _key: string, _fallbackValue: string) {
    // not supported
  }
}

export default Backend;
