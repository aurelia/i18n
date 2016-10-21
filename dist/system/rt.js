'use strict';

System.register(['./relativeTime'], function (_export, _context) {
  "use strict";

  var RelativeTime, RtValueConverter;

  

  return {
    setters: [function (_relativeTime) {
      RelativeTime = _relativeTime.RelativeTime;
    }],
    execute: function () {
      _export('RtValueConverter', RtValueConverter = function () {
        RtValueConverter.inject = function inject() {
          return [RelativeTime];
        };

        function RtValueConverter(relativeTime) {
          

          this.service = relativeTime;
        }

        RtValueConverter.prototype.toView = function toView(value) {
          if (value === null || typeof value === 'undefined' || typeof value === 'string' && value.trim() === '') {
            return value;
          }

          if (typeof value === 'string' && isNaN(value) && !Number.isInteger(value)) {
            value = new Date(value);
          }

          return this.service.getRelativeTime(value);
        };

        return RtValueConverter;
      }());

      _export('RtValueConverter', RtValueConverter);
    }
  };
});