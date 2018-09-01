"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_event_aggregator_1 = require("aurelia-event-aggregator");
var aurelia_templating_1 = require("aurelia-templating");
var aurelia_templating_resources_1 = require("aurelia-templating-resources");
var aurelia_pal_1 = require("aurelia-pal");
var i18n_1 = require("./i18n");
__export(require("./i18n"));
__export(require("./relativeTime"));
__export(require("./aurelia-i18n-loader"));
var df_1 = require("./df");
exports.DfValueConverter = df_1.DfValueConverter;
exports.DfBindingBehavior = df_1.DfBindingBehavior;
var nf_1 = require("./nf");
exports.NfValueConverter = nf_1.NfValueConverter;
exports.NfBindingBehavior = nf_1.NfBindingBehavior;
var rt_1 = require("./rt");
exports.RtValueConverter = rt_1.RtValueConverter;
exports.RtBindingBehavior = rt_1.RtBindingBehavior;
var t_1 = require("./t");
exports.TValueConverter = t_1.TValueConverter;
exports.TBindingBehavior = t_1.TBindingBehavior;
exports.TCustomAttribute = t_1.TCustomAttribute;
exports.TParamsCustomAttribute = t_1.TParamsCustomAttribute;
function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== "function") {
        var errorMsg = "You need to provide a callback method to properly configure the library";
        throw errorMsg;
    }
    frameworkConfig.globalResources([
        aurelia_pal_1.PLATFORM.moduleName("./t/t-value-converter"),
        aurelia_pal_1.PLATFORM.moduleName("./t/t-custom-attribute"),
        aurelia_pal_1.PLATFORM.moduleName("./t/t-params-custom-attribute"),
        aurelia_pal_1.PLATFORM.moduleName("./t/t-binding-behavior")
    ]);
    frameworkConfig.globalResources([
        aurelia_pal_1.PLATFORM.moduleName("./nf/nf-value-converter"),
        aurelia_pal_1.PLATFORM.moduleName("./nf/nf-binding-behavior")
    ]);
    frameworkConfig.globalResources([
        aurelia_pal_1.PLATFORM.moduleName("./df/df-value-converter"),
        aurelia_pal_1.PLATFORM.moduleName("./df/df-binding-behavior")
    ]);
    frameworkConfig.globalResources([
        aurelia_pal_1.PLATFORM.moduleName("./rt/rt-value-converter"),
        aurelia_pal_1.PLATFORM.moduleName("./rt/rt-binding-behavior")
    ]);
    var instance = new i18n_1.I18N(frameworkConfig.container.get(aurelia_event_aggregator_1.EventAggregator), frameworkConfig.container.get(aurelia_templating_resources_1.BindingSignaler));
    frameworkConfig.container.registerInstance(i18n_1.I18N, instance);
    var ret = cb(instance);
    frameworkConfig.postTask(function () {
        var resources = frameworkConfig.container.get(aurelia_templating_1.ViewResources);
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
//# sourceMappingURL=aurelia-i18n.js.map