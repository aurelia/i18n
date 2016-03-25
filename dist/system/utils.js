'use strict';

System.register(['aurelia-dependency-injection'], function (_export, _context) {
  var resolver, _dec, _class, _typeof, extend, assignObjectToKeys, LazyOptional;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDependencyInjection) {
      resolver = _aureliaDependencyInjection.resolver;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };

      _export('extend', extend = function extend(destination, source) {
        for (var property in source) {
          destination[property] = source[property];
        }

        return destination;
      });

      _export('extend', extend);

      _export('assignObjectToKeys', assignObjectToKeys = function assignObjectToKeys(root, obj) {
        if (obj === undefined || obj === null) {
          return obj;
        }

        var opts = {};

        Object.keys(obj).map(function (key) {
          if (_typeof(obj[key]) === 'object') {
            extend(opts, assignObjectToKeys(key, obj[key]));
          } else {
            opts[root !== '' ? root + '.' + key : key] = obj[key];
          }
        });

        return opts;
      });

      _export('assignObjectToKeys', assignObjectToKeys);

      _export('LazyOptional', LazyOptional = (_dec = resolver(), _dec(_class = function () {
        function LazyOptional(key) {
          _classCallCheck(this, LazyOptional);

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

        return LazyOptional;
      }()) || _class));

      _export('LazyOptional', LazyOptional);
    }
  };
});