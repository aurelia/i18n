'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseI18N = undefined;

var _class, _temp;

var _i18n = require('./i18n');

var _aureliaPal = require('aurelia-pal');

var _aureliaEventAggregator = require('aurelia-event-aggregator');



var BaseI18N = exports.BaseI18N = (_temp = _class = function () {
  function BaseI18N(i18n, element, ea) {
    var _this = this;

    

    this.i18n = i18n;
    this.element = element;

    this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function () {
      _this.i18n.updateTranslations(_this.element);
    });
  }

  BaseI18N.prototype.attached = function attached() {
    this.i18n.updateTranslations(this.element);
  };

  BaseI18N.prototype.detached = function detached() {
    this.__i18nDisposer.dispose();
  };

  return BaseI18N;
}(), _class.inject = [_i18n.I18N, _aureliaPal.DOM.Element, _aureliaEventAggregator.EventAggregator], _temp);