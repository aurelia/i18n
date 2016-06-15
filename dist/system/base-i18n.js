'use strict';

System.register(['./i18n', 'aurelia-event-aggregator'], function (_export, _context) {
  "use strict";

  var I18N, EventAggregator, _class, _temp, BaseI18N;

  

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_aureliaEventAggregator) {
      EventAggregator = _aureliaEventAggregator.EventAggregator;
    }],
    execute: function () {
      _export('BaseI18N', BaseI18N = (_temp = _class = function () {
        function BaseI18N(i18n, element, ea) {
          var _this = this;

          _classCallCheck(this, BaseI18N);

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
      }(), _class.inject = [I18N, Element, EventAggregator], _temp));

      _export('BaseI18N', BaseI18N);
    }
  };
});