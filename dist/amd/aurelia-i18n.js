define('aurelia-i18n', ['exports', 'i18next', 'aurelia-logging', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-metadata', 'aurelia-pal', 'aurelia-framework', 'aurelia-templating-resources', 'aurelia-event-aggregator', 'aurelia-binding'], function (exports, i18next, LogManager, aureliaDependencyInjection, aureliaTemplating, aureliaMetadata, aureliaPal, aureliaFramework, aureliaTemplatingResources, aureliaEventAggregator, aureliaBinding) { 'use strict';

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

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var I18N_EA_SIGNAL = "i18n:locale:changed";
    var I18N = /** @class */ (function () {
        function I18N(ea, signaler) {
            this.ea = ea;
            this.signaler = signaler;
            this.globalVars = {};
            this.i18next = i18next;
            this.Intl = aureliaPal.PLATFORM.global.Intl;
        }
        I18N.inject = function () { return [aureliaEventAggregator.EventAggregator, aureliaTemplatingResources.BindingSignaler]; };
        I18N.prototype.setup = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var defaultOptions;
                var _this = this;
                return __generator(this, function (_a) {
                    defaultOptions = {
                        skipTranslationOnMissingKey: false,
                        compatibilityJSON: "v1",
                        lng: "en",
                        attributes: ["t", "i18n"],
                        fallbackLng: "en",
                        debug: false
                    };
                    this.i18nextDeferred = new Promise(function (resolve, reject) {
                        _this.i18next.init(options || defaultOptions, function (err) {
                            if (err && !Array.isArray(err)) {
                                reject(err);
                            }
                            // make sure attributes is an array in case a string was provided
                            if (_this.i18next.options.attributes instanceof String) {
                                _this.i18next.options.attributes = [_this.i18next.options.attributes];
                            }
                            resolve(_this.i18next);
                        });
                    });
                    return [2 /*return*/, this.i18nextDeferred];
                });
            });
        };
        I18N.prototype.i18nextReady = function () {
            return this.i18nextDeferred;
        };
        I18N.prototype.setLocale = function (locale) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var oldLocale = _this.getLocale();
                _this.i18next.changeLanguage(locale, function (err, tr) {
                    if (err) {
                        reject(err);
                    }
                    _this.ea.publish(I18N_EA_SIGNAL, { oldValue: oldLocale, newValue: locale });
                    _this.signaler.signal("aurelia-translation-signal");
                    resolve(tr);
                });
            });
        };
        I18N.prototype.getLocale = function () {
            return this.i18next.language;
        };
        I18N.prototype.nf = function (options, locales) {
            return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
        };
        I18N.prototype.uf = function (numberLike, locale) {
            var nf = this.nf({}, locale || this.getLocale());
            var comparer = nf.format(10000 / 3);
            var thousandSeparator = comparer[1];
            var decimalSeparator = comparer[5];
            if (thousandSeparator === ".") {
                thousandSeparator = "\\.";
            }
            // remove all thousand seperators
            var result = numberLike.replace(new RegExp(thousandSeparator, "g"), "")
                // remove non-numeric signs except -> , .
                .replace(/[^\d.,-]/g, "")
                // replace original decimalSeparator with english one
                .replace(decimalSeparator, ".");
            // return real number
            return Number(result);
        };
        I18N.prototype.df = function (options, locales) {
            return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
        };
        I18N.prototype.tr = function (key, options) {
            var fullOptions = this.globalVars;
            if (options !== undefined) {
                fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
            }
            return this.i18next.t(key, fullOptions);
        };
        I18N.prototype.registerGlobalVariable = function (key, value) {
            this.globalVars[key] = value;
        };
        I18N.prototype.unregisterGlobalVariable = function (key) {
            delete this.globalVars[key];
        };
        /**
         * Scans an element for children that have a translation attribute and
         * updates their innerHTML with the current translation values.
         *
         * If an image is encountered the translated value will be applied to the src attribute.
         *
         * @param el    HTMLElement to search within
         */
        I18N.prototype.updateTranslations = function (el) {
            if (!el || !el.querySelectorAll) {
                return;
            }
            var i;
            var l;
            // create a selector from the specified attributes to look for
            // var selector = [].concat(this.i18next.options.attributes);
            var attributes = this.i18next.options.attributes;
            var selector = [].concat(attributes);
            for (i = 0, l = selector.length; i < l; i++) {
                selector[i] = "[" + selector[i] + "]";
            }
            selector = selector.join(",");
            // get the nodes
            var nodes = el.querySelectorAll(selector);
            for (i = 0, l = nodes.length; i < l; i++) {
                var node = nodes[i];
                var keys = void 0;
                var params = void 0;
                // test every attribute and get the first one that has a value
                for (var i2 = 0, l2 = attributes.length; i2 < l2; i2++) {
                    keys = node.getAttribute(attributes[i2]);
                    var pname = attributes[i2] + "-params";
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
        };
        I18N.prototype.updateValue = function (node, value, params) {
            if (value === null || value === undefined) {
                value = "";
            }
            var keys = value.toString().split(";");
            var i = keys.length;
            while (i--) {
                var key = keys[i];
                // remove the optional attribute
                var re = /\[([a-z\-, ]*)\]/ig;
                var m = void 0;
                var attr = "text";
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
                var attrs = attr.split(",");
                var j = attrs.length;
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
                    var attrCC = attr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
                    var reservedNames = ["prepend", "append", "text", "html"];
                    var i18nLogger = LogManager.getLogger("i18n");
                    if (reservedNames.indexOf(attr) > -1 &&
                        node.au &&
                        node.au.controller &&
                        node.au.controller.viewModel &&
                        attrCC in node.au.controller.viewModel) {
                        i18nLogger.warn("Aurelia I18N reserved attribute name\n\n  [" + reservedNames.join(", ") + "]\n\n  Your custom element has a bindable named " + attr + " which is a reserved word.\n\n  If you'd like Aurelia I18N to translate your bindable instead, please consider giving it another name.");
                    }
                    if (this.i18next.options.skipTranslationOnMissingKey &&
                        this.tr(key, params) === key) {
                        i18nLogger.warn("Couldn't find translation for key: " + key);
                        return;
                    }
                    // handle various attributes
                    // anything other than text,prepend,append or html will be added as an attribute on the element.
                    switch (attr) {
                        case "text":
                            var newChild = aureliaPal.DOM.createTextNode(this.tr(key, params));
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
                            var prependParser = aureliaPal.DOM.createElement("div");
                            prependParser.innerHTML = this.tr(key, params);
                            for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
                                if (node.childNodes[ni]._prepended) {
                                    node.removeChild(node.childNodes[ni]);
                                }
                            }
                            for (var pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
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
                            var appendParser = aureliaPal.DOM.createElement("div");
                            appendParser.innerHTML = this.tr(key, params);
                            for (var ni = node.childNodes.length - 1; ni >= 0; ni--) {
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
        };
        return I18N;
    }());

    var TBindingBehavior = /** @class */ (function () {
        function TBindingBehavior(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        TBindingBehavior.inject = function () { return [aureliaTemplatingResources.SignalBindingBehavior]; };
        TBindingBehavior.prototype.bind = function (binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
            // rewrite the expression to use the TValueConverter.
            // pass through any args to the binding behavior to the TValueConverter
            var sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            var expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "t", sourceExpression.args, [expression].concat(sourceExpression.args));
        };
        TBindingBehavior.prototype.unbind = function (binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        };
        TBindingBehavior = __decorate([
            aureliaBinding.bindingBehavior("t")
        ], TBindingBehavior);
        return TBindingBehavior;
    }());

    // tslint:disable-next-line:only-arrow-functions
    var isInteger = Number.isInteger || function (value) {
        return typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value;
    };
    var LazyOptional = /** @class */ (function () {
        function LazyOptional(key) {
            this.key = key;
        }
        LazyOptional_1 = LazyOptional;
        LazyOptional.of = function (key) {
            return new LazyOptional_1(key);
        };
        LazyOptional.prototype.get = function (container) {
            var _this = this;
            return function () {
                if (container.hasResolver(_this.key, false)) {
                    return container.get(_this.key);
                }
                return null;
            };
        };
        var LazyOptional_1;
        LazyOptional = LazyOptional_1 = __decorate([
            aureliaDependencyInjection.resolver()
        ], LazyOptional);
        return LazyOptional;
    }());

    var TParamsCustomAttribute = /** @class */ (function () {
        function TParamsCustomAttribute(element) {
            this.element = element;
        }
        TParamsCustomAttribute_1 = TParamsCustomAttribute;
        TParamsCustomAttribute.inject = function () {
            return [aureliaPal.DOM.Element];
        };
        TParamsCustomAttribute.configureAliases = function (aliases) {
            var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, aureliaTemplating.HtmlBehaviorResource, TParamsCustomAttribute_1);
            r.aliases = aliases;
        };
        TParamsCustomAttribute.prototype.valueChanged = function () { };
        var TParamsCustomAttribute_1;
        TParamsCustomAttribute = TParamsCustomAttribute_1 = __decorate([
            aureliaTemplating.customAttribute("t-params")
        ], TParamsCustomAttribute);
        return TParamsCustomAttribute;
    }());

    var TCustomAttribute = /** @class */ (function () {
        function TCustomAttribute(element, service, ea, p) {
            this.element = element;
            this.service = service;
            this.ea = ea;
            this.lazyParams = p;
        }
        TCustomAttribute_1 = TCustomAttribute;
        TCustomAttribute.inject = function () {
            return [aureliaPal.DOM.Element, I18N, aureliaEventAggregator.EventAggregator, LazyOptional.of(TParamsCustomAttribute)];
        };
        TCustomAttribute.configureAliases = function (aliases) {
            var r = aureliaMetadata.metadata.getOrCreateOwn(aureliaMetadata.metadata.resource, aureliaTemplating.HtmlBehaviorResource, TCustomAttribute_1);
            r.aliases = aliases;
        };
        TCustomAttribute.prototype.bind = function () {
            var _this = this;
            this.params = this.lazyParams();
            if (this.params) {
                this.params.valueChanged = function (newParams, oldParams) {
                    _this.paramsChanged(_this.value, newParams, oldParams);
                };
            }
            var p = this.params !== null ? this.params.value : undefined;
            this.subscription = this.ea.subscribe(I18N_EA_SIGNAL, function () {
                _this.service.updateValue(_this.element, _this.value, _this.params !== null ? _this.params.value : undefined);
            });
            this.service.updateValue(this.element, this.value, p);
        };
        TCustomAttribute.prototype.paramsChanged = function (newValue, newParams) {
            this.service.updateValue(this.element, newValue, newParams);
        };
        TCustomAttribute.prototype.valueChanged = function (newValue) {
            var p = this.params !== null ? this.params.value : undefined;
            this.service.updateValue(this.element, newValue, p);
        };
        TCustomAttribute.prototype.unbind = function () {
            // If unbind is called before timeout for subscription is triggered, subscription will be undefined
            if (this.subscription) {
                this.subscription.dispose();
            }
        };
        var TCustomAttribute_1;
        TCustomAttribute = TCustomAttribute_1 = __decorate([
            aureliaTemplating.customAttribute("t")
        ], TCustomAttribute);
        return TCustomAttribute;
    }());

    var TValueConverter = /** @class */ (function () {
        function TValueConverter(service) {
            this.service = service;
        }
        TValueConverter.inject = function () { return [I18N]; };
        TValueConverter.prototype.toView = function (value, options) {
            return this.service.tr(value, options);
        };
        TValueConverter = __decorate([
            aureliaFramework.valueConverter("t")
        ], TValueConverter);
        return TValueConverter;
    }());

    var NfBindingBehavior = /** @class */ (function () {
        function NfBindingBehavior(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        NfBindingBehavior.inject = function () { return [aureliaTemplatingResources.SignalBindingBehavior]; };
        NfBindingBehavior.prototype.bind = function (binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
            // rewrite the expression to use the NfValueConverter.
            // pass through any args to the binding behavior to the NfValueConverter
            var sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            var expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "nf", sourceExpression.args, [expression].concat(sourceExpression.args));
        };
        NfBindingBehavior.prototype.unbind = function (binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        };
        NfBindingBehavior = __decorate([
            aureliaBinding.bindingBehavior("nf")
        ], NfBindingBehavior);
        return NfBindingBehavior;
    }());

    var NfValueConverter = /** @class */ (function () {
        function NfValueConverter(service) {
            this.service = service;
        }
        NfValueConverter.inject = function () { return [I18N]; };
        NfValueConverter.prototype.toView = function (value, nfOrOptions, locale) {
            if (value === null
                || typeof value === "undefined"
                || (typeof value === "string" && value.trim() === "")) {
                return value;
            }
            if (nfOrOptions && (nfOrOptions instanceof Intl.NumberFormat && typeof nfOrOptions.format === "function")) {
                return nfOrOptions.format(value);
            }
            var nf = this.service.nf(nfOrOptions, locale || this.service.getLocale());
            return nf.format(value);
        };
        NfValueConverter = __decorate([
            aureliaBinding.valueConverter("nf")
        ], NfValueConverter);
        return NfValueConverter;
    }());

    var DfBindingBehavior = /** @class */ (function () {
        function DfBindingBehavior(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        DfBindingBehavior.inject = function () { return [aureliaTemplatingResources.SignalBindingBehavior]; };
        DfBindingBehavior.prototype.bind = function (binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal");
            // rewrite the expression to use the DfValueConverter.
            // pass through any args to the binding behavior to the DfValueConverter
            var sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            var expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "df", sourceExpression.args, [expression].concat(sourceExpression.args));
        };
        DfBindingBehavior.prototype.unbind = function (binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        };
        DfBindingBehavior = __decorate([
            aureliaBinding.bindingBehavior("df")
        ], DfBindingBehavior);
        return DfBindingBehavior;
    }());

    var DfValueConverter = /** @class */ (function () {
        function DfValueConverter(service) {
            this.service = service;
        }
        DfValueConverter.inject = function () { return [I18N]; };
        DfValueConverter.prototype.toView = function (value, dfOrOptions, locale) {
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
            var df = this.service.df(dfOrOptions, locale || this.service.getLocale());
            return df.format(value);
        };
        DfValueConverter = __decorate([
            aureliaBinding.valueConverter("df")
        ], DfValueConverter);
        return DfValueConverter;
    }());

    var RtBindingBehavior = /** @class */ (function () {
        function RtBindingBehavior(signalBindingBehavior) {
            this.signalBindingBehavior = signalBindingBehavior;
        }
        RtBindingBehavior.inject = function () { return [aureliaTemplatingResources.SignalBindingBehavior]; };
        RtBindingBehavior.prototype.bind = function (binding, source) {
            // bind the signal behavior
            this.signalBindingBehavior.bind(binding, source, "aurelia-translation-signal", "aurelia-relativetime-signal");
            // rewrite the expression to use the RtValueConverter.
            // pass through any args to the binding behavior to the RtValueConverter
            var sourceExpression = binding.sourceExpression;
            // do create the sourceExpression only once
            if (sourceExpression.rewritten) {
                return;
            }
            sourceExpression.rewritten = true;
            var expression = sourceExpression.expression;
            sourceExpression.expression = new aureliaBinding.ValueConverter(expression, "rt", sourceExpression.args, [expression].concat(sourceExpression.args));
        };
        RtBindingBehavior.prototype.unbind = function (binding, source) {
            // unbind the signal behavior
            this.signalBindingBehavior.unbind(binding, source);
        };
        RtBindingBehavior = __decorate([
            aureliaBinding.bindingBehavior("rt")
        ], RtBindingBehavior);
        return RtBindingBehavior;
    }());

    var translations = {
        ar: {
            translation: {
                now: 'الآن',
                second_ago: 'قبل ثانية واحدة',
                second_ago_plural: 'قبل __count__ ثانية',
                second_in: 'خلال ثانية واحدة',
                second_in_plural: 'خلال __count__ ثانية',
                minute_ago: 'قبل دقيقة واحدة',
                minute_ago_plural: 'قبل __count__ دقيقة',
                minute_in: 'خلال دقيقة واحدة',
                minute_in_plural: 'خلال __count__ دقيقة',
                hour_ago: 'قبل ساعة واحدة',
                hour_ago_plural: 'قبل __count__ ساعة',
                hour_in: 'خلال ساعة واحدة',
                hour_in_plural: 'خلال __count__ ساعة',
                day_ago: 'قبل يوم واحد',
                day_ago_plural: 'قبل __count__ يومًا',
                day_in: 'خلال يوم واحد',
                day_in_plural: 'خلال __count__ يومًا',
                month_ago: 'قبل شهر واحد',
                month_ago_plural: 'قبل __count__ شهرًا',
                month_in: 'خلال شهر واحد',
                month_in_plural: 'خلال __count__ شهرًا',
                year_ago: 'قبل سنة واحدة',
                year_ago_plural: 'قبل __count__ سنة',
                year_in: 'خلال سنة واحدة',
                year_in_plural: 'خلال __count__ سنة'
            }
        },
        da: {
            translation: {
                now: 'lige nu',
                second_ago: 'for __count__ sekund siden',
                second_ago_plural: 'for __count__ sekunder siden',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekunder',
                minute_ago: 'for __count__ minut siden',
                minute_ago_plural: 'for __count__ minutter siden',
                minute_in: 'om __count__ minut',
                minute_in_plural: 'om __count__ minutter',
                hour_ago: 'for __count__ time siden',
                hour_ago_plural: 'for __count__ timer siden',
                hour_in: 'om __count__ time',
                hour_in_plural: 'om __count__ timer',
                day_ago: 'for __count__ dag siden',
                day_ago_plural: 'for __count__ dage siden',
                day_in: 'om __count__ dag',
                day_in_plural: 'om __count__ dage',
                month_ago: 'for __count__ måned siden',
                month_ago_plural: 'for __count__ måneder siden',
                month_in: 'om __count__ måned',
                month_in_plural: 'om __count__ måneder',
                year_ago: 'for __count__ år siden',
                year_ago_plural: 'for __count__ år siden',
                year_in: 'om __count__ år',
                year_in_plural: 'om __count__ år'
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
                second_in: 'dentro de __count__ segundo',
                second_in_plural: 'dentro de __count__ segundos',
                minute_ago: 'hace __count__ minuto',
                minute_ago_plural: 'hace __count__ minutos',
                minute_in: 'dentro de __count__ minuto',
                minute_in_plural: 'dentro de __count__ minutos',
                hour_ago: 'hace __count__ hora',
                hour_ago_plural: 'hace __count__ horas',
                hour_in: 'dentro de __count__ hora',
                hour_in_plural: 'dentro de __count__ horas',
                day_ago: 'hace __count__ día',
                day_ago_plural: 'hace __count__ días',
                day_in: 'dentro de __count__ día',
                day_in_plural: 'dentro de __count__ días',
                month_ago: 'hace __count__ mes',
                month_ago_plural: 'hace __count__ meses',
                month_in: 'dentro de __count__ mes',
                month_in_plural: 'dentro de __count__ meses',
                year_ago: 'hace __count__ año',
                year_ago_plural: 'hace __count__ años',
                year_in: 'dentro de __count__ año',
                year_in_plural: 'dentro de __count__ años'
            }
        },
        fi: {
            translation: {
                now: 'Nyt',
                second_ago: '__count__ sekunti sitten',
                second_ago_plural: '__count__ sekuntia sitten',
                second_in: '__count__ sekunnin päästä',
                second_in_plural: '__count__ sekunnin päästä',
                minute_ago: '__count__ minuutti sitten',
                minute_ago_plural: '__count__ minuuttia sitten',
                minute_in: '__count__ minuutin päästä',
                minute_in_plural: '__count__ minuutin päästä',
                hour_ago: '__count__ tunti sitten',
                hour_ago_plural: '__count__ tuntia sitten',
                hour_in: '__count__ tunnin päästä',
                hour_in_plural: '__count__ tunnin päästä',
                day_ago: '__count__ päivä sitten',
                day_ago_plural: '__count__ päivää sitten',
                day_in: '__count__ päivän päästä',
                day_in_plural: '__count__ päivän päästä',
                month_ago: '__count__ kuukausi sitten',
                month_ago_plural: '__count__ kuukautta sitten',
                month_in: '__count__ kuukauden päästä',
                month_in_plural: '__count__ kuukauden päästä',
                year_ago: '__count__ vuosi sitten',
                year_ago_plural: '__count__ vuotta sitten',
                year_in: '__count__ vuoden päästä',
                year_in_plural: '__count__ vuoden päästä'
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
                second_in: 'tra __count__ secondo',
                second_in_plural: 'tra __count__ secondi',
                minute_ago: '__count__ minuto fa',
                minute_ago_plural: '__count__ minuti fa',
                minute_in: 'tra __count__ minuto',
                minute_in_plural: 'tra __count__ minuti',
                hour_ago: '__count__ ora fa',
                hour_ago_plural: '__count__ ore fa',
                hour_in: 'tra __count__ ora',
                hour_in_plural: 'tra __count__ ore',
                day_ago: '__count__ giorno fa',
                day_ago_plural: '__count__ giorni fa',
                day_in: 'tra __count__ giorno',
                day_in_plural: 'tra __count__ giorni',
                month_ago: '__count__ mese fa',
                month_ago_plural: '__count__ mesi fa',
                month_in: 'tra __count__ mese',
                month_in_plural: 'tra __count__ mesi',
                year_ago: '__count__ anno fa',
                year_ago_plural: '__count__ anni fa',
                year_in: 'tra __count__ anno',
                year_in_plural: 'tra __count__ anni'
            }
        },
        ja: {
            translation: {
                now: 'たった今',
                second_ago: '__count__ 秒前',
                second_ago_plural: '__count__ 秒前',
                second_in: '__count__ 秒後',
                second_in_plural: '__count__ 秒後',
                minute_ago: '__count__ 分前',
                minute_ago_plural: '__count__ 分前',
                minute_in: '__count__ 分後',
                minute_in_plural: '__count__ 分後',
                hour_ago: '__count__ 時間前',
                hour_ago_plural: '__count__ 時間前',
                hour_in: '__count__ 時間後',
                hour_in_plural: '__count__ 時間後',
                day_ago: '__count__ 日前',
                day_ago_plural: '__count__ 日前',
                day_in: '__count__ 日後',
                day_in_plural: '__count__ 日後',
                month_ago: '__count__ か月前',
                month_ago_plural: '__count__ か月前',
                month_in: '__count__ か月後',
                month_in_plural: '__count__ か月後',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: '__count__ 年後',
                year_in_plural: '__count__ 年後'
            }
        },
        lt: {
            translation: {
                now: 'šiuo metu',
                second_ago: 'prieš __count__ sekundę',
                second_ago_plural: 'prieš __count__ sekundes',
                second_in: 'po __count__ sekundės',
                second_in_plural: 'po __count__ sekundžių',
                minute_ago: 'prieš __count__ minutę',
                minute_ago_plural: 'prieš __count__ minutes',
                minute_in: 'po __count__ minutės',
                minute_in_plural: 'po __count__ minučių',
                hour_ago: 'prieš __count__ valandą',
                hour_ago_plural: 'prieš __count__ valandas',
                hour_in: 'po __count__ valandos',
                hour_in_plural: 'po __count__ valandų',
                day_ago: 'prieš __count__ dieną',
                day_ago_plural: 'prieš __count__ dienas',
                day_in: 'po __count__ dienos',
                day_in_plural: 'po __count__ dienų',
                month_ago: 'prieš __count__ mėnesį',
                month_ago_plural: 'prieš __count__ mėnesius',
                month_in: 'po __count__ mėnesio',
                month_in_plural: 'po __count__ mėnesių',
                year_ago: 'prieš __count__ metus',
                year_ago_plural: 'prieš __count__ metus',
                year_in: 'po __count__ metų',
                year_in_plural: 'po __count__ metų'
            }
        },
        nl: {
            translation: {
                now: 'zonet',
                second_ago: '__count__ seconde geleden',
                second_ago_plural: '__count__ seconden geleden',
                second_in: 'over __count__ seconde',
                second_in_plural: 'over __count__ seconden',
                minute_ago: '__count__ minuut geleden',
                minute_ago_plural: '__count__ minuten geleden',
                minute_in: 'over __count__ minuut',
                minute_in_plural: 'over __count__ minuten',
                hour_ago: '__count__ uur geleden',
                hour_ago_plural: '__count__ uur geleden',
                hour_in: 'over __count__ uur',
                hour_in_plural: 'over __count__ uur',
                day_ago: '__count__ dag geleden',
                day_ago_plural: '__count__ dagen geleden',
                day_in: 'over __count__ dag',
                day_in_plural: 'over __count__ dagen',
                month_ago: '__count__ maand geleden',
                month_ago_plural: '__count__ maanden geleden',
                month_in: 'over __count__ maand',
                month_in_plural: 'over __count__ maanden',
                year_ago: '__count__ jaar geleden',
                year_ago_plural: '__count__ jaar geleden',
                year_in: 'over __count__ jaar',
                year_in_plural: 'over __count__ jaar'
            }
        },
        nn: {
            translation: {
                now: 'akkurat no',
                second_ago: 'for __count__ sekund sidan',
                second_ago_plural: 'for __count__ sekund sidan',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekund',
                minute_ago: 'for __count__ minutt sidan',
                minute_ago_plural: 'for __count__ minutt sidan',
                minute_in: 'om __count__ minutt',
                minute_in_plural: 'om __count__ minutt',
                hour_ago: 'for __count__ time sidan',
                hour_ago_plural: 'for __count__ timar sidan',
                hour_in: 'om __count__ time',
                hour_in_plural: 'om __count__ timar',
                day_ago: 'for __count__ døgn sidan',
                day_ago_plural: 'for __count__ døgn sidan',
                day_in: 'om __count__ døgn',
                day_in_plural: 'om __count__ døgn',
                month_ago: 'for __count__ månad sidan',
                month_ago_plural: 'for __count__ månadar sidan',
                month_in: 'om __count__ månad',
                month_in_plural: 'om __count__ månadar',
                year_ago: 'for __count__ år sidan',
                year_ago_plural: 'for __count__ år sidan',
                year_in: 'om __count__ år',
                year_in_plural: 'om __count__ år'
            }
        },
        nb: {
            translation: {
                now: 'akkurat nå',
                second_ago: 'for __count__ sekund siden',
                second_ago_plural: 'for __count__ sekunder siden',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekunder',
                minute_ago: 'for __count__ minutt siden',
                minute_ago_plural: 'for __count__ minutter siden',
                minute_in: 'om __count__ minutt',
                minute_in_plural: 'om __count__ minutter',
                hour_ago: 'for __count__ time siden',
                hour_ago_plural: 'for __count__ timer siden',
                hour_in: 'om __count__ time',
                hour_in_plural: 'om __count__ timer',
                day_ago: 'for __count__ døgn siden',
                day_ago_plural: 'for __count__ døgn siden',
                day_in: 'om __count__ døgn',
                day_in_plural: 'om __count__ døgn',
                month_ago: 'for __count__ måned siden',
                month_ago_plural: 'for __count__ måneder siden',
                month_in: 'om __count__ måned',
                month_in_plural: 'om __count__ måneder',
                year_ago: 'for __count__ år siden',
                year_ago_plural: 'for __count__ år siden',
                year_in: 'om __count__ år',
                year_in_plural: 'om __count__ år'
            }
        },
        pl: {
            translation: {
                now: 'teraz',
                second_ago: '__count__ sekundę temu',
                second_ago_plural: '__count__ sekundy temu',
                second_in: 'za __count__ sekundę',
                second_in_plural: 'za __count__ sekundy',
                minute_ago: '__count__ minutę temu',
                minute_ago_plural: '__count__ minuty temu',
                minute_in: 'za __count__ minutę',
                minute_in_plural: 'za __count__ minuty',
                hour_ago: '__count__ godzinę temu',
                hour_ago_plural: '__count__ godziny temu',
                hour_in: 'za __count__ godzinę',
                hour_in_plural: 'za __count__ godziny',
                day_ago: '__count__ dzień temu',
                day_ago_plural: '__count__ dni temu',
                day_in: 'za __count__ dzień',
                day_in_plural: 'za __count__ dni',
                month_ago: '__count__ miesiąc temu',
                month_ago_plural: '__count__ miesiące temu',
                month_in: 'za __count__ miesiąc',
                month_in_plural: 'za __count__ miesiące',
                year_ago: '__count__ rok temu',
                year_ago_plural: '__count__ lata temu',
                year_in: 'za __count__ rok',
                year_in_plural: 'za __count__ lata'
            }
        },
        pt: {
            translation: {
                now: 'neste exato momento',
                second_ago: 'há __count__ segundo',
                second_ago_plural: 'há __count__ segundos',
                second_in: 'em __count__ segundo',
                second_in_plural: 'em __count__ segundos',
                minute_ago: 'há __count__ minuto',
                minute_ago_plural: 'há __count__ minutos',
                minute_in: 'em __count__ minuto',
                minute_in_plural: 'em __count__ minutos',
                hour_ago: 'há __count__ hora',
                hour_ago_plural: 'há __count__ horas',
                hour_in: 'em __count__ hora',
                hour_in_plural: 'em __count__ horas',
                day_ago: 'há __count__ dia',
                day_ago_plural: 'há __count__ dias',
                day_in: 'em __count__ dia',
                day_in_plural: 'em __count__ dias',
                month_ago: 'há __count__ mês',
                month_ago_plural: 'há __count__ meses',
                month_in: 'em __count__ mês',
                month_in_plural: 'em __count__ meses',
                year_ago: 'há __count__ ano',
                year_ago_plural: 'há __count__ anos',
                year_in: 'em __count__ ano',
                year_in_plural: 'em __count__ anos'
            }
        },
        sv: {
            translation: {
                now: 'just nu',
                second_ago: 'för __count__ sekund sedan',
                second_ago_plural: 'för __count__ sekunder sedan',
                second_in: 'om __count__ sekund',
                second_in_plural: 'om __count__ sekunder',
                minute_ago: 'för __count__ minut sedan',
                minute_ago_plural: 'för __count__ minuter sedan',
                minute_in: 'om __count__ minut',
                minute_in_plural: 'om __count__ minuter',
                hour_ago: 'för __count__ timme sedan',
                hour_ago_plural: 'för __count__ timmar sedan',
                hour_in: 'om __count__ timme',
                hour_in_plural: 'om __count__ timmar',
                day_ago: 'för __count__ dag sedan',
                day_ago_plural: 'för __count__ dagar sedan',
                day_in: 'om __count__ dag',
                day_in_plural: 'om __count__ dagar',
                month_ago: 'för __count__ månad sedan',
                month_ago_plural: 'för __count__ månader sedan',
                month_in: 'om __count__ månad',
                month_in_plural: 'om __count__ månader',
                year_ago: 'för __count__ år sedan',
                year_ago_plural: 'för __count__ år sedan',
                year_in: 'om __count__ år',
                year_in_plural: 'om __count__ år'
            }
        },
        th: {
            translation: {
                now: 'เมื่อกี้',
                second_ago: '__count__ วินาทีที่ผ่านมา',
                second_ago_plural: '__count__ วินาทีที่ผ่านมา',
                second_in: 'ในอีก __count__ วินาที',
                second_in_plural: 'ในอีก __count__ วินาที',
                minute_ago: '__count__ นาทีที่ผ่านมา',
                minute_ago_plural: '__count__ นาทีที่ผ่านมา',
                minute_in: 'ในอีก __count__ นาที',
                minute_in_plural: 'ในอีก __count__ นาที',
                hour_ago: '__count__ ชั่วโมงที่ผ่านมา',
                hour_ago_plural: '__count__ ชั่วโมงที่ผ่านมา',
                hour_in: 'ในอีก __count__ ชั่วโมง',
                hour_in_plural: 'ในอีก __count__ ชั่วโมง',
                day_ago: '__count__ วันที่ผ่านมา',
                day_ago_plural: '__count__ วันที่ผ่านมา',
                day_in: 'ในอีก __count__ วัน',
                day_in_plural: 'ในอีก __count__ วัน',
                month_ago: '__count__ เดือนที่ผ่านมา',
                month_ago_plural: '__count__ เดือนที่ผ่านมา',
                month_in: 'ในอีก __count__ เดือน',
                month_in_plural: 'ในอีก __count__ เดือน',
                year_ago: '__count__ ปีที่แล้ว',
                year_ago_plural: '__count__ ปีที่แล้ว',
                year_in: 'ในอีก __count__ ปี',
                year_in_plural: 'ในอีก __count__ ปี'
            }
        },
        zh: {
            translation: {
                now: '刚才',
                second_ago: '__count__秒钟前',
                second_ago_plural: '__count__秒钟前',
                second_in: '__count__秒钟后',
                second_in_plural: '__count__秒钟后',
                minute_ago: '__count__分钟前',
                minute_ago_plural: '__count__分钟前',
                minute_in: '__count__分钟后',
                minute_in_plural: '__count__分钟后',
                hour_ago: '__count__小时前',
                hour_ago_plural: '__count__小时前',
                hour_in: '__count__小时后',
                hour_in_plural: '__count__小时后',
                day_ago: '__count__天前',
                day_ago_plural: '__count__天前',
                day_in: '__count__天后',
                day_in_plural: '__count__天后',
                month_ago: '__count__个月前',
                month_ago_plural: '__count__个月前',
                month_in: '__count__个月后',
                month_in_plural: '__count__个月后',
                year_ago: '__count__年前',
                year_ago_plural: '__count__年前',
                year_in: '__count__年后',
                year_in_plural: '__count__年后'
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
                second_ago: '__count__ 秒前',
                second_ago_plural: '__count__ 秒前',
                second_in: '__count__ 秒後',
                second_in_plural: '__count__ 秒後',
                minute_ago: '__count__ 分鐘前',
                minute_ago_plural: '__count__ 分鐘前',
                minute_in: '__count__ 分鐘後',
                minute_in_plural: '__count__ 分鐘後',
                hour_ago: '__count__ 小時前',
                hour_ago_plural: '__count__ 小時前',
                hour_in: '__count__ 小時後',
                hour_in_plural: '__count__ 小時後',
                day_ago: '__count__ 日前',
                day_ago_plural: '__count__ 日前',
                day_in: '__count__ 日後',
                day_in_plural: '__count__ 日後',
                month_ago: '__count__ 個月前',
                month_ago_plural: '__count__ 個月前',
                month_in: '__count__ 個月後',
                month_in_plural: '__count__ 個月後',
                year_ago: '__count__ 年前',
                year_ago_plural: '__count__ 年前',
                year_in: '__count__ 年後',
                year_in_plural: '__count__ 年後'
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
        }
    };
    // tslint:enable

    var RelativeTime = /** @class */ (function () {
        function RelativeTime(service, ea) {
            var _this = this;
            this.service = service;
            this.ea = ea;
            this.service.i18nextReady().then(function () {
                _this.setup();
            });
            this.ea.subscribe(I18N_EA_SIGNAL, function (locales) {
                _this.setup(locales);
            });
        }
        RelativeTime.inject = function () { return [I18N, aureliaEventAggregator.EventAggregator]; };
        RelativeTime.prototype.setup = function (locales) {
            var trans = translations;
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

    var RtValueConverter = /** @class */ (function () {
        function RtValueConverter(service) {
            this.service = service;
        }
        RtValueConverter.inject = function () { return [RelativeTime]; };
        RtValueConverter.prototype.toView = function (value) {
            if (value === null
                || typeof value === "undefined"
                || (typeof value === "string" && value.trim() === "")) {
                return value;
            }
            if (typeof value === "string" && isNaN(value) && !Number.isInteger(value)) {
                value = new Date(value);
            }
            return this.service.getRelativeTime(value);
        };
        RtValueConverter = __decorate([
            aureliaBinding.valueConverter("rt")
        ], RtValueConverter);
        return RtValueConverter;
    }());

    var Backend = /** @class */ (function () {
        function Backend(services, options) {
            if (options === void 0) { options = {}; }
            this.services = services;
            this.options = options;
            this.type = "backend";
            this.init(services, options);
        }
        Backend.with = function (loader) {
            this.loader = loader;
            return this;
        };
        Backend.prototype.init = function (services, options) {
            if (options === void 0) { options = {}; }
            this.services = services;
            this.options = Object.assign({}, {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
                addPath: "locales/add/{{lng}}/{{ns}}",
                allowMultiLoading: false,
                parse: JSON.parse
            }, options);
        };
        Backend.prototype.readMulti = function (languages, namespaces, callback) {
            var loadPath = this.options.loadPath;
            if (typeof this.options.loadPath === "function") {
                loadPath = this.options.loadPath(languages, namespaces);
            }
            var url = this.services
                .interpolator
                .interpolate(loadPath, { lng: languages.join("+"), ns: namespaces.join("+") });
            this.loadUrl(url, callback);
        };
        Backend.prototype.read = function (language, namespace, callback) {
            var loadPath = this.options.loadPath;
            if (typeof this.options.loadPath === "function") {
                loadPath = this.options.loadPath([language], [namespace]);
            }
            var url = this.services.interpolator.interpolate(loadPath, { lng: language, ns: namespace });
            this.loadUrl(url, callback);
        };
        Backend.prototype.loadUrl = function (url, callback) {
            return __awaiter(this, void 0, void 0, function () {
                var response, ret, err, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Backend.loader.loadText(url)];
                        case 1:
                            response = _b.sent();
                            ret = void 0;
                            err = void 0;
                            try {
                                ret = (response instanceof Object) ? response : this.options.parse(response, url);
                            }
                            catch (e) {
                                err = "failed parsing " + url + " to json";
                            }
                            if (err) {
                                return [2 /*return*/, callback(err, false)];
                            }
                            callback(null, ret);
                            return [3 /*break*/, 3];
                        case 2:
                            _a = _b.sent();
                            callback("failed loading " + url, false /* no retry */);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // tslint:disable-next-line:variable-name
        Backend.prototype.create = function (_languages, _namespace, _key, _fallbackValue) {
            // not supported
        };
        Backend.type = "backend";
        return Backend;
    }());

    function configure(frameworkConfig, cb) {
        if (typeof cb !== "function") {
            var errorMsg = "You need to provide a callback method to properly configure the library";
            throw errorMsg;
        }
        var instance = frameworkConfig.container.get(I18N);
        var ret = cb(instance);
        frameworkConfig.globalResources([
            TValueConverter,
            TBindingBehavior,
            TCustomAttribute,
            TParamsCustomAttribute,
            NfValueConverter,
            NfBindingBehavior,
            DfValueConverter,
            DfBindingBehavior,
            RtValueConverter,
            RtBindingBehavior
        ]);
        frameworkConfig.postTask(function () {
            var resources = frameworkConfig.container.get(aureliaTemplating.ViewResources);
            var htmlBehaviorResource = resources.getAttribute("t");
            var htmlParamsResource = resources.getAttribute("t-params");
            var attributes = instance.i18next.options.attributes;
            // Register default attributes if none provided
            if (!attributes) {
                attributes = ["t", "i18n"];
            }
            attributes.forEach(function (alias) { return resources.registerAttribute(alias, htmlBehaviorResource, "t"); });
            attributes.forEach(function (alias) { return resources.registerAttribute(alias + "-params", htmlParamsResource, "t-params"); });
        });
        return ret;
    }

    exports.configure = configure;
    exports.DfValueConverter = DfValueConverter;
    exports.DfBindingBehavior = DfBindingBehavior;
    exports.NfValueConverter = NfValueConverter;
    exports.NfBindingBehavior = NfBindingBehavior;
    exports.RtValueConverter = RtValueConverter;
    exports.RtBindingBehavior = RtBindingBehavior;
    exports.TValueConverter = TValueConverter;
    exports.TBindingBehavior = TBindingBehavior;
    exports.TCustomAttribute = TCustomAttribute;
    exports.TParamsCustomAttribute = TParamsCustomAttribute;
    exports.I18N_EA_SIGNAL = I18N_EA_SIGNAL;
    exports.I18N = I18N;
    exports.RelativeTime = RelativeTime;
    exports.Backend = Backend;

    Object.defineProperty(exports, '__esModule', { value: true });

});
