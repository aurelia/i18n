'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    Object.keys(trans).map(function (key) {
      var translation = trans[key].translation;
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
        timeDiff = this.getTimeDiffDescription(diff, 'month', 2592000000);
        if (!timeDiff) {
          timeDiff = this.getTimeDiffDescription(diff, 'day', 86400000);
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
        return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
      } else if (unitAmount < 0) {
        var abs = Math.abs(unitAmount);
        return this.service.tr(unit, { count: abs, context: 'in' });
      }

      return null;
    }
  }]);

  return RelativeTime;
})();

exports.RelativeTime = RelativeTime;