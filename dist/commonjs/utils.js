'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var extend = function extend(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }return destination;
};

exports.extend = extend;
var assignObjectToKeys = function assignObjectToKeys(root, obj) {
  if (obj === undefined || obj === null) {
    return obj;
  }

  var opts = {};

  Object.keys(obj).map(function (key) {
    if (typeof obj[key] === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};

exports.assignObjectToKeys = assignObjectToKeys;

var LazyOptional = (function () {
  function LazyOptional(key) {
    _classCallCheck(this, _LazyOptional);

    this.key = key;
  }

  LazyOptional.prototype.get = function get(container) {
    var _this = this;

    return function () {
      if (container.hasResolver(_this.key, false)) {
        return container.get(_this.key);
      }
      return null;
    };
  };

  LazyOptional.of = function of(key) {
    return new LazyOptional(key);
  };

  var _LazyOptional = LazyOptional;
  LazyOptional = _aureliaDependencyInjection.resolver()(LazyOptional) || LazyOptional;
  return LazyOptional;
})();

exports.LazyOptional = LazyOptional;