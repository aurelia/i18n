import { FrameworkConfiguration } from "aurelia-framework";
import { ViewResources } from "aurelia-templating";

import {
  I18N,
  AureliaEnhancedI18Next
} from "./i18n";
import { TValueConverter, TBindingBehavior, TCustomAttribute, TParamsCustomAttribute } from "./t";
import { NfValueConverter, NfBindingBehavior } from "./nf";
import { DfValueConverter, DfBindingBehavior } from "./df";
import { RtValueConverter, RtBindingBehavior } from "./rt";

export * from "./i18n";
export * from "./relativeTime";
export * from "./aurelia-i18n-loader";
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

export function configure(
  frameworkConfig: FrameworkConfiguration,
  cb: (instance: I18N) => AureliaEnhancedI18Next
) {
  if (typeof cb !== "function") {
    const errorMsg = "You need to provide a callback method to properly configure the library";
    throw errorMsg;
  }

  const instance: I18N = frameworkConfig.container.get(I18N);
  const ret = cb(instance);

  frameworkConfig.globalResources([
    TValueConverter,
    TBindingBehavior,
    TCustomAttribute,
    TParamsCustomAttribute,

    NfValueConverter,
    NfBindingBehavior,

    DfValueConverter,
    DfBindingBehavior,

    RtValueConverter,
    RtBindingBehavior
  ]);

  frameworkConfig.postTask(() => {
    const resources = frameworkConfig.container.get(ViewResources);
    const htmlBehaviorResource = resources.getAttribute("t");
    const htmlParamsResource = resources.getAttribute("t-params");
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
