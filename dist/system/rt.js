System.register(['./relativeTime'], function (_export) {
  'use strict';

  var RelativeTime, RtValueConverter;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_relativeTime) {
      RelativeTime = _relativeTime.RelativeTime;
    }],
    execute: function () {
      RtValueConverter = (function () {
        RtValueConverter.inject = function inject() {
          return [RelativeTime];
        };

        function RtValueConverter(relativeTime) {
          _classCallCheck(this, RtValueConverter);

          this.service = relativeTime;
        }

        RtValueConverter.prototype.toView = function toView(value) {
          return this.service.getRelativeTime(value);
        };

        return RtValueConverter;
      })();

      _export('RtValueConverter', RtValueConverter);
    }
  };
});