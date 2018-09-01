System.register(["aurelia-event-aggregator", "aurelia-templating", "aurelia-templating-resources", "aurelia-pal", "./i18n", "./relativeTime", "./aurelia-i18n-loader", "./df", "./nf", "./rt", "./t"], function (exports_1, context_1) {
    "use strict";
    var aurelia_event_aggregator_1, aurelia_templating_1, aurelia_templating_resources_1, aurelia_pal_1, i18n_1;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    var exportedNames_1 = {
        "configure": true,
        "DfValueConverter": true,
        "DfBindingBehavior": true,
        "NfValueConverter": true,
        "NfBindingBehavior": true,
        "RtValueConverter": true,
        "RtBindingBehavior": true,
        "TValueConverter": true,
        "TBindingBehavior": true,
        "TCustomAttribute": true,
        "TParamsCustomAttribute": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (aurelia_event_aggregator_1_1) {
                aurelia_event_aggregator_1 = aurelia_event_aggregator_1_1;
            },
            function (aurelia_templating_1_1) {
                aurelia_templating_1 = aurelia_templating_1_1;
            },
            function (aurelia_templating_resources_1_1) {
                aurelia_templating_resources_1 = aurelia_templating_resources_1_1;
            },
            function (aurelia_pal_1_1) {
                aurelia_pal_1 = aurelia_pal_1_1;
            },
            function (i18n_1_1) {
                i18n_1 = i18n_1_1;
                exportStar_1(i18n_1_1);
            },
            function (relativeTime_1_1) {
                exportStar_1(relativeTime_1_1);
            },
            function (aurelia_i18n_loader_1_1) {
                exportStar_1(aurelia_i18n_loader_1_1);
            },
            function (df_1_1) {
                exports_1({
                    "DfValueConverter": df_1_1["DfValueConverter"],
                    "DfBindingBehavior": df_1_1["DfBindingBehavior"]
                });
            },
            function (nf_1_1) {
                exports_1({
                    "NfValueConverter": nf_1_1["NfValueConverter"],
                    "NfBindingBehavior": nf_1_1["NfBindingBehavior"]
                });
            },
            function (rt_1_1) {
                exports_1({
                    "RtValueConverter": rt_1_1["RtValueConverter"],
                    "RtBindingBehavior": rt_1_1["RtBindingBehavior"]
                });
            },
            function (t_1_1) {
                exports_1({
                    "TValueConverter": t_1_1["TValueConverter"],
                    "TBindingBehavior": t_1_1["TBindingBehavior"],
                    "TCustomAttribute": t_1_1["TCustomAttribute"],
                    "TParamsCustomAttribute": t_1_1["TParamsCustomAttribute"]
                });
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=aurelia-i18n.js.map