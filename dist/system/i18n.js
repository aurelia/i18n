System.register(["i18next", "aurelia-pal", "aurelia-logging", "aurelia-framework"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
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
    };
    var i18next_1, aurelia_pal_1, LogManager, aurelia_framework_1, I18N_EA_SIGNAL, I18N;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [
            function (i18next_1_1) {
                i18next_1 = i18next_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (LogManager_1) {
                LogManager = LogManager_1;
            },
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            }
        ],
        execute: function () {
            exports_1("I18N_EA_SIGNAL", I18N_EA_SIGNAL = "i18n:locale:changed");
            I18N = /** @class */ (function () {
                function I18N(ea, signaler) {
                    this.ea = ea;
                    this.signaler = signaler;
                    this.globalVars = {};
                    this.i18next = i18next_1.default;
                    this.Intl = aurelia_pal_1.PLATFORM.global.Intl;
                }
                I18N.prototype.setup = function (options) {
                    return __awaiter(this, void 0, void 0, function () {
                        var defaultOptions;
                        var _this = this;
                        return __generator(this, function (_a) {
                            defaultOptions = {
                                skipTranslationOnMissingKey: false,
                                compatibilityAPI: "v1",
                                compatibilityJSON: "v1",
                                lng: "en",
                                attributes: ["t", "i18n"],
                                fallbackLng: "en",
                                debug: false
                            };
                            this.i18nextDeferred = new Promise(function (resolve, reject) {
                                _this.i18next = _this.i18next.init(options || defaultOptions, function (err) {
                                    if (err) {
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
                        return;
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
                                    var newChild = aurelia_pal_1.DOM.createTextNode(this.tr(key, params));
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
                                    var prependParser = aurelia_pal_1.DOM.createElement("div");
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
                                    var appendParser = aurelia_pal_1.DOM.createElement("div");
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
                I18N = __decorate([
                    aurelia_framework_1.autoinject()
                ], I18N);
                return I18N;
            }());
            exports_1("I18N", I18N);
        }
    };
});
//# sourceMappingURL=i18n.js.map