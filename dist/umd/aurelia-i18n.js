(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('i18next'), require('aurelia-logging'), require('aurelia-dependency-injection'), require('aurelia-templating'), require('aurelia-metadata'), require('aurelia-pal'), require('aurelia-framework'), require('aurelia-templating-resources'), require('aurelia-event-aggregator'), require('aurelia-binding')) :
    typeof define === 'function' && define.amd ? define(['exports', 'i18next', 'aurelia-logging', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-metadata', 'aurelia-pal', 'aurelia-framework', 'aurelia-templating-resources', 'aurelia-event-aggregator', 'aurelia-binding'], factory) :
    (factory((global.au = global.au || {}, global.au.i18n = {}),global.i18next,global.au.LogManager,global.au,global.au,global.au,global.au,global.au,global.au,global.au,global.au));
}(this, (function (exports,i18next,LogManager,aureliaDependencyInjection,aureliaTemplating,aureliaMetadata,aureliaPal,aureliaFramework,aureliaTemplatingResources,aureliaEventAggregator,aureliaBinding) { 'use strict';

    i18next = i18next && i18next.hasOwnProperty('default') ? i18next['default'] : i18next;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const I18N_EA_SIGNAL = "i18n:locale:changed";
    class I18N {
        constructor(ea, signaler) {
            this.ea = ea;
            this.signaler = signaler;
            this.globalVars = {};
            this.i18next = i18next;
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
                    debug: false
                };
                this.i18nextDeferred = new Promise((resolve, reject) => {
                    this.i18next = this.i18next.createInstance(options || defaultOptions, (err) => {
                        if (err) {
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
                return;
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
                    const i18nLogger = LogManager.getLogger("i18n");
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
                    switch (attr) {
                        case "text":
                            const newChild = aureliaPal.DOM.createTextNode(this.tr(key, params));
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
                            prependParser.innerHTML = this.tr(key, params);
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
                            appendParser.innerHTML = this.tr(key, params);
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
                            node.innerHTML = this.tr(key, params);
                            break;
                        default: // normal html attribute
                            if (node.au &&
                                node.au.controller &&
                                node.au.controller.viewModel &&
                                attrCC in node.au.controller.viewModel) {
                                node.au.controller.viewModel[attrCC] = this.tr(key, params);
                            }
                            else {
                                node.setAttribute(attr, this.tr(key, params));
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
                second_ago: 'منذ __count__ ثانية',
                second_ago_plural: 'منذ __count__ ثواني',
                second_in: 'في __count__ ثانية',
                second_in_plural: 'في __count__ ثواني',
                minute_ago: 'منذ __count__ دقيقة',
                minute_ago_plural: 'منذ __count__ دقائق',
                minute_in: 'في __count__ دقيقة',
                minute_in_plural: 'في __count__ دقائق',
                hour_ago: 'منذ __count__ ساعة',
                hour_ago_plural: 'منذ __count__ ساعات',
                hour_in: 'في __count__ ساعة',
                hour_in_plural: 'في __count__ ساعات',
                day_ago: 'منذ __count__ يوم',
                day_ago_plural: 'منذ __count__ أيام',
                day_in: 'في __count__ يوم',
                day_in_plural: 'في __count__ أيام',
                month_ago: 'منذ __count__ شهر',
                month_ago_plural: 'منذ __count__ أشهر',
                month_in: 'في __count__ شهر',
                month_in_plural: 'في __count__ أشهر',
                year_ago: 'منذ __count__ سنة',
                year_ago_plural: 'منذ __count__ سنوات',
                year_in: 'في __count__ سنة',
                year_in_plural: 'في __count__ سنوات'
            }
        },
        da: {
            translation: {
                now: 'lige nu',
                second_ago: '__count__ sekund siden',
                second_ago_plural: '__count__ sekunder siden',
                second_in: 'i __count__ sekund',
                second_in_plural: 'i __count__ sekunder',
                minute_ago: '__count__ minut siden',
                minute_ago_plural: '__count__ minutter siden',
                minute_in: 'i __count__ minut',
                minute_in_plural: 'i __count__ minutter',
                hour_ago: '__count__ time siden',
                hour_ago_plural: '__count__ timer siden',
                hour_in: 'i __count__ time',
                hour_in_plural: 'i __count__ timer',
                day_ago: '__count__ dag siden',
                day_ago_plural: '__count__ dage siden',
                day_in: 'i __count__ dag',
                day_in_plural: 'i __count__ dage',
                month_ago: '__count__ måned siden',
                month_ago_plural: '__count__ måneder siden',
                month_in: 'i __count__ måned',
                month_in_plural: 'i __count__ måneder',
                year_ago: '__count__ år siden',
                year_ago_plural: '__count__ år siden',
                year_in: 'i __count__ år',
                year_in_plural: 'i __count__ år'
            }
        },
        de: {
            translation: {
                now: 'jetzt gerade',
                second_ago: 'vor __count__ Sekunde',
                second_ago_plural: 'vor __count__ Sekunden',
                second_in: 'in __count__ Sekunde',
                second_in_plural: 'in __count__ Sekunden',
                minute_ago: 'vor __count__ Minute',
                minute_ago_plural: 'vor __count__ Minuten',
                minute_in: 'in __count__ Minute',
                minute_in_plural: 'in __count__ Minuten',
                hour_ago: 'vor __count__ Stunde',
                hour_ago_plural: 'vor __count__ Stunden',
                hour_in: 'in __count__ Stunde',
                hour_in_plural: 'in __count__ Stunden',
                day_ago: 'vor __count__ Tag',
                day_ago_plural: 'vor __count__ Tagen',
                day_in: 'in __count__ Tag',
                day_in_plural: 'in __count__ Tagen',
                month_ago: 'vor __count__ Monat',
                month_ago_plural: 'vor __count__ Monaten',
                month_in: 'in __count__ Monat',
                month_in_plural: 'in __count__ Monaten',
                year_ago: 'vor __count__ Jahr',
                year_ago_plural: 'vor __count__ Jahren',
                year_in: 'in __count__ Jahr',
                year_in_plural: 'in __count__ Jahren'
            }
        },
        en: {
            translation: {
                now: 'just now',
                second_ago: '__count__ second ago',
                second_ago_plural: '__count__ seconds ago',
                second_in: 'in __count__ second',
                second_in_plural: 'in __count__ seconds',
                minute_ago: '__count__ minute ago',
                minute_ago_plural: '__count__ minutes ago',
                minute_in: 'in __count__ minute',
                minute_in_plural: 'in __count__ minutes',
                hour_ago: '__count__ hour ago',
                hour_ago_plural: '__count__ hours ago',
                hour_in: 'in __count__ hour',
                hour_in_plural: 'in __count__ hours',
                day_ago: '__count__ day ago',
                day_ago_plural: '__count__ days ago',
                day_in: 'in __count__ day',
                day_in_plural: 'in __count__ days',
                month_ago: '__count__ month ago',
                month_ago_plural: '__count__ months ago',
                month_in: 'in __count__ month',
                month_in_plural: 'in __count__ months',
                year_ago: '__count__ year ago',
                year_ago_plural: '__count__ years ago',
                year_in: 'in __count__ year',
                year_in_plural: 'in __count__ years'
            }
        },
        es: {
            translation: {
                now: 'ahora mismo',
                second_ago: 'hace __count__ segundo',
                second_ago_plural: 'hace __count__ segundos',
                second_in: 'en __count__ segundo',
                second_in_plural: 'en __count__ segundos',
                minute_ago: 'hace __count__ minuto',
                minute_ago_plural: 'hace __count__ minutos',
                minute_in: 'en __count__ minuto',
                minute_in_plural: 'en __count__ minutos',
                hour_ago: 'hace __count__ hora',
                hour_ago_plural: 'hace __count__ horas',
                hour_in: 'en __count__ hora',
                hour_in_plural: 'en __count__ horas',
                day_ago: 'hace __count__ día',
                day_ago_plural: 'hace __count__ días',
                day_in: 'en __count__ día',
                day_in_plural: 'en __count__ días',
                month_ago: 'hace __count__ mes',
                month_ago_plural: 'hace __count__ meses',
                month_in: 'en __count__ mes',
                month_in_plural: 'en __count__ meses',
                year_ago: 'hace __count__ año',
                year_ago_plural: 'hace __count__ años',
                year_in: 'en __count__ año',
                year_in_plural: 'en __count__ años'
            }
        },
        fi: {
            translation: {
                now: 'Nyt',
                second_ago: '__count__ sekuntti sitten',
                second_ago_plural: '__count__ sekunttia sitten',
                second_in: ' __count__ sekunnin kuluttua',
                second_in_plural: ' __count__ sekunttien kuluttua',
                minute_ago: '__count__ minuutti sitten',
                minute_ago_plural: '__count__ minuuttia sitten',
                minute_in: ' __count__ minuutin kuluttua',
                minute_in_plural: ' __count__ minuuttien kuluttua',
                hour_ago: '__count__ tunti sitten',
                hour_ago_plural: '__count__ tuntia sitten',
                hour_in: ' __count__ tunnin kuluttua',
                hour_in_plural: ' __count__ tunnin kuluttua',
                day_ago: '__count__ päivä sitten',
                day_ago_plural: '__count__ päiviä sitten',
                day_in: ' __count__ päivän kuluttua',
                day_in_plural: '__count__ päivien kuluttua',
                month_ago: '__count__ kuukausi sitten',
                month_ago_plural: '__count__ kuukausia sitten',
                month_in: ' __count__ kuukauden kuluttua',
                month_in_plural: ' __count__ kuukausien kuluttua',
                year_ago: '__count__ vuosi sitten',
                year_ago_plural: '__count__ vuosia sitten',
                year_in: ' __count__ vuoden kuluttua',
                year_in_plural: ' __count__ vuosien kuluttua'
            }
        },
        fr: {
            translation: {
                now: 'maintenant',
                second_ago: 'il y a __count__ seconde',
                second_ago_plural: 'il y a __count__ secondes',
                second_in: 'dans __count__ seconde',
                second_in_plural: 'dans __count__ secondes',
                minute_ago: 'il y a __count__ minute',
                minute_ago_plural: 'il y a __count__ minutes',
                minute_in: 'dans __count__ minute',
                minute_in_plural: 'dans __count__ minutes',
                hour_ago: 'il y a __count__ heure',
                hour_ago_plural: 'il y a __count__ heures',
                hour_in: 'dans __count__ heure',
                hour_in_plural: 'dans __count__ heures',
                day_ago: 'il y a __count__ jour',
                day_ago_plural: 'il y a __count__ jours',
                day_in: 'dans __count__ jour',
                day_in_plural: 'dans __count__ jours',
                month_ago: 'il y a __count__ mois',
                month_ago_plural: 'il y a __count__ mois',
                month_in: 'dans __count__ mois',
                month_in_plural: 'dans __count__ mois',
                year_ago: 'il y a __count__ an',
                year_ago_plural: 'il y a __count__ ans',
                year_in: 'dans __count__ an',
                year_in_plural: 'dans __count__ ans'
            }
        },
        it: {
            translation: {
                now: 'adesso',
                second_ago: '__count__ secondo fa',
                second_ago_plural: '__count__ secondi fa',
                second_in: 'in __count__ secondo',
                second_in_plural: 'in __count__ secondi',
                minute_ago: '__count__ minuto fa',
                minute_ago_plural: '__count__ minuti fa',
                minute_in: 'in __count__ minuto',
                minute_in_plural: 'in __count__ minuti',
                hour_ago: '__count__ ora fa',
                hour_ago_plural: '__count__ ore fa',
                hour_in: 'in __count__ ora',
                hour_in_plural: 'in __count__ ore',
                day_ago: '__count__ giorno fa',
                day_ago_plural: '__count__ giorni fa',
                day_in: 'in __count__ giorno',
                day_in_plural: 'in __count__ giorni',
                month_ago: '__count__ mese fa',
                month_ago_plural: '__count__ mesi fa',
                month_in: 'in __count__ mese',
                month_in_plural: 'in __count__ mesi',
                year_ago: '__count__ anno fa',
                year_ago_plural: '__count__ anni fa',
                year_in: 'in __count__ anno',
                year_in_plural: 'in __count__ anni'
            }
        },
        ja: {
            translation: {
                now: 'たった今',
                second_ago: '__count__ 秒前',
                second_ago_plural: '__count__ 秒前',
                second_in: 'あと __count__ 秒',
                second_in_plural: 'あと __count__ 秒',
                minute_ago: '__count__ 分前',
                minute_ago_plural: '__count__ 分前',
                minute_in: 'あと __count__ 分',
                minute_in_plural: 'あと __count__ 分',
                hour_ago: '__count__ 時間前',
                hour_ago_plural: '__count__ 時間前',
                hour_in: 'あと __count__ 時間',
                hour_in_plural: 'あと __count__ 時間',
                day_ago: '__count__ 日間前',
                day_ago_plural: '__count__ 日間前',
                day_in: 'あと __count__ 日間',
                day_in_plural: 'あと __count__ 日間',
                month_ago: '__count__ ヶ月前',
                month_ago_plural: '__count__ ヶ月前',
                month_in: 'あと __count__ ヶ月前',
                month_in_plural: 'あと __count__ ヶ月前',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: 'あと __count__ 年',
                year_in_plural: 'あと __count__ 年'
            }
        },
        nl: {
            translation: {
                now: 'zonet',
                second_ago: '__count__ seconde geleden',
                second_ago_plural: '__count__ seconden geleden',
                second_in: 'in __count__ seconde',
                second_in_plural: 'in __count__ seconden',
                minute_ago: '__count__ minuut geleden',
                minute_ago_plural: '__count__ minuten geleden',
                minute_in: 'in __count__ minuut',
                minute_in_plural: 'in __count__ minuten',
                hour_ago: '__count__ uur geleden',
                hour_ago_plural: '__count__ uren geleden',
                hour_in: 'in __count__ uur',
                hour_in_plural: 'in __count__ uren',
                day_ago: '__count__ dag geleden',
                day_ago_plural: '__count__ dagen geleden',
                day_in: 'in __count__ dag',
                day_in_plural: 'in __count__ dagen',
                month_ago: '__count__ maand geleden',
                month_ago_plural: '__count__ maanden geleden',
                month_in: 'in __count__ maand',
                month_in_plural: 'in __count__ maanden',
                year_ago: '__count__ jaar geleden',
                year_ago_plural: '__count__ jaren geleden',
                year_in: 'in __count__ jaar',
                year_in_plural: 'in __count__ jaren'
            }
        },
        nn: {
            translation: {
                now: 'akkurat nå',
                second_ago: '__count__ sekund siden',
                second_ago_plural: '__count__ sekunder siden',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekunder',
                minute_ago: '__count__ minutt siden',
                minute_ago_plural: '__count__ minutter siden',
                minute_in: 'om __count__ minutt',
                minute_in_plural: 'om __count__ minutter',
                hour_ago: '__count__ time siden',
                hour_ago_plural: '__count__ timer siden',
                hour_in: 'om __count__ time',
                hour_in_plural: 'om __count__ timer',
                day_ago: '__count__ dag siden',
                day_ago_plural: '__count__ dager siden',
                day_in: 'om __count__ dag',
                day_in_plural: 'om __count__ dager',
                month_ago: '__count__ en måned siden',
                month_ago_plural: '__count__ flere måneder siden',
                month_in: 'I løpet av en __count__ måned',
                month_in_plural: 'I løpet av   __count__ måneder',
                year_ago: '__count__ et år siden',
                year_ago_plural: '__count__ flere å siden',
                year_in: 'I løpet av ett år __count__ år',
                year_in_plural: 'på flere __count__ år'
            }
        },
        no: {
            translation: {
                now: 'akkurat nå',
                second_ago: '__count__ sekund siden',
                second_ago_plural: '__count__ sekunder siden',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekunder',
                minute_ago: '__count__ minutt siden',
                minute_ago_plural: '__count__ minutter siden',
                minute_in: 'om __count__ minutt',
                minute_in_plural: 'om __count__ minutter',
                hour_ago: '__count__ time siden',
                hour_ago_plural: '__count__ timer siden',
                hour_in: 'om __count__ time',
                hour_in_plural: 'om __count__ timer',
                day_ago: '__count__ dag siden',
                day_ago_plural: '__count__ dager siden',
                day_in: 'om __count__ dag',
                day_in_plural: 'om __count__ dager',
                month_ago: '__count__ en måned siden',
                month_ago_plural: '__count__ flere måneder siden',
                month_in: 'I løpet av en __count__ måned',
                month_in_plural: 'I løpet av   __count__ måneder',
                year_ago: '__count__ et år siden',
                year_ago_plural: '__count__ flere å siden',
                year_in: 'I løpet av ett år __count__ år',
                year_in_plural: 'på flere __count__ år'
            }
        },
        pt: {
            translation: {
                now: 'neste exato momento',
                second_ago: '__count__ segundo atrás',
                second_ago_plural: '__count__ segundos atrás',
                second_in: 'em __count__ segundo',
                second_in_plural: 'em __count__ segundos',
                minute_ago: '__count__ minuto atrás',
                minute_ago_plural: '__count__ minutos atrás',
                minute_in: 'em __count__ minuto',
                minute_in_plural: 'em __count__ minutos',
                hour_ago: '__count__ hora atrás',
                hour_ago_plural: '__count__ horas atrás',
                hour_in: 'em __count__ hora',
                hour_in_plural: 'em __count__ horas',
                day_ago: '__count__ dia atrás',
                day_ago_plural: '__count__ dias atrás',
                day_in: 'em __count__ dia',
                day_in_plural: 'em __count__ dias',
                month_ago: '__count__ mês atrás',
                month_ago_plural: '__count__ meses atrás',
                month_in: 'em __count__ mês',
                month_in_plural: 'em __count__ meses',
                year_ago: '__count__ ano atrás',
                year_ago_plural: '__count__ anos atrás',
                year_in: 'em __count__ ano',
                year_in_plural: 'em __count__ anos'
            }
        },
        sv: {
            translation: {
                now: 'nu',
                second_ago: '__count__ sekund sedan',
                second_ago_plural: '__count__ sekunder sedan',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekunder',
                minute_ago: '__count__ minut sedan',
                minute_ago_plural: '__count__ minuter sedan',
                minute_in: 'om __count__ minut',
                minute_in_plural: 'om __count__ minuter',
                hour_ago: '__count__ timme sedan',
                hour_ago_plural: '__count__ timmar sedan',
                hour_in: 'om __count__ timme',
                hour_in_plural: 'om __count__ timmar',
                day_ago: '__count__ dag sedan',
                day_ago_plural: '__count__ dagar sedan',
                day_in: 'om __count__ dag',
                day_in_plural: 'om __count__ dagar',
                month_ago: '__count__ månad sedan',
                month_ago_plural: '__count__ månader sedan',
                month_in: 'om __count__ månad',
                month_in_plural: 'om __count__ månader',
                year_ago: '__count__ år sedan',
                year_ago_plural: '__count__ år sedan',
                year_in: 'om __count__ år',
                year_in_plural: 'om __count__ år'
            }
        },
        th: {
            translation: {
                now: 'เมื่อกี้',
                second_ago: '__count__ วินาที ที่ผ่านมา',
                second_ago_plural: '__count__ วินาที ที่ผ่านมา',
                second_in: 'อีก __count__ วินาที',
                second_in_plural: 'อีก __count__ วินาที',
                minute_ago: '__count__ นาที ที่ผ่านมา',
                minute_ago_plural: '__count__ นาที ที่ผ่านมา',
                minute_in: 'อีก __count__ นาที',
                minute_in_plural: 'อีก __count__ นาที',
                hour_ago: '__count__ ชั่วโมง ที่ผ่านมา',
                hour_ago_plural: '__count__ ชั่วโมง ที่ผ่านมา',
                hour_in: 'อีก __count__ ชั่วโมง',
                hour_in_plural: 'อีก __count__ ชั่วโมง',
                day_ago: '__count__ วัน ที่ผ่านมา',
                day_ago_plural: '__count__ วัน ที่ผ่านมา',
                day_in: 'อีก __count__ วัน',
                day_in_plural: 'อีก __count__ วัน'
            }
        },
        zh: {
            translation: {
                now: '刚才',
                second_ago: '__count__ 秒钟前',
                second_ago_plural: '__count__ 秒钟前',
                second_in: '__count__ 秒内',
                second_in_plural: '__count__ 秒内',
                minute_ago: '__count__ 分钟前',
                minute_ago_plural: '__count__ 分钟前',
                minute_in: '__count__ 分钟内',
                minute_in_plural: '__count__ 分钟内',
                hour_ago: '__count__ 小时前',
                hour_ago_plural: '__count__ 小时前',
                hour_in: '__count__ 小时内',
                hour_in_plural: '__count__ 小时内',
                day_ago: '__count__ 天前',
                day_ago_plural: '__count__ 天前',
                day_in: '__count__ 天内',
                day_in_plural: '__count__ 天内',
                month_ago: '__count__ 月前',
                month_ago_plural: '__count__ 月前',
                month_in: '__count__ 月内',
                month_in_plural: '__count__ 月内',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: '__count__ 年内',
                year_in_plural: '__count__ 年内'
            }
        },
        'zh-CN': {
            translation: {
                now: '刚才',
                second_ago: '__count__ 秒钟前',
                second_ago_plural: '__count__ 秒钟前',
                second_in: '__count__ 秒内',
                second_in_plural: '__count__ 秒内',
                minute_ago: '__count__ 分钟前',
                minute_ago_plural: '__count__ 分钟前',
                minute_in: '__count__ 分钟内',
                minute_in_plural: '__count__ 分钟内',
                hour_ago: '__count__ 小时前',
                hour_ago_plural: '__count__ 小时前',
                hour_in: '__count__ 小时内',
                hour_in_plural: '__count__ 小时内',
                day_ago: '__count__ 天前',
                day_ago_plural: '__count__ 天前',
                day_in: '__count__ 天内',
                day_in_plural: '__count__ 天内',
                month_ago: '__count__ 月前',
                month_ago_plural: '__count__ 月前',
                month_in: '__count__ 月内',
                month_in_plural: '__count__ 月内',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: '__count__ 年内',
                year_in_plural: '__count__ 年内'
            }
        },
        'zh-HK': {
            translation: {
                now: '剛才',
                second_ago: '__count__ 秒鐘前',
                second_ago_plural: '__count__ 秒鐘前',
                second_in: '__count__ 秒內',
                second_in_plural: '__count__ 秒內',
                minute_ago: '__count__ 分鐘前',
                minute_ago_plural: '__count__ 分鐘前',
                minute_in: '__count__ 分鐘內',
                minute_in_plural: '__count__ 分鐘內',
                hour_ago: '__count__ 小時前',
                hour_ago_plural: '__count__ 小時前',
                hour_in: '__count__ 小時內',
                hour_in_plural: '__count__ 小時內',
                day_ago: '__count__ 天前',
                day_ago_plural: '__count__ 天前',
                day_in: '__count__ 天內',
                day_in_plural: '__count__ 天內',
                month_ago: '__count__ 月前',
                month_ago_plural: '__count__ 月前',
                month_in: '__count__ 月內',
                month_in_plural: '__count__ 月內',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: '__count__ 年內',
                year_in_plural: '__count__ 年內'
            }
        },
        'zh-TW': {
            translation: {
                now: '剛才',
                second_ago: '__count__ 秒鐘前',
                second_ago_plural: '__count__ 秒鐘前',
                second_in: '__count__ 秒內',
                second_in_plural: '__count__ 秒內',
                minute_ago: '__count__ 分鐘前',
                minute_ago_plural: '__count__ 分鐘前',
                minute_in: '__count__ 分鐘內',
                minute_in_plural: '__count__ 分鐘內',
                hour_ago: '__count__ 小時前',
                hour_ago_plural: '__count__ 小時前',
                hour_in: '__count__ 小時內',
                hour_in_plural: '__count__ 小時內',
                day_ago: '__count__ 天前',
                day_ago_plural: '__count__ 天前',
                day_in: '__count__ 天內',
                day_in_plural: '__count__ 天內',
                month_ago: '__count__ 月前',
                month_ago_plural: '__count__ 月前',
                month_in: '__count__ 月內',
                month_in_plural: '__count__ 月內',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: '__count__ 年內',
                year_in_plural: '__count__ 年內'
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
            const trans = translations;
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

    exports.configure = configure;
    exports.I18N_EA_SIGNAL = I18N_EA_SIGNAL;
    exports.I18N = I18N;
    exports.RelativeTime = RelativeTime;
    exports.Backend = Backend;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
