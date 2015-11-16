System.register(['./i18n', './defaultTranslations/relative.time'], function (_export) {
  'use strict';

  var I18N, translations, RelativeTime;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_i18n) {
      I18N = _i18n.I18N;
    }, function (_defaultTranslationsRelativeTime) {
      translations = _defaultTranslationsRelativeTime.translations;
    }],
    execute: function () {
      RelativeTime = (function () {
        RelativeTime.inject = function inject() {
          return [I18N];
        };

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

        RelativeTime.prototype.getRelativeTime = function getRelativeTime(time) {
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
        };

        RelativeTime.prototype.getTimeDiffDescription = function getTimeDiffDescription(diff, unit, timeDivisor) {
          var unitAmount = (diff / timeDivisor).toFixed(0);
          if (unitAmount > 0) {
            return this.service.tr(unit, { count: parseInt(unitAmount, 10), context: 'ago' });
          } else if (unitAmount < 0) {
            var abs = Math.abs(unitAmount);
            return this.service.tr(unit, { count: abs, context: 'in' });
          }

          return null;
        };

        return RelativeTime;
      })();

      _export('RelativeTime', RelativeTime);
    }
  };
});