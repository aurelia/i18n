'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaI18n = require('./aurelia-i18n');

Object.keys(_aureliaI18n).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaI18n[key];
    }
  });
});