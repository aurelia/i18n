define(['exports', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n', 'aurelia-event-aggregator'], function (exports, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _i18n, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var BaseI18N = (function () {
    (0, _babelRuntimeHelpersCreateClass['default'])(BaseI18N, null, [{
      key: 'inject',
      value: [_i18n.I18N, Element, _aureliaEventAggregator.EventAggregator],
      enumerable: true
    }]);

    function BaseI18N(i18n, element, ea) {
      var _this = this;

      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, BaseI18N);

      this.i18n = i18n;
      this.element = element;

      this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function (payload) {
        _this.i18n.updateTranslations(_this.element);
      });
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(BaseI18N, [{
      key: 'attached',
      value: function attached() {
        this.i18n.updateTranslations(this.element);
      }
    }, {
      key: 'detached',
      value: function detached() {
        this.__i18nDisposer();
      }
    }]);
    return BaseI18N;
  })();

  exports.BaseI18N = BaseI18N;
});