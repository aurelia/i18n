// aurelia-i18n-loader
// an implementation of an i18next Backend that uses the aurelia loader to load the json translation files
// based on i18next-xhr-backend
//
// usage:
// aurelia.use.plugin('aurelia-i18n', (instance) => {
//    // register backend plugin
//    instance.i18next.use(Backend.with(aurelia.loader));

export class Backend {

  static loader = null; // static loader to support passing the aurelia-loader

  static with(loader) {
    this.loader = loader;
    return this;
  }

  constructor(services, options = {}) {
    this.init(services, options);
    this.type = 'backend';
  }

  init(services, options = {}) {
    this.services = services;
    this.options = defaults(options, this.options || {}, getDefaults());
  }

  readMulti(languages, namespaces, callback) {
    let loadPath = this.options.loadPath;
    if (typeof this.options.loadPath === 'function') {
	    loadPath = this.options.loadPath(languages, namespaces);
    }

    let url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

    this.loadUrl(url, callback);
  }

  read(language, namespace, callback) {
    let loadPath = this.options.loadPath;
    if (typeof this.options.loadPath === 'function') {
	    loadPath = this.options.loadPath([language], [namespace]);
    }

    let url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

    this.loadUrl(url, callback);
  }

  loadUrl(url, callback) {
    this.constructor.loader.loadText(url)
    .then(response=>{
      let ret;
      let err;
      try {
        ret = this.options.parse(response, url);
      } catch (e) {
        err = 'failed parsing ' + url + ' to json';
      }
      if (err) return callback(err, false);
      callback(null, ret);
    },
    response=>{
      return callback('failed loading ' + url, false /* no retry */);
    });
  }

  create(languages, namespace, key, fallbackValue) {
    // create is not (yet) supported
  }
}

Backend.type = 'backend';
export default Backend;

// helper functions
let arr = [];
let each = arr.forEach;
let slice = arr.slice;

function getDefaults() {
  return {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    addPath: 'locales/add/{{lng}}/{{ns}}',
    allowMultiLoading: false,
    parse: JSON.parse
  };
}

function defaults(obj) {
  each.call(slice.call(arguments, 1), function(source) {
    if (source) {
      for (let prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
