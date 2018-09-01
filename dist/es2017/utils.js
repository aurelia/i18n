var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LazyOptional_1;
import { resolver } from "aurelia-dependency-injection";
export let extend = (destination, source) => {
    // tslint:disable-next-line:forin
    for (const property in source) {
        destination[property] = source[property];
    }
    return destination;
};
// tslint:disable-next-line:only-arrow-functions
export const isInteger = Number.isInteger || function (value) {
    return typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value;
};
export let assignObjectToKeys = (root, obj) => {
    if (obj === undefined || obj === null) {
        return obj;
    }
    const opts = {};
    Object.keys(obj).map((key) => {
        if (typeof obj[key] === "object") {
            extend(opts, assignObjectToKeys(key, obj[key]));
        }
        else {
            opts[root !== "" ? root + "." + key : key] = obj[key];
        }
    });
    return opts;
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
    resolver()
], LazyOptional);
export { LazyOptional };
//# sourceMappingURL=utils.js.map