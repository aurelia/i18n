define(["require", "exports", "aurelia-event-aggregator", "aurelia-templating", "aurelia-templating-resources", "aurelia-pal", "./i18n", "./i18n", "./relativeTime", "./aurelia-i18n-loader", "./df", "./nf", "./rt", "./t"], function (require, exports, aurelia_event_aggregator_1, aurelia_templating_1, aurelia_templating_resources_1, aurelia_pal_1, i18n_1, i18n_2, relativeTime_1, aurelia_i18n_loader_1, df_1, nf_1, rt_1, t_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(i18n_2);
    __export(relativeTime_1);
    __export(aurelia_i18n_loader_1);
    exports.DfValueConverter = df_1.DfValueConverter;
    exports.DfBindingBehavior = df_1.DfBindingBehavior;
    exports.NfValueConverter = nf_1.NfValueConverter;
    exports.NfBindingBehavior = nf_1.NfBindingBehavior;
    exports.RtValueConverter = rt_1.RtValueConverter;
    exports.RtBindingBehavior = rt_1.RtBindingBehavior;
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
});
//# sourceMappingURL=aurelia-i18n.js.map