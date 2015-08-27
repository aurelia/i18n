System.register(['babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './relativeTime'], function (_export) {
  var _createClass, _classCallCheck, RelativeTime, RtValueConverter;

  return {
    setters: [function (_babelRuntimeHelpersCreateClass) {
      _createClass = _babelRuntimeHelpersCreateClass['default'];
    }, function (_babelRuntimeHelpersClassCallCheck) {
      _classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
    }, function (_relativeTime) {
      RelativeTime = _relativeTime.RelativeTime;
    }],
    execute: function () {
      'use strict';

      RtValueConverter = (function () {
        _createClass(RtValueConverter, null, [{
          key: 'inject',
          value: function inject() {
            return [RelativeTime];
          }
        }]);

        function RtValueConverter(relativeTime) {
          _classCallCheck(this, RtValueConverter);

          this.service = relativeTime;
        }

        _createClass(RtValueConverter, [{
          key: 'toView',
          value: function toView(value) {
            return this.service.getRelativeTime(value);
          }
        }]);

        return RtValueConverter;
      })();

      _export('RtValueConverter', RtValueConverter);
    }
  };
});