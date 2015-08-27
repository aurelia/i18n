define(['exports', 'babel-runtime/helpers/create-class', 'babel-runtime/helpers/class-call-check', './relativeTime'], function (exports, _babelRuntimeHelpersCreateClass, _babelRuntimeHelpersClassCallCheck, _relativeTime) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });

  var RtValueConverter = (function () {
    (0, _babelRuntimeHelpersCreateClass['default'])(RtValueConverter, null, [{
      key: 'inject',
      value: function inject() {
        return [_relativeTime.RelativeTime];
      }
    }]);

    function RtValueConverter(relativeTime) {
      (0, _babelRuntimeHelpersClassCallCheck['default'])(this, RtValueConverter);

      this.service = relativeTime;
    }

    (0, _babelRuntimeHelpersCreateClass['default'])(RtValueConverter, [{
      key: 'toView',
      value: function toView(value) {
        return this.service.getRelativeTime(value);
      }
    }]);
    return RtValueConverter;
  })();

  exports.RtValueConverter = RtValueConverter;
});