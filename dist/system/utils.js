System.register(['babel-runtime/core-js/object/keys'], function (_export) {
  var _Object$keys, extend, assignObjectToKeys;

  return {
    setters: [function (_babelRuntimeCoreJsObjectKeys) {
      _Object$keys = _babelRuntimeCoreJsObjectKeys['default'];
    }],
    execute: function () {
      'use strict';

      extend = function extend(destination, source) {
        for (var property in source) destination[property] = source[property];
        return destination;
      };

      _export('extend', extend);

      assignObjectToKeys = function assignObjectToKeys(root, obj) {
        if (obj === undefined || obj === null) return obj;

        var opts = {};

        _Object$keys(obj).map(function (key) {
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