import "aurelia-polyfills";
import { Options } from "aurelia-loader-nodejs";
import { globalize } from "aurelia-pal-nodejs";
import IntlPolyfill from "intl";
import * as path from "path";

Options.relativeToDir = path.join(__dirname, "unit");
globalize();
//global.Intl = IntlPolyfill;
//(window as any).Intl = IntlPolyfill;
global.Intl.NumberFormat   = IntlPolyfill.NumberFormat;
global.Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
(window as any).Intl = global.Intl;

(window as any).Intl.NumberFormat   = IntlPolyfill.NumberFormat;
(window as any).Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
