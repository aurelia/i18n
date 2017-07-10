var _class, _temp;

export let Backend = (_temp = _class = class Backend {

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
    this.constructor.loader.loadText(url).then(response => {
      let ret;
      let err;
      try {
        ret = response instanceof Object ? response : this.options.parse(response, url);
      } catch (e) {
        err = 'failed parsing ' + url + ' to json';
      }
      if (err) return callback(err, false);
      callback(null, ret);
    }, response => {
      return callback('failed loading ' + url, false);
    });
  }

  create(languages, namespace, key, fallbackValue) {}
}, _class.loader = null, _temp);

Backend.type = 'backend';
export default Backend;

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
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (let prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}