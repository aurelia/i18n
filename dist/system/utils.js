System.register([], function (_export) {
  'use strict';

  var extend, assignObjectToKeys;
  return {
    setters: [],
    execute: function () {
      extend = function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
      };

      _export('extend', extend);

      assignObjectToKeys = function assignObjectToKeys(root, obj) {
        if (obj === undefined || obj === null) return obj;

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

      _export('assignObjectToKeys', assignObjectToKeys);
    }
  };
});