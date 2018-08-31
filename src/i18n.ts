/*eslint no-cond-assign: 0*/
import * as LogManager from "aurelia-logging";
import i18next, { i18n, InitOptions } from "i18next";
import { DOM, PLATFORM } from "aurelia-pal";
import { EventAggregator } from "aurelia-event-aggregator";
import { BindingSignaler } from "aurelia-templating-resources";
import { autoinject } from "aurelia-framework";

export interface AureliaEnhancedOptions extends InitOptions {
  attributes?: string[];
  skipTranslationOnMissingKey?: boolean;
}

export interface AureliaEnhancedI18Next extends i18n {
  options: AureliaEnhancedOptions;
}

// tslint:disable-next-line:interface-name
export interface I18NEventPayload {
  oldValue: string;
  newValue: string;
}

@autoinject
export class I18N {
  public i18nextDeferred: Promise<AureliaEnhancedI18Next>;
  public i18next: AureliaEnhancedI18Next;
  public Intl: typeof Intl;
  private globalVars: {[key: string]: any} = {};

  constructor(private ea: EventAggregator, private signaler: BindingSignaler) {
    this.i18next = i18next;
    this.Intl = PLATFORM.global.Intl;
  }

  public async setup(options?: AureliaEnhancedOptions & InitOptions) {
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
          this.i18next.options.attributes = [this.i18next.options.attributes as any as string];
        }

        resolve(this.i18next);
      });
    });

    return this.i18nextDeferred;
  }

  public i18nextReady(): Promise<any> {
    return this.i18nextDeferred;
  }

  public setLocale(locale: string): Promise<i18next.TranslationFunction> {
    return new Promise((resolve, reject) => {
      const oldLocale = this.getLocale();
      this.i18next.changeLanguage(locale, (err, tr) => {
        if (err) {
          reject(err);
        }

        this.ea.publish("i18n:locale:changed", { oldValue: oldLocale, newValue: locale });
        this.signaler.signal("aurelia-translation-signal");
        resolve(tr);
      });
    });
  }

  public getLocale(): string {
    return this.i18next.language;
  }

  public nf(options?: Intl.NumberFormatOptions, locales?: string | string[]): any {
    return new this.Intl.NumberFormat(locales || this.getLocale(), options || {});
  }

  public uf(numberLike: string, locale?: string): number {
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

  public df(options?: Intl.DateTimeFormatOptions, locales?: string | string[]): any {
    return new this.Intl.DateTimeFormat(locales || this.getLocale(), options);
  }

  public tr(key: string | string[], options?: i18next.TranslationOptions<object>): string {
    let fullOptions = this.globalVars;

    if (options !== undefined) {
      fullOptions = Object.assign(Object.assign({}, this.globalVars), options);
    }

    return this.i18next.t(key, fullOptions);
  }

  public registerGlobalVariable(key: string, value: any): void {
    this.globalVars[key] = value;
  }

  public unregisterGlobalVariable(key: string): void {
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
  public updateTranslations(el: HTMLElement): void {
    if (!el || !el.querySelectorAll) {
      return;
    }

    let i;
    let l;

    // create a selector from the specified attributes to look for
    // var selector = [].concat(this.i18next.options.attributes);
    const attributes = this.i18next.options.attributes!;
    let selector = [].concat(attributes as any) as any;
    for (i = 0, l = selector.length; i < l; i++) { selector[i] = "[" + selector[i] + "]"; }
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

        if (keys) { break; }
      }
      // skip if nothing was found
      if (!keys) { continue; }

      // split the keys into multiple keys separated by a ;
      this.updateValue(node, keys, params);
    }
  }

  public updateValue(node: Element & { au: any }, value: string, params: any) {
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
      if (node.nodeName === "IMG") { attr = "src"; }

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

        if (!(node as any)._textContent) { (node as any)._textContent = node.textContent; }
        if (!(node as any)._innerHTML) { (node as any)._innerHTML = node.innerHTML; }

        // convert to camelCase
        // tslint:disable-next-line:only-arrow-functions
        const attrCC = attr.replace(/-([a-z])/g, function(g) { return g[1].toUpperCase(); });
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
            if ((node as any)._newChild && (node as any)._newChild.parentNode === node) {
              node.removeChild((node as any)._newChild);
            }

            (node as any)._newChild = newChild;
            while (node.firstChild) {
              node.removeChild(node.firstChild);
            }
            node.appendChild((node as any)._newChild);
            break;
          case "prepend":
            const prependParser = DOM.createElement("div");
            prependParser.innerHTML = this.tr(key, params);
            for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
              if ((node.childNodes[ni] as any)._prepended) {
                node.removeChild(node.childNodes[ni]);
              }
            }

            for (let pi = prependParser.childNodes.length - 1; pi >= 0; pi--) {
              (prependParser.childNodes[pi] as any)._prepended = true;
              if (node.firstChild) {
                node.insertBefore(prependParser.childNodes[pi], node.firstChild);
              } else {
                node.appendChild(prependParser.childNodes[pi]);
              }
            }
            break;
          case "append":
            const appendParser = DOM.createElement("div");
            appendParser.innerHTML = this.tr(key, params);
            for (let ni = node.childNodes.length - 1; ni >= 0; ni--) {
              if ((node.childNodes[ni] as any)._appended) {
                node.removeChild(node.childNodes[ni]);
              }
            }

            while (appendParser.firstChild) {
              (appendParser.firstChild as any)._appended = true;
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
            } else {
              node.setAttribute(attr, this.tr(key, params));
            }

            break;
        }
      }
    }
  }
}
