import { Aurelia } from "aurelia-framework";
import { ComponentTester } from "aurelia-testing";
import { configure as configureTemplatingBinding } from "aurelia-templating-binding";
import { configure as configureTemplatingResources } from "aurelia-templating-resources";

import { Backend } from "../../src/aurelia-i18n-loader";
import {
  AureliaEnhancedOptions,
  I18N
} from "../../src/i18n";

export function bootstrapTestEnvironment(
  component: ComponentTester<any>,
  config?: AureliaEnhancedOptions
) {

  component.bootstrap((aurelia: Aurelia) => {
    return aurelia.use
      .standardConfiguration()
      .plugin(configureTemplatingBinding)
      .plugin(configureTemplatingResources)
      .feature("src", (instance: I18N) => {
        const aliases = ["t", "i18n"];

        // register backend plugin
        instance.i18next.use(Backend.with(aurelia.loader));

        return instance.setup(Object.assign({
          backend: {                                  // <-- configure backend settings
            loadPath: "./fixtures/locales/{{lng}}/{{ns}}.json", // <-- XHR settings for where to get the files from
          },
          interpolation: {
            prefix: "{{",
            suffix: "}}",
          },
          attributes: aliases,
          lng: "en",
          defaultNS: "translation",
          fallbackLng: "en",
          debug: false,
        }, config));
      });
  });
}
