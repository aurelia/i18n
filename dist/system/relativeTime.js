System.register(["aurelia-event-aggregator", "./i18n", "./defaultTranslations/relative.time"], function (exports_1, context_1) {
    "use strict";
    var aurelia_event_aggregator_1, i18n_1, relative_time_1, RelativeTime;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (i18n_1_1) {
                i18n_1 = i18n_1_1;
            },
            function (relative_time_1_1) {
                relative_time_1 = relative_time_1_1;
            }
        ],
        execute: function () {
            RelativeTime = /** @class */ (function () {
                function RelativeTime(service, ea) {
                    var _this = this;
                    this.service = service;
                    this.ea = ea;
                    this.service.i18nextReady().then(function () {
                        _this.setup();
                    });
                    this.ea.subscribe(i18n_1.I18N_EA_SIGNAL, function (locales) {
                        _this.setup(locales);
                    });
                }
                RelativeTime.inject = function () { return [i18n_1.I18N, aurelia_event_aggregator_1.EventAggregator]; };
                RelativeTime.prototype.setup = function (locales) {
                    var trans = relative_time_1.translations.default || relative_time_1.translations;
                    var fallbackLng = this.service.i18next.fallbackLng;
                    var alternateFb = fallbackLng || this.service.i18next.options.fallbackLng;
                    if (Array.isArray(alternateFb) && alternateFb.length > 0) {
                        alternateFb = alternateFb[0];
                    }
                    var key = ((locales && locales.newValue)
                        ? locales.newValue
                        : this.service.getLocale()) || alternateFb;
                    var index = 0;
                    // tslint:disable-next-line:no-conditional-assignment
                    if ((index = key.indexOf("-")) >= 0) {
                        var baseLocale = key.substring(0, index);
                        if (trans[baseLocale]) {
                            this.addTranslationResource(baseLocale, trans[baseLocale].translation);
                        }
                    }
                    if (trans[key]) {
                        this.addTranslationResource(key, trans[key].translation);
                    }
                    if (trans[fallbackLng]) {
                        this.addTranslationResource(key, trans[fallbackLng].translation);
                    }
                };
                RelativeTime.prototype.addTranslationResource = function (key, translation) {
                    var options = this.service.i18next.options;
                    if (options.interpolation && (options.interpolation.prefix !== "__" || options.interpolation.suffix !== "__")) {
                        // tslint:disable-next-line:forin
                        for (var subkey in translation) {
                            translation[subkey] = translation[subkey]
                                .replace("__count__", (options.interpolation.prefix || "{{") + "count" + (options.interpolation.suffix || "}}"));
                        }
                    }
                    this.service.i18next.addResources(key, options.defaultNS || "translation", translation);
                };
                RelativeTime.prototype.getRelativeTime = function (time) {
                    var now = new Date();
                    var diff = now.getTime() - time.getTime();
                    var timeDiff = this.getTimeDiffDescription(diff, "year", 31104000000);
                    if (!timeDiff) {
                        timeDiff = this.getTimeDiffDescription(diff, "month", 2592000000);
                        if (!timeDiff) {
                            timeDiff = this.getTimeDiffDescription(diff, "day", 86400000);
                            if (!timeDiff) {
                                timeDiff = this.getTimeDiffDescription(diff, "hour", 3600000);
                                if (!timeDiff) {
                                    timeDiff = this.getTimeDiffDescription(diff, "minute", 60000);
                                    if (!timeDiff) {
                                        timeDiff = this.getTimeDiffDescription(diff, "second", 1000);
                                        if (!timeDiff) {
                                            timeDiff = this.service.tr("now");
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return timeDiff;
                };
                RelativeTime.prototype.getTimeDiffDescription = function (diff, unit, timeDivisor) {
                    var unitAmount = parseInt((diff / timeDivisor).toFixed(0), 10);
                    if (unitAmount > 0) {
                        return this.service.tr(unit, { count: unitAmount, context: "ago" });
                    }
                    else if (unitAmount < 0) {
                        var abs = Math.abs(unitAmount);
                        return this.service.tr(unit, { count: abs, context: "in" });
                    }
                    return null;
                };
                return RelativeTime;
            }());
            exports_1("RelativeTime", RelativeTime);
        }
    };
});
//# sourceMappingURL=relativeTime.js.map