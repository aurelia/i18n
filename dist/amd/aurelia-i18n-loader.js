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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
            this.options = Object.assign({}, options, {
                loadPath: "/locales/{{lng}}/{{ns}}.json",
                addPath: "locales/add/{{lng}}/{{ns}}",
                allowMultiLoading: false,
                parse: JSON.parse
            });
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
    exports.Backend = Backend;
    exports.default = Backend;
});
//# sourceMappingURL=aurelia-i18n-loader.js.map