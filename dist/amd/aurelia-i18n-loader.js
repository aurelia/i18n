define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var _class, _temp;

  var Backend = exports.Backend = (_temp = _class = function () {
    Backend.with = function _with(loader) {
      this.loader = loader;
      return this;
    };

    function Backend(services) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      

      this.init(services, options);
      this.type = 'backend';
    }

    Backend.prototype.init = function init(services) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      this.services = services;
      this.options = defaults(options, this.options || {}, getDefaults());
    };

    Backend.prototype.readMulti = function readMulti(languages, namespaces, callback) {
      var loadPath = this.options.loadPath;

      if (typeof this.options.loadPath === 'function') {
        loadPath = this.options.loadPath(languages, namespaces);
      }

      var url = this.services.interpolator.interpolate(loadPath, { lng: languages.join('+'), ns: namespaces.join('+') });

      this.loadUrl(url, callback);
    };

    Backend.prototype.read = function read(language, namespace, callback) {
      var loadPath = this.options.loadPath;

      if (typeof this.options.loadPath === 'function') {
        loadPath = this.options.loadPath([language], [namespace]);
      }

      var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });

      this.loadUrl(url, callback);
    };

    Backend.prototype.loadUrl = function loadUrl(url, callback) {
      var _this = this;

      this.constructor.loader.loadText(url).then(function (response) {
        var ret = void 0;
        var err = void 0;
        try {
          ret = response instanceof Object ? response : _this.options.parse(response, url);
        } catch (e) {
          err = 'failed parsing ' + url + ' to json';
        }
        if (err) return callback(err, false);
        callback(null, ret);
      }, function (response) {
        return callback('failed loading ' + url, false);
      });
    };

    Backend.prototype.create = function create(languages, namespace, key, fallbackValue) {};

    return Backend;
  }(), _class.loader = null, _temp);


  Backend.type = 'backend';
  exports.default = Backend;

  var arr = [];
  var each = arr.forEach;
  var slice = arr.slice;

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
        for (var prop in source) {
          if (obj[prop] === undefined) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }
});