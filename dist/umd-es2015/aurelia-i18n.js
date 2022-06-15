(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aurelia-templating'), require('i18next'), require('aurelia-pal'), require('aurelia-logging'), require('aurelia-event-aggregator'), require('aurelia-templating-resources'), require('aurelia-binding'), require('aurelia-metadata'), require('aurelia-dependency-injection'), require('aurelia-framework')) :
    typeof define === 'function' && define.amd ? define(['exports', 'aurelia-templating', 'i18next', 'aurelia-pal', 'aurelia-logging', 'aurelia-event-aggregator', 'aurelia-templating-resources', 'aurelia-binding', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-framework'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.au = global.au || {}, global.au.i18n = {}), global.au, global.i18next, global.au, global.au.LogManager, global.au, global.au, global.au, global.au, global.au, global.au));
})(this, (function (exports, aureliaTemplating, i18next, aureliaPal, LogManager, aureliaEventAggregator, aureliaTemplatingResources, aureliaBinding, aureliaMetadata, aureliaDependencyInjection, aureliaFramework) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n["default"] = e;
        return Object.freeze(n);
    }

    var i18next__default = /*#__PURE__*/_interopDefaultLegacy(i18next);
    var LogManager__namespace = /*#__PURE__*/_interopNamespace(LogManager);

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const I18N_EA_SIGNAL = "i18n:locale:changed";
    class I18N {
        constructor(ea, signaler) {
            this.ea = ea;
            this.signaler = signaler;
            this.globalVars = {};
            this.i18next = i18next__default["default"];
            this.Intl = aureliaPal.PLATFORM.global.Intl;
        }
        static inject() { return [aureliaEventAggregator.EventAggregator, aureliaTemplatingResources.BindingSignaler]; }
        setup(options) {
            return __awaiter(this, void 0, void 0, function* () {
                const defaultOptions = {
                    skipTranslationOnMissingKey: false,
                    compatibilityJSON: "v1",
                    lng: "en",
                    attributes: ["t", "i18n"],
                    fallbackLng: "en",
                    debug: false,
                    interpolation: {
                        skipOnVariables: false
                    }
                };
                this.i18nextDeferred = new Promise((resolve, reject) => {
                    this.i18next.init(options || defaultOptions, (err) => {
                        if (err && !Array.isArray(err)) {
                            reject(err);
                        }
                        // make sure attributes is an array in case a string was provided
                        if (this.i18next.options.attributes instanceof String) {
                            this.i18next.options.attributes = [this.i18next.options.attributes];
                        }
                        resolve(this.i18next);
                    });
                });
                return this.i18nextDeferred;
            });
        }
        i18nextReady() {
            return this.i18nextDeferred;
        }
        setLocale(locale) {
            return new Promise((resolve, reject) => {
                const oldLocale = this.getLocale();
                this.i18next.changeLanguage(locale, (err, tr) => {
                    if (err) {
                        reject(err);
                    }
                    this.ea.publish(I18N_EA_SIGNAL, { oldValue: oldLocale, newValue: locale });
                    this.signaler.signal("aurelia-translation-signal");
                    resolve(tr);
                });
            });
        }
        getLocale() {
            return this.i18next.language;
        }
        nf(options, locales) {
            return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
        }
        uf(numberLike, locale) {
            const nf = this.nf({}, locale || this.getLocale());
            const comparer = nf.format(10000 / 3);
            let thousandSeparator = comparer[1];
            const decimalSeparator = comparer[5];
            if (thousandSeparator === ".") {
                thousandSeparator = "\\.";
            }
            // remove all thousand seperators
            const result = numberLike.replace(new RegExp(thousandSeparator, "g"), "")
                // remove non-numeric signs except -> , .
                .replace(/[^\d.,-]/g, "")
                // replace original decimalSeparator with english one
                .replace(decimalSeparator, ".");
            // return real number
            return Number(result);
        }
        df(options, locales) {
            return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
        }
        // tslint:disable-next-line: max-line-length
        tr(key, options) {
            let fullOptions = this.globalVars;
            if (options !== undefined) {
                fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
            }
            return this.i18next.t(key, fullOptions);
        }
        registerGlobalVariable(key, value) {
            this.globalVars[key] = value;
        }
        unregisterGlobalVariable(key) {
            delete this.globalVars[key];
        }
        /**
         * Scans an element for children that have a translation attribute and
         * updates their innerHTML with the current translation values.
         *
         * If an image is encountered the translated value will be applied to the src attribute.
         *
         * @param el    HTMLElement to search within
         */
        updateTranslations(el) {
            if (!el || !el.querySelectorAll) {
                return;
            }
            let i;
            let l;
            // create a selector from the specified attributes to look for
            // var selector = [].concat(this.i18next.options.attributes);
            const attributes = this.i18next.options.attributes;
            let selector = [].concat(attributes);
            for (i = 0, l = selector.length; i < l; i++) {
                selector[i] = "[" + selector[i] + "]";
            }
            selector = selector.join(",");
            // get the nodes
            const nodes = el.querySelectorAll(selector);
            for (i = 0, l = nodes.length; i < l; i++) {
                const node = nodes[i];
                let keys;
                let params;
                // test every attribute and get the first one that has a value
                for (let i2 = 0, l2 = attributes.length; i2 < l2; i2++) {
                    keys = node.getAttribute(attributes[i2]);
                    const pname = attributes[i2] + "-params";
                    if (pname && node.au && node.au[pname]) {
                        params = node.au[pname].viewModel.value;
                    }
                    if (keys) {
                        break;
                    }
                }
                // skip if nothing was found
                if (!keys) {
                    continue;
                }
                // split the keys into multiple keys separated by a ;
                this.updateValue(node, keys, params);
            }
        }
        updateValue(node, value, params) {
            if (value === null || value === undefined) {
                value = "";
            }
            const keys = value.toString().split(";");
            let i = keys.length;
            while (i--) {
                let key = keys[i];
                // remove the optional attribute
                const re = /\[([a-z\-, ]*)\]/ig;
                let m;
                let attr = "text";
                // set default attribute to src if this is an image node
                if (node.nodeName === "IMG") {
                    attr = "src";
                }
                // check if a attribute was specified in the key
                // tslint:disable-next-line:no-conditional-assignment
                while ((m = re.exec(key)) !== null) {
                    if (m.index === re.lastIndex) {
                        re.lastIndex++;
                    }
                    if (m) {
                        key = key.replace(m[0], "");
                        attr = m[1];
                    }
                }
                const attrs = attr.split(",");
                let j = attrs.length;
                while (j--) {
                    attr = attrs[j].trim();
                    if (!node._textContent) {
                        node._textContent = node.textContent;
                    }
                    if (!node._innerHTML) {
                        node._innerHTML = node.innerHTML;
                    }
                    // convert to camelCase
                    // tslint:disable-next-line:only-arrow-functions
                    const attrCC = attr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                    const reservedNames = ["prepend", "append", "text", "html"];
                    const i18nLogger = LogManager__namespace.getLogger("i18n");
                    if (reservedNames.indexOf(attr) > -1 &&
                        node.au &&
                        node.au.controller &&
                        node.au.controller.viewModel &&
                        attrCC in node.au.controller.viewModel) {
                        i18nLogger.warn(`Aurelia I18N reserved attribute name\n
  [${reservedNames.join(", ")}]\n
  Your custom element has a bindable named ${attr} which is a reserved word.\n
  If you'd like Aurelia I18N to translate your bindable instead, please consider giving it another name.`);
                    }
                    if (this.i18next.options.skipTranslationOnMissingKey &&
                        this.tr(key, params) === key) {
                        i18nLogger.warn(`Couldn't find translation for key: ${key}`);
                        return;
                    }
                    // handle various attributes
                    // anything other than text,prepend,append or html will be added as an attribute on the element.
                    const translatedResult = (this.tr(key, params) || "").toString();
                    switch (attr) {
                        case "text":
                            const newChild = aureliaPal.DOM.createTextNode(translatedResult);
                            if (node._newChild && node._newChild.parentNode === node) {
                                node.removeChild(node._newChild);
                            }
                            node._newChild = newChild;
                            while (node.firstChild) {
                                node.removeChild(node.firstChild);
                            }
                            node.appendChild(node._newChild);
                            break;
                        case "prepend":
                            const prependParser = aureliaPal.DOM.createElement("div");
                            prependParser.innerHTML = translatedResult;
                            for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
                                if (node.childNodes[ni]._prepended) {
                                    node.removeChild(node.childNodes[ni]);
                                }
                            }
                            for (let pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
                                prependParser.childNodes[pi]._prepended = true;
                                if (node.firstChild) {
                                    node.insertBefore(prependParser.childNodes[pi], node.firstChild);
                                }
                                else {
                                    node.appendChild(prependParser.childNodes[pi]);
                                }
                            }
                            break;
                        case "append":
                            const appendParser = aureliaPal.DOM.createElement("div");
                            appendParser.innerHTML = translatedResult;
                            for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
                                if (node.childNodes[ni]._appended) {
                                    node.removeChild(node.childNodes[ni]);
                                }
                            }
                            while (appendParser.firstChild) {
                                appendParser.firstChild._appended = true;
                                node.appendChild(appendParser.firstChild);
                            }
                            break;
                        case "html":
                            node.innerHTML = translatedResult;
                            break;
                        default: // normal html attribute
                            if (node.au &&
                                node.au.controller &&
                                node.au.controller.viewModel &&
                                attrCC in node.au.controller.viewModel) {
                                node.au.controller.viewModel[attrCC] = this.tr(key, params);
                            }
                            else {
                                node.setAttribute(attr, translatedResult);
                            }
                            break;
                    }
                }
            }
        }
    }

    exports.TBindingBehavior = class TBindingBehavior {
        constructor(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        static inject() { return [aureliaTemplatingResources.SignalBindingBehavior]; }
        bind(binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
            // rewrite the expression to use the TValueConverter.
            // pass through any args to the binding behavior to the TValueConverter
            const sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            const expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "t", sourceExpression.args, [expression, ...sourceExpression.args]);
        }
        unbind(binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        }
    };
    exports.TBindingBehavior = __decorate([
        aureliaBinding.bindingBehavior("t")
    ], exports.TBindingBehavior);

    var LazyOptional_1;
    // tslint:disable-next-line:only-arrow-functions
    const isInteger = Number.isInteger || function (value) {
        return typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
    let LazyOptional = LazyOptional_1 = class LazyOptional {
        constructor(key) {
            this.key = key;
        }
        static of(key) {
            return new LazyOptional_1(key);
        }
        get(container) {
            return () => {
                if (container.hasResolver(this.key, false)) {
                    return container.get(this.key);
                }
                return null;
            };
        }
    };
    LazyOptional = LazyOptional_1 = __decorate([
        aureliaDependencyInjection.resolver()
    ], LazyOptional);

    var TParamsCustomAttribute_1;
    exports.TParamsCustomAttribute = TParamsCustomAttribute_1 = class TParamsCustomAttribute {
        constructor(element) {
            this.element = element;
        }
        static inject() {
            return [aureliaPal.DOM.Element];
        }
        static configureAliases(aliases) {
            const r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, aureliaTemplating.HtmlBehaviorResource, TParamsCustomAttribute_1);
            r.aliases = aliases;
        }
        valueChanged() { }
    };
    exports.TParamsCustomAttribute = TParamsCustomAttribute_1 = __decorate([
        aureliaTemplating.customAttribute("t-params")
    ], exports.TParamsCustomAttribute);

    var TCustomAttribute_1;
    exports.TCustomAttribute = TCustomAttribute_1 = class TCustomAttribute {
        constructor(element, service, ea, p) {
            this.element = element;
            this.service = service;
            this.ea = ea;
            this.lazyParams = p;
        }
        static inject() {
            return [aureliaPal.DOM.Element, I18N, aureliaEventAggregator.EventAggregator, LazyOptional.of(exports.TParamsCustomAttribute)];
        }
        static configureAliases(aliases) {
            const r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, aureliaTemplating.HtmlBehaviorResource, TCustomAttribute_1);
            r.aliases = aliases;
        }
        bind() {
            this.params = this.lazyParams();
            if (this.params) {
                this.params.valueChanged = (newParams, oldParams) => {
                    this.paramsChanged(this.value, newParams, oldParams);
                };
            }
            const p = this.params !== null ? this.params.value : undefined;
            this.subscription = this.ea.subscribe(I18N_EA_SIGNAL, () => {
                this.service.updateValue(this.element, this.value, this.params !== null ? this.params.value : undefined);
            });
            this.service.updateValue(this.element, this.value, p);
        }
        paramsChanged(newValue, newParams) {
            this.service.updateValue(this.element, newValue, newParams);
        }
        valueChanged(newValue) {
            const p = this.params !== null ? this.params.value : undefined;
            this.service.updateValue(this.element, newValue, p);
        }
        unbind() {
            // If unbind is called before timeout for subscription is triggered, subscription will be undefined
            if (this.subscription) {
                this.subscription.dispose();
            }
        }
    };
    exports.TCustomAttribute = TCustomAttribute_1 = __decorate([
        aureliaTemplating.customAttribute("t")
    ], exports.TCustomAttribute);

    exports.TValueConverter = class TValueConverter {
        constructor(service) {
            this.service = service;
        }
        static inject() { return [I18N]; }
        toView(value, options) {
            return this.service.tr(value, options);
        }
    };
    exports.TValueConverter = __decorate([
        aureliaFramework.valueConverter("t")
    ], exports.TValueConverter);

    exports.NfBindingBehavior = class NfBindingBehavior {
        constructor(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        static inject() { return [aureliaTemplatingResources.SignalBindingBehavior]; }
        bind(binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
            // rewrite the expression to use the NfValueConverter.
            // pass through any args to the binding behavior to the NfValueConverter
            const sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            const expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "nf", sourceExpression.args, [expression, ...sourceExpression.args]);
        }
        unbind(binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        }
    };
    exports.NfBindingBehavior = __decorate([
        aureliaBinding.bindingBehavior("nf")
    ], exports.NfBindingBehavior);

    exports.NfValueConverter = class NfValueConverter {
        constructor(service) {
            this.service = service;
        }
        static inject() { return [I18N]; }
        toView(value, nfOrOptions, locale) {
            if (value === null
                || typeof value === "undefined"
                || (typeof value === "string" && value.trim() === "")) {
                return value;
            }
            if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
                return nfOrOptions.format(value);
            }
            const nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
            return nf.format(value);
        }
    };
    exports.NfValueConverter = __decorate([
        aureliaBinding.valueConverter("nf")
    ], exports.NfValueConverter);

    exports.DfBindingBehavior = class DfBindingBehavior {
        constructor(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        static inject() { return [aureliaTemplatingResources.SignalBindingBehavior]; }
        bind(binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
            // rewrite the expression to use the DfValueConverter.
            // pass through any args to the binding behavior to the DfValueConverter
            const sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            const expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "df", sourceExpression.args, [expression, ...sourceExpression.args]);
        }
        unbind(binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        }
    };
    exports.DfBindingBehavior = __decorate([
        aureliaBinding.bindingBehavior("df")
    ], exports.DfBindingBehavior);

    exports.DfValueConverter = class DfValueConverter {
        constructor(service) {
            this.service = service;
        }
        static inject() { return [I18N]; }
        toView(value, dfOrOptions, locale) {
            if (value === null
                || typeof value === "undefined"
                || (typeof value === "string" && value.trim() === "")) {
                return value;
            }
            if (typeof value === "string" && isNaN(value) && !isInteger(value)) {
                value = new Date(value);
            }
            if (dfOrOptions && (dfOrOptions instanceof Intl.DateTimeFormat && typeof dfOrOptions.format === "function")) {
                return dfOrOptions.format(value);
            }
            const df = this.service.df(dfOrOptions, locale || this.service.getLocale());
            return df.format(value);
        }
    };
    exports.DfValueConverter = __decorate([
        aureliaBinding.valueConverter("df")
    ], exports.DfValueConverter);

    exports.RtBindingBehavior = class RtBindingBehavior {
        constructor(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        static inject() { return [aureliaTemplatingResources.SignalBindingBehavior]; }
        bind(binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal", "aurelia-relativetime-signal");
            // rewrite the expression to use the RtValueConverter.
            // pass through any args to the binding behavior to the RtValueConverter
            const sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            const expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "rt", sourceExpression.args, [expression, ...sourceExpression.args]);
        }
        unbind(binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        }
    };
    exports.RtBindingBehavior = __decorate([
        aureliaBinding.bindingBehavior("rt")
    ], exports.RtBindingBehavior);

    const translations = {
        ar: {
            translation: {
                now: 'الآن',
                second_ago: 'قبل ثانية واحدة',
                second_ago_other: 'قبل __count__ ثانية',
                second_in: 'خلال ثانية واحدة',
                second_in_other: 'خلال __count__ ثانية',
                minute_ago: 'قبل دقيقة واحدة',
                minute_ago_other: 'قبل __count__ دقيقة',
                minute_in: 'خلال دقيقة واحدة',
                minute_in_other: 'خلال __count__ دقيقة',
                hour_ago: 'قبل ساعة واحدة',
                hour_ago_other: 'قبل __count__ ساعة',
                hour_in: 'خلال ساعة واحدة',
                hour_in_other: 'خلال __count__ ساعة',
                day_ago: 'قبل يوم واحد',
                day_ago_other: 'قبل __count__ يومًا',
                day_in: 'خلال يوم واحد',
                day_in_other: 'خلال __count__ يومًا',
                month_ago: 'قبل شهر واحد',
                month_ago_other: 'قبل __count__ شهرًا',
                month_in: 'خلال شهر واحد',
                month_in_other: 'خلال __count__ شهرًا',
                year_ago: 'قبل سنة واحدة',
                year_ago_other: 'قبل __count__ سنة',
                year_in: 'خلال سنة واحدة',
                year_in_other: 'خلال __count__ سنة'
            }
        },
        da: {
            translation: {
                now: 'nu',
                second_ago: 'for __count__ sekund siden',
                second_ago_other: 'for __count__ sekunder siden',
                second_in: 'om __count__ sekund',
                second_in_other: 'om __count__ sekunder',
                minute_ago: 'for __count__ minut siden',
                minute_ago_other: 'for __count__ minutter siden',
                minute_in: 'om __count__ minut',
                minute_in_other: 'om __count__ minutter',
                hour_ago: 'for __count__ time siden',
                hour_ago_other: 'for __count__ timer siden',
                hour_in: 'om __count__ time',
                hour_in_other: 'om __count__ timer',
                day_ago: 'for __count__ dag siden',
                day_ago_other: 'for __count__ dage siden',
                day_in: 'om __count__ dag',
                day_in_other: 'om __count__ dage',
                month_ago: 'for __count__ måned siden',
                month_ago_other: 'for __count__ måneder siden',
                month_in: 'om __count__ måned',
                month_in_other: 'om __count__ måneder',
                year_ago: 'for __count__ år siden',
                year_ago_other: 'for __count__ år siden',
                year_in: 'om __count__ år',
                year_in_other: 'om __count__ år'
            }
        },
        de: {
            translation: {
                now: 'jetzt',
                second_ago: 'vor __count__ Sekunde',
                second_ago_other: 'vor __count__ Sekunden',
                second_in: 'in __count__ Sekunde',
                second_in_other: 'in __count__ Sekunden',
                minute_ago: 'vor __count__ Minute',
                minute_ago_other: 'vor __count__ Minuten',
                minute_in: 'in __count__ Minute',
                minute_in_other: 'in __count__ Minuten',
                hour_ago: 'vor __count__ Stunde',
                hour_ago_other: 'vor __count__ Stunden',
                hour_in: 'in __count__ Stunde',
                hour_in_other: 'in __count__ Stunden',
                day_ago: 'vor __count__ Tag',
                day_ago_other: 'vor __count__ Tagen',
                day_in: 'in __count__ Tag',
                day_in_other: 'in __count__ Tagen',
                month_ago: 'vor __count__ Monat',
                month_ago_other: 'vor __count__ Monaten',
                month_in: 'in __count__ Monat',
                month_in_other: 'in __count__ Monaten',
                year_ago: 'vor __count__ Jahr',
                year_ago_other: 'vor __count__ Jahren',
                year_in: 'in __count__ Jahr',
                year_in_other: 'in __count__ Jahren'
            }
        },
        en: {
            translation: {
                now: 'now',
                second_ago: '__count__ second ago',
                second_ago_other: '__count__ seconds ago',
                second_in: 'in __count__ second',
                second_in_other: 'in __count__ seconds',
                minute_ago: '__count__ minute ago',
                minute_ago_other: '__count__ minutes ago',
                minute_in: 'in __count__ minute',
                minute_in_other: 'in __count__ minutes',
                hour_ago: '__count__ hour ago',
                hour_ago_other: '__count__ hours ago',
                hour_in: 'in __count__ hour',
                hour_in_other: 'in __count__ hours',
                day_ago: '__count__ day ago',
                day_ago_other: '__count__ days ago',
                day_in: 'in __count__ day',
                day_in_other: 'in __count__ days',
                month_ago: '__count__ month ago',
                month_ago_other: '__count__ months ago',
                month_in: 'in __count__ month',
                month_in_other: 'in __count__ months',
                year_ago: '__count__ year ago',
                year_ago_other: '__count__ years ago',
                year_in: 'in __count__ year',
                year_in_other: 'in __count__ years'
            }
        },
        es: {
            translation: {
                now: 'ahora',
                second_ago: 'hace __count__ segundo',
                second_ago_other: 'hace __count__ segundos',
                second_in: 'dentro de __count__ segundo',
                second_in_other: 'dentro de __count__ segundos',
                minute_ago: 'hace __count__ minuto',
                minute_ago_other: 'hace __count__ minutos',
                minute_in: 'dentro de __count__ minuto',
                minute_in_other: 'dentro de __count__ minutos',
                hour_ago: 'hace __count__ hora',
                hour_ago_other: 'hace __count__ horas',
                hour_in: 'dentro de __count__ hora',
                hour_in_other: 'dentro de __count__ horas',
                day_ago: 'hace __count__ día',
                day_ago_other: 'hace __count__ días',
                day_in: 'dentro de __count__ día',
                day_in_other: 'dentro de __count__ días',
                month_ago: 'hace __count__ mes',
                month_ago_other: 'hace __count__ meses',
                month_in: 'dentro de __count__ mes',
                month_in_other: 'dentro de __count__ meses',
                year_ago: 'hace __count__ año',
                year_ago_other: 'hace __count__ años',
                year_in: 'dentro de __count__ año',
                year_in_other: 'dentro de __count__ años'
            }
        },
        fi: {
            translation: {
                now: 'nyt',
                second_ago: '__count__ sekunti sitten',
                second_ago_other: '__count__ sekuntia sitten',
                second_in: '__count__ sekunnin päästä',
                second_in_other: '__count__ sekunnin päästä',
                minute_ago: '__count__ minuutti sitten',
                minute_ago_other: '__count__ minuuttia sitten',
                minute_in: '__count__ minuutin päästä',
                minute_in_other: '__count__ minuutin päästä',
                hour_ago: '__count__ tunti sitten',
                hour_ago_other: '__count__ tuntia sitten',
                hour_in: '__count__ tunnin päästä',
                hour_in_other: '__count__ tunnin päästä',
                day_ago: '__count__ päivä sitten',
                day_ago_other: '__count__ päivää sitten',
                day_in: '__count__ päivän päästä',
                day_in_other: '__count__ päivän päästä',
                month_ago: '__count__ kuukausi sitten',
                month_ago_other: '__count__ kuukautta sitten',
                month_in: '__count__ kuukauden päästä',
                month_in_other: '__count__ kuukauden päästä',
                year_ago: '__count__ vuosi sitten',
                year_ago_other: '__count__ vuotta sitten',
                year_in: '__count__ vuoden päästä',
                year_in_other: '__count__ vuoden päästä'
            }
        },
        fr: {
            translation: {
                now: 'maintenant',
                second_ago: 'il y a __count__ seconde',
                second_ago_other: 'il y a __count__ secondes',
                second_in: 'dans __count__ seconde',
                second_in_other: 'dans __count__ secondes',
                minute_ago: 'il y a __count__ minute',
                minute_ago_other: 'il y a __count__ minutes',
                minute_in: 'dans __count__ minute',
                minute_in_other: 'dans __count__ minutes',
                hour_ago: 'il y a __count__ heure',
                hour_ago_other: 'il y a __count__ heures',
                hour_in: 'dans __count__ heure',
                hour_in_other: 'dans __count__ heures',
                day_ago: 'il y a __count__ jour',
                day_ago_other: 'il y a __count__ jours',
                day_in: 'dans __count__ jour',
                day_in_other: 'dans __count__ jours',
                month_ago: 'il y a __count__ mois',
                month_ago_other: 'il y a __count__ mois',
                month_in: 'dans __count__ mois',
                month_in_other: 'dans __count__ mois',
                year_ago: 'il y a __count__ an',
                year_ago_other: 'il y a __count__ ans',
                year_in: 'dans __count__ an',
                year_in_other: 'dans __count__ ans'
            }
        },
        it: {
            translation: {
                now: 'ora',
                second_ago: '__count__ secondo fa',
                second_ago_other: '__count__ secondi fa',
                second_in: 'tra __count__ secondo',
                second_in_other: 'tra __count__ secondi',
                minute_ago: '__count__ minuto fa',
                minute_ago_other: '__count__ minuti fa',
                minute_in: 'tra __count__ minuto',
                minute_in_other: 'tra __count__ minuti',
                hour_ago: '__count__ ora fa',
                hour_ago_other: '__count__ ore fa',
                hour_in: 'tra __count__ ora',
                hour_in_other: 'tra __count__ ore',
                day_ago: '__count__ giorno fa',
                day_ago_other: '__count__ giorni fa',
                day_in: 'tra __count__ giorno',
                day_in_other: 'tra __count__ giorni',
                month_ago: '__count__ mese fa',
                month_ago_other: '__count__ mesi fa',
                month_in: 'tra __count__ mese',
                month_in_other: 'tra __count__ mesi',
                year_ago: '__count__ anno fa',
                year_ago_other: '__count__ anni fa',
                year_in: 'tra __count__ anno',
                year_in_other: 'tra __count__ anni'
            }
        },
        ja: {
            translation: {
                now: '今',
                second_ago: '__count__ 秒前',
                second_ago_other: '__count__ 秒前',
                second_in: '__count__ 秒後',
                second_in_other: '__count__ 秒後',
                minute_ago: '__count__ 分前',
                minute_ago_other: '__count__ 分前',
                minute_in: '__count__ 分後',
                minute_in_other: '__count__ 分後',
                hour_ago: '__count__ 時間前',
                hour_ago_other: '__count__ 時間前',
                hour_in: '__count__ 時間後',
                hour_in_other: '__count__ 時間後',
                day_ago: '__count__ 日前',
                day_ago_other: '__count__ 日前',
                day_in: '__count__ 日後',
                day_in_other: '__count__ 日後',
                month_ago: '__count__ か月前',
                month_ago_other: '__count__ か月前',
                month_in: '__count__ か月後',
                month_in_other: '__count__ か月後',
                year_ago: '__count__ 年前',
                year_ago_other: '__count__ 年前',
                year_in: '__count__ 年後',
                year_in_other: '__count__ 年後'
            }
        },
        lt: {
            translation: {
                now: 'dabar',
                second_ago: 'prieš __count__ sekundę',
                second_ago_other: 'prieš __count__ sekundes',
                second_in: 'po __count__ sekundės',
                second_in_other: 'po __count__ sekundžių',
                minute_ago: 'prieš __count__ minutę',
                minute_ago_other: 'prieš __count__ minutes',
                minute_in: 'po __count__ minutės',
                minute_in_other: 'po __count__ minučių',
                hour_ago: 'prieš __count__ valandą',
                hour_ago_other: 'prieš __count__ valandas',
                hour_in: 'po __count__ valandos',
                hour_in_other: 'po __count__ valandų',
                day_ago: 'prieš __count__ dieną',
                day_ago_other: 'prieš __count__ dienas',
                day_in: 'po __count__ dienos',
                day_in_other: 'po __count__ dienų',
                month_ago: 'prieš __count__ mėnesį',
                month_ago_other: 'prieš __count__ mėnesius',
                month_in: 'po __count__ mėnesio',
                month_in_other: 'po __count__ mėnesių',
                year_ago: 'prieš __count__ metus',
                year_ago_other: 'prieš __count__ metus',
                year_in: 'po __count__ metų',
                year_in_other: 'po __count__ metų'
            }
        },
        nl: {
            translation: {
                now: 'nu',
                second_ago: '__count__ seconde geleden',
                second_ago_other: '__count__ seconden geleden',
                second_in: 'over __count__ seconde',
                second_in_other: 'over __count__ seconden',
                minute_ago: '__count__ minuut geleden',
                minute_ago_other: '__count__ minuten geleden',
                minute_in: 'over __count__ minuut',
                minute_in_other: 'over __count__ minuten',
                hour_ago: '__count__ uur geleden',
                hour_ago_other: '__count__ uur geleden',
                hour_in: 'over __count__ uur',
                hour_in_other: 'over __count__ uur',
                day_ago: '__count__ dag geleden',
                day_ago_other: '__count__ dagen geleden',
                day_in: 'over __count__ dag',
                day_in_other: 'over __count__ dagen',
                month_ago: '__count__ maand geleden',
                month_ago_other: '__count__ maanden geleden',
                month_in: 'over __count__ maand',
                month_in_other: 'over __count__ maanden',
                year_ago: '__count__ jaar geleden',
                year_ago_other: '__count__ jaar geleden',
                year_in: 'over __count__ jaar',
                year_in_other: 'over __count__ jaar'
            }
        },
        nn: {
            translation: {
                now: 'no',
                second_ago: 'for __count__ sekund sidan',
                second_ago_other: 'for __count__ sekund sidan',
                second_in: 'om __count__ sekund',
                second_in_other: 'om __count__ sekund',
                minute_ago: 'for __count__ minutt sidan',
                minute_ago_other: 'for __count__ minutt sidan',
                minute_in: 'om __count__ minutt',
                minute_in_other: 'om __count__ minutt',
                hour_ago: 'for __count__ time sidan',
                hour_ago_other: 'for __count__ timar sidan',
                hour_in: 'om __count__ time',
                hour_in_other: 'om __count__ timar',
                day_ago: 'for __count__ døgn sidan',
                day_ago_other: 'for __count__ døgn sidan',
                day_in: 'om __count__ døgn',
                day_in_other: 'om __count__ døgn',
                month_ago: 'for __count__ månad sidan',
                month_ago_other: 'for __count__ månadar sidan',
                month_in: 'om __count__ månad',
                month_in_other: 'om __count__ månadar',
                year_ago: 'for __count__ år sidan',
                year_ago_other: 'for __count__ år sidan',
                year_in: 'om __count__ år',
                year_in_other: 'om __count__ år'
            }
        },
        nb: {
            translation: {
                now: 'nå',
                second_ago: 'for __count__ sekund siden',
                second_ago_other: 'for __count__ sekunder siden',
                second_in: 'om __count__ sekund',
                second_in_other: 'om __count__ sekunder',
                minute_ago: 'for __count__ minutt siden',
                minute_ago_other: 'for __count__ minutter siden',
                minute_in: 'om __count__ minutt',
                minute_in_other: 'om __count__ minutter',
                hour_ago: 'for __count__ time siden',
                hour_ago_other: 'for __count__ timer siden',
                hour_in: 'om __count__ time',
                hour_in_other: 'om __count__ timer',
                day_ago: 'for __count__ døgn siden',
                day_ago_other: 'for __count__ døgn siden',
                day_in: 'om __count__ døgn',
                day_in_other: 'om __count__ døgn',
                month_ago: 'for __count__ måned siden',
                month_ago_other: 'for __count__ måneder siden',
                month_in: 'om __count__ måned',
                month_in_other: 'om __count__ måneder',
                year_ago: 'for __count__ år siden',
                year_ago_other: 'for __count__ år siden',
                year_in: 'om __count__ år',
                year_in_other: 'om __count__ år'
            }
        },
        pl: {
            translation: {
                now: 'teraz',
                second_ago: '__count__ sekundę temu',
                second_ago_other: '__count__ sekundy temu',
                second_in: 'za __count__ sekundę',
                second_in_other: 'za __count__ sekundy',
                minute_ago: '__count__ minutę temu',
                minute_ago_other: '__count__ minuty temu',
                minute_in: 'za __count__ minutę',
                minute_in_other: 'za __count__ minuty',
                hour_ago: '__count__ godzinę temu',
                hour_ago_other: '__count__ godziny temu',
                hour_in: 'za __count__ godzinę',
                hour_in_other: 'za __count__ godziny',
                day_ago: '__count__ dzień temu',
                day_ago_other: '__count__ dni temu',
                day_in: 'za __count__ dzień',
                day_in_other: 'za __count__ dni',
                month_ago: '__count__ miesiąc temu',
                month_ago_other: '__count__ miesiące temu',
                month_in: 'za __count__ miesiąc',
                month_in_other: 'za __count__ miesiące',
                year_ago: '__count__ rok temu',
                year_ago_other: '__count__ lata temu',
                year_in: 'za __count__ rok',
                year_in_other: 'za __count__ lata'
            }
        },
        pt: {
            translation: {
                now: 'agora',
                second_ago: 'há __count__ segundo',
                second_ago_other: 'há __count__ segundos',
                second_in: 'em __count__ segundo',
                second_in_other: 'em __count__ segundos',
                minute_ago: 'há __count__ minuto',
                minute_ago_other: 'há __count__ minutos',
                minute_in: 'em __count__ minuto',
                minute_in_other: 'em __count__ minutos',
                hour_ago: 'há __count__ hora',
                hour_ago_other: 'há __count__ horas',
                hour_in: 'em __count__ hora',
                hour_in_other: 'em __count__ horas',
                day_ago: 'há __count__ dia',
                day_ago_other: 'há __count__ dias',
                day_in: 'em __count__ dia',
                day_in_other: 'em __count__ dias',
                month_ago: 'há __count__ mês',
                month_ago_other: 'há __count__ meses',
                month_in: 'em __count__ mês',
                month_in_other: 'em __count__ meses',
                year_ago: 'há __count__ ano',
                year_ago_other: 'há __count__ anos',
                year_in: 'em __count__ ano',
                year_in_other: 'em __count__ anos'
            }
        },
        sv: {
            translation: {
                now: 'nu',
                second_ago: 'för __count__ sekund sedan',
                second_ago_other: 'för __count__ sekunder sedan',
                second_in: 'om __count__ sekund',
                second_in_other: 'om __count__ sekunder',
                minute_ago: 'för __count__ minut sedan',
                minute_ago_other: 'för __count__ minuter sedan',
                minute_in: 'om __count__ minut',
                minute_in_other: 'om __count__ minuter',
                hour_ago: 'för __count__ timme sedan',
                hour_ago_other: 'för __count__ timmar sedan',
                hour_in: 'om __count__ timme',
                hour_in_other: 'om __count__ timmar',
                day_ago: 'för __count__ dag sedan',
                day_ago_other: 'för __count__ dagar sedan',
                day_in: 'om __count__ dag',
                day_in_other: 'om __count__ dagar',
                month_ago: 'för __count__ månad sedan',
                month_ago_other: 'för __count__ månader sedan',
                month_in: 'om __count__ månad',
                month_in_other: 'om __count__ månader',
                year_ago: 'för __count__ år sedan',
                year_ago_other: 'för __count__ år sedan',
                year_in: 'om __count__ år',
                year_in_other: 'om __count__ år'
            }
        },
        th: {
            translation: {
                now: 'ขณะนี้',
                second_ago: '__count__ วินาทีที่ผ่านมา',
                second_ago_other: '__count__ วินาทีที่ผ่านมา',
                second_in: 'ในอีก __count__ วินาที',
                second_in_other: 'ในอีก __count__ วินาที',
                minute_ago: '__count__ นาทีที่ผ่านมา',
                minute_ago_other: '__count__ นาทีที่ผ่านมา',
                minute_in: 'ในอีก __count__ นาที',
                minute_in_other: 'ในอีก __count__ นาที',
                hour_ago: '__count__ ชั่วโมงที่ผ่านมา',
                hour_ago_other: '__count__ ชั่วโมงที่ผ่านมา',
                hour_in: 'ในอีก __count__ ชั่วโมง',
                hour_in_other: 'ในอีก __count__ ชั่วโมง',
                day_ago: '__count__ วันที่ผ่านมา',
                day_ago_other: '__count__ วันที่ผ่านมา',
                day_in: 'ในอีก __count__ วัน',
                day_in_other: 'ในอีก __count__ วัน',
                month_ago: '__count__ เดือนที่ผ่านมา',
                month_ago_other: '__count__ เดือนที่ผ่านมา',
                month_in: 'ในอีก __count__ เดือน',
                month_in_other: 'ในอีก __count__ เดือน',
                year_ago: '__count__ ปีที่แล้ว',
                year_ago_other: '__count__ ปีที่แล้ว',
                year_in: 'ในอีก __count__ ปี',
                year_in_other: 'ในอีก __count__ ปี'
            }
        },
        zh: {
            translation: {
                now: '现在',
                second_ago: '__count__秒钟前',
                second_ago_other: '__count__秒钟前',
                second_in: '__count__秒钟后',
                second_in_other: '__count__秒钟后',
                minute_ago: '__count__分钟前',
                minute_ago_other: '__count__分钟前',
                minute_in: '__count__分钟后',
                minute_in_other: '__count__分钟后',
                hour_ago: '__count__小时前',
                hour_ago_other: '__count__小时前',
                hour_in: '__count__小时后',
                hour_in_other: '__count__小时后',
                day_ago: '__count__天前',
                day_ago_other: '__count__天前',
                day_in: '__count__天后',
                day_in_other: '__count__天后',
                month_ago: '__count__个月前',
                month_ago_other: '__count__个月前',
                month_in: '__count__个月后',
                month_in_other: '__count__个月后',
                year_ago: '__count__年前',
                year_ago_other: '__count__年前',
                year_in: '__count__年后',
                year_in_other: '__count__年后'
            }
        },
        'zh-HK': {
            translation: {
                now: '現在',
                second_ago: '__count__ 秒前',
                second_ago_other: '__count__ 秒前',
                second_in: '__count__ 秒後',
                second_in_other: '__count__ 秒後',
                minute_ago: '__count__ 分鐘前',
                minute_ago_other: '__count__ 分鐘前',
                minute_in: '__count__ 分鐘後',
                minute_in_other: '__count__ 分鐘後',
                hour_ago: '__count__ 小時前',
                hour_ago_other: '__count__ 小時前',
                hour_in: '__count__ 小時後',
                hour_in_other: '__count__ 小時後',
                day_ago: '__count__ 日前',
                day_ago_other: '__count__ 日前',
                day_in: '__count__ 日後',
                day_in_other: '__count__ 日後',
                month_ago: '__count__ 個月前',
                month_ago_other: '__count__ 個月前',
                month_in: '__count__ 個月後',
                month_in_other: '__count__ 個月後',
                year_ago: '__count__ 年前',
                year_ago_other: '__count__ 年前',
                year_in: '__count__ 年後',
                year_in_other: '__count__ 年後'
            },
        },
        'zh-TW': {
            translation: {
                now: '剛才',
                second_ago: '__count__ 秒鐘前',
                second_ago_other: '__count__ 秒鐘前',
                second_in: '__count__ 秒內',
                second_in_other: '__count__ 秒內',
                minute_ago: '__count__ 分鐘前',
                minute_ago_other: '__count__ 分鐘前',
                minute_in: '__count__ 分鐘內',
                minute_in_other: '__count__ 分鐘內',
                hour_ago: '__count__ 小時前',
                hour_ago_other: '__count__ 小時前',
                hour_in: '__count__ 小時內',
                hour_in_other: '__count__ 小時內',
                day_ago: '__count__ 天前',
                day_ago_other: '__count__ 天前',
                day_in: '__count__ 天內',
                day_in_other: '__count__ 天內',
                month_ago: '__count__ 月前',
                month_ago_other: '__count__ 月前',
                month_in: '__count__ 月內',
                month_in_other: '__count__ 月內',
                year_ago: '__count__ 年前',
                year_ago_other: '__count__ 年前',
                year_in: '__count__ 年內',
                year_in_other: '__count__ 年內'
            }
        }
    };
    // tslint:enable

    class RelativeTime {
        constructor(service, ea) {
            this.service = service;
            this.ea = ea;
            this.service.i18nextReady().then(() => {
                this.setup();
            });
            this.ea.subscribe(I18N_EA_SIGNAL, (locales) => {
                this.setup(locales);
            });
        }
        static inject() { return [I18N, aureliaEventAggregator.EventAggregator]; }
        setup(locales) {
            const trans = translations.default || translations;
            const fallbackLng = this.service.i18next.fallbackLng;
            let alternateFb = fallbackLng || this.service.i18next.options.fallbackLng;
            if (Array.isArray(alternateFb) && alternateFb.length > 0) {
                alternateFb = alternateFb[0];
            }
            const key = ((locales && locales.newValue)
                ? locales.newValue
                : this.service.getLocale()) || alternateFb;
            let index = 0;
            // tslint:disable-next-line:no-conditional-assignment
            if ((index = key.indexOf("-")) >= 0) {
                const baseLocale = key.substring(0, index);
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
        }
        addTranslationResource(key, translation) {
            const options = this.service.i18next.options;
            if (options.interpolation && (options.interpolation.prefix !== "__" || options.interpolation.suffix !== "__")) {
                // tslint:disable-next-line:forin
                for (const subkey in translation) {
                    translation[subkey] = translation[subkey]
                        .replace("__count__", `${options.interpolation.prefix || "{{"}count${options.interpolation.suffix || "}}"}`);
                }
            }
            this.service.i18next.addResources(key, options.defaultNS || "translation", translation);
        }
        getRelativeTime(time) {
            const now = new Date();
            const diff = now.getTime() - time.getTime();
            let timeDiff = this.getTimeDiffDescription(diff, "year", 31104000000);
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
        }
        getTimeDiffDescription(diff, unit, timeDivisor) {
            const unitAmount = parseInt((diff / timeDivisor).toFixed(0), 10);
            if (unitAmount > 0) {
                return this.service.tr(unit, { count: unitAmount, context: "ago" });
            }
            else if (unitAmount < 0) {
                const abs = Math.abs(unitAmount);
                return this.service.tr(unit, { count: abs, context: "in" });
            }
            return null;
        }
    }

    exports.RtValueConverter = class RtValueConverter {
        constructor(service) {
            this.service = service;
        }
        static inject() { return [RelativeTime]; }
        toView(value) {
            if (value === null
                || typeof value === "undefined"
                || (typeof value === "string" && value.trim() === "")) {
                return value;
            }
            if (typeof value === "string" && isNaN(value) && !Number.isInteger(value)) {
                value = new Date(value);
            }
            return this.service.getRelativeTime(value);
        }
    };
    exports.RtValueConverter = __decorate([
        aureliaBinding.valueConverter("rt")
    ], exports.RtValueConverter);

    class Backend {
        constructor(services, options = {}) {
            this.services = services;
            this.options = options;
            this.type = "backend";
            this.init(services, options);
        }
        static with(loader) {
            this.loader = loader;
            return this;
        }
        init(services, options = {}) {
            this.services = services;
            this.options = Object.assign({}, {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
                addPath: "locales/add/{{lng}}/{{ns}}",
                allowMultiLoading: false,
                parse: JSON.parse
            }, options);
        }
        readMulti(languages, namespaces, callback) {
            let loadPath = this.options.loadPath;
            if (typeof this.options.loadPath === "function") {
                loadPath = this.options.loadPath(languages, namespaces);
            }
            const url = this.services
                .interpolator
                .interpolate(loadPath, { lng: languages.join("+"), ns: namespaces.join("+") });
            this.loadUrl(url, callback);
        }
        read(language, namespace, callback) {
            let loadPath = this.options.loadPath;
            if (typeof this.options.loadPath === "function") {
                loadPath = this.options.loadPath([language], [namespace]);
            }
            const url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });
            this.loadUrl(url, callback);
        }
        loadUrl(url, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const response = yield Backend.loader.loadText(url);
                    let ret;
                    let err;
                    try {
                        ret = (response instanceof Object) ? response : this.options.parse(response, url);
                    }
                    catch (e) {
                        err = "failed parsing " + url + " to json";
                    }
                    if (err) {
                        return callback(err, false);
                    }
                    callback(null, ret);
                }
                catch (_a) {
                    callback("failed loading " + url, false /* no retry */);
                }
            });
        }
        // tslint:disable-next-line:variable-name
        create(_languages, _namespace, _key, _fallbackValue) {
            // not supported
        }
    }
    Backend.type = "backend";

    function configure(frameworkConfig, cb) {
        if (typeof cb !== "function") {
            const errorMsg = "You need to provide a callback method to properly configure the library";
            throw errorMsg;
        }
        const instance = frameworkConfig.container.get(I18N);
        const ret = cb(instance);
        frameworkConfig.globalResources([
            exports.TValueConverter,
            exports.TBindingBehavior,
            exports.TCustomAttribute,
            exports.TParamsCustomAttribute,
            exports.NfValueConverter,
            exports.NfBindingBehavior,
            exports.DfValueConverter,
            exports.DfBindingBehavior,
            exports.RtValueConverter,
            exports.RtBindingBehavior
        ]);
        frameworkConfig.postTask(() => {
            const resources = frameworkConfig.container.get(aureliaTemplating.ViewResources);
            const htmlBehaviorResource = resources.getAttribute("t");
            const htmlParamsResource = resources.getAttribute("t-params");
            let attributes = instance.i18next.options.attributes;
            // Register default attributes if none provided
            if (!attributes) {
                attributes = ["t", "i18n"];
            }
            attributes.forEach((alias) => resources.registerAttribute(alias, htmlBehaviorResource, "t"));
            attributes.forEach((alias) => resources.registerAttribute(alias + "-params", htmlParamsResource, "t-params"));
        });
        return ret;
    }

    exports.Backend = Backend;
    exports.I18N = I18N;
    exports.I18N_EA_SIGNAL = I18N_EA_SIGNAL;
    exports.RelativeTime = RelativeTime;
    exports.configure = configure;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
