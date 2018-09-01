import { EventAggregator } from "aurelia-event-aggregator";
import { ViewResources } from "aurelia-templating";
import { BindingSignaler } from "aurelia-templating-resources";
import { PLATFORM } from "aurelia-pal";
import { I18N } from "./i18n";
export * from "./i18n";
export * from "./relativeTime";
export * from "./aurelia-i18n-loader";
export { DfValueConverter, DfBindingBehavior } from "./df";
export { NfValueConverter, NfBindingBehavior } from "./nf";
export { RtValueConverter, RtBindingBehavior } from "./rt";
export { TValueConverter, TBindingBehavior, TCustomAttribute, TParamsCustomAttribute } from "./t";
export function configure(frameworkConfig, cb) {
    if (cb === undefined || typeof cb !== "function") {
        var errorMsg = "You need to provide a callback method to properly configure the library";
        throw errorMsg;
    }
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./t/t-value-converter"),
        PLATFORM.moduleName("./t/t-custom-attribute"),
        PLATFORM.moduleName("./t/t-params-custom-attribute"),
        PLATFORM.moduleName("./t/t-binding-behavior")
    ]);
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./nf/nf-value-converter"),
        PLATFORM.moduleName("./nf/nf-binding-behavior")
    ]);
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./df/df-value-converter"),
        PLATFORM.moduleName("./df/df-binding-behavior")
    ]);
    frameworkConfig.globalResources([
        PLATFORM.moduleName("./rt/rt-value-converter"),
        PLATFORM.moduleName("./rt/rt-binding-behavior")
    ]);
    var instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(BindingSignaler));
    frameworkConfig.container.registerInstance(I18N, instance);
    var ret = cb(instance);
    frameworkConfig.postTask(function () {
        var resources = frameworkConfig.container.get(ViewResources);
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
//# sourceMappingURL=aurelia-i18n.js.map