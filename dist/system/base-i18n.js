System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './i18n', 'aurelia-event-aggregator'], function (_export) {
  var _createClass, _classCallCheck, I18N, EventAggregator, BaseI18N;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      'use strict';

      BaseI18N = (function () {
        _createClass(BaseI18N, null, [{
          key: 'inject',
          value: [I18N, Element, EventAggregator],
          enumerable: true
        }]);

        function BaseI18N(i18n, element, ea) {
          var _this = this;

          _classCallCheck(this, BaseI18N);

          this.i18n = i18n;
          this.element = element;

          this.__i18nDisposer = ea.subscribe('i18n:locale:changed', function (payload) {
            _this.i18n.updateTranslations(_this.element);
          });
        }

        _createClass(BaseI18N, [{
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

      _export('BaseI18N', BaseI18N);
    }
  };
});