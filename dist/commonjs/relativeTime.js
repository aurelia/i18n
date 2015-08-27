'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _i18n = require('./i18n');

var _defaultTranslationsRelativeTime = require('./defaultTranslations/relative.time');

var translations = _interopRequireWildcard(_defaultTranslationsRelativeTime);

var RelativeTime = (function () {
  _createClass(RelativeTime, null, [{
    key: 'inject',
    value: function inject() {
      return [_i18n.I18N];
    }
  }]);

  function RelativeTime(i18n) {
    var _this = this;

    _classCallCheck(this, RelativeTime);

    this.service = i18n;

    var trans = translations['default'] || translations;

    _Object$keys(trans).map(function (key) {
      var translation = trans[key]['translation'];
      var options = i18n.i18next.options;

      if (options.interpolationPrefix !== '__' || options.interpolationSuffix !== '__') {
        for (var subkey in translation) {
          translation[subkey] = translation[subkey].replace('__count__', options.interpolationPrefix + 'count' + options.interpolationSuffix);
        }
      }

      _this.service.i18next.addResources(key, 'translation', translation);
    });
  }

  _createClass(RelativeTime, [{
    key: 'getRelativeTime',
    value: function getRelativeTime(time) {
      var now = new Date();
      var diff = now.getTime() - time.getTime();

      var timeDiff = this.getTimeDiffDescription(diff, 'year', 31104000000);
      if (!timeDiff) {
        var timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
        if (!timeDiff) {
          var timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
          if (!timeDiff) {
            timeDiff = this.getTimeDiffDescription(diff, 'hour', 3600000);
            if (!timeDiff) {
              timeDiff = this.getTimeDiffDescription(diff, 'minute', 60000);
              if (!timeDiff) {
                timeDiff = this.getTimeDiffDescription(diff, 'second', 1000);
                if (!timeDiff) {
                  timeDiff = this.service.tr('now');
                }
              }
            }
          }
        }
      }

      return timeDiff;
    }
  }, {
    key: 'getTimeDiffDescription',
    value: function getTimeDiffDescription(diff, unit, timeDivisor) {
      var unitAmount = (diff / timeDivisor).toFixed(0);
      if (unitAmount > 0) {
        return this.service.tr(unit, { count: parseInt(unitAmount), context: 'ago' });
      } else if (unitAmount < 0) {
        var abs = Math.abs(unitAmount);
        return this.service.tr(unit, { count: abs, context: 'in' });
      } else {
        return null;
      }
    }
  }]);

  return RelativeTime;
})();

exports.RelativeTime = RelativeTime;