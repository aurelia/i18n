import { FrameworkConfiguration } from "aurelia-framework";
import { EventAggregator } from "aurelia-event-aggregator";
import { ViewResources } from "aurelia-templating";
import { BindingSignaler } from "aurelia-templating-resources";
import { PLATFORM } from "aurelia-pal";

import { I18N, AureliaEnhancedI18Next } from "./i18n";
import { i18n } from "i18next";

export * from "./i18n";
export { RelativeTime } from "./relativeTime";
export {
  DfValueConverter,
  DfBindingBehavior
} from "./df";
export {
  NfValueConverter,
  NfBindingBehavior
} from "./nf";
export {
  RtValueConverter,
  RtBindingBehavior
} from "./rt";
export {
  TValueConverter,
  TBindingBehavior,
  TCustomAttribute,
  TParamsCustomAttribute
} from "./t";
export { Backend } from "./aurelia-i18n-loader";

export function configure(frameworkConfig: FrameworkConfiguration, cb: (instance: I18N) => AureliaEnhancedI18Next & i18n) {
  if (cb === undefined || typeof cb !== "function") {
    let errorMsg = "You need to provide a callback method to properly configure the library";
    throw errorMsg;
  }

  frameworkConfig.globalResources([
    PLATFORM.moduleName("./t/t-binding-behavior"),
    PLATFORM.moduleName("./t/t-custom-attribute"),
    PLATFORM.moduleName("./t/t-params-custom-attribute"),
    PLATFORM.moduleName("./t/t-value-converter")
  ]);
  frameworkConfig.globalResources(PLATFORM.moduleName("./nf"));
  frameworkConfig.globalResources(PLATFORM.moduleName("./df"));
  frameworkConfig.globalResources(PLATFORM.moduleName("./rt"));

  let instance = new I18N(frameworkConfig.container.get(EventAggregator), frameworkConfig.container.get(BindingSignaler));
  frameworkConfig.container.registerInstance(I18N, instance);

  let ret = cb(instance);

  frameworkConfig.postTask(() => {
    let resources = frameworkConfig.container.get(ViewResources);
    let htmlBehaviorResource = resources.getAttribute("t");
    let htmlParamsResource = resources.getAttribute("t-params");
    let attributes = instance.i18next.options.attributes as string[];

    // Register default attributes if none provided
    if (!attributes) {
      attributes = ["t", "i18n"];
    }

    attributes.forEach((alias) => resources.registerAttribute(alias, htmlBehaviorResource, "t"));
    attributes.forEach((alias) => resources.registerAttribute(alias + "-params", htmlParamsResource, "t-params"));
  });

  return ret;
}
