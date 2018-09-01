var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import i18next from "i18next";
import { DOM, PLATFORM } from "aurelia-pal";
import * as LogManager from "aurelia-logging";
import { autoinject } from "aurelia-framework";
export const I18N_EA_SIGNAL = "i18n:locale:changed";
let I18N = class I18N {
    constructor(ea, signaler) {
        this.ea = ea;
        this.signaler = signaler;
        this.globalVars = {};
        this.i18next = i18next;
        this.Intl = PLATFORM.global.Intl;
    }
    async setup(options) {
        const defaultOptions = {
            skipTranslationOnMissingKey: false,
            compatibilityAPI: "v1",
            compatibilityJSON: "v1",
            lng: "en",
            attributes: ["t", "i18n"],
            fallbackLng: "en",
            debug: false
        };
        this.i18nextDeferred = new Promise((resolve, reject) => {
            this.i18next = this.i18next.init(options || defaultOptions, (err) => {
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
                        const newChild = DOM.createTextNode(this.tr(key, params));
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
                        const prependParser = DOM.createElement("div");
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
                        const appendParser = DOM.createElement("div");
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
};
I18N = __decorate([
    autoinject()
], I18N);
export { I18N };
//# sourceMappingURL=i18n.js.map