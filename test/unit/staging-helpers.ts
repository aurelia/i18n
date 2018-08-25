import { Backend } from "../../src/aurelia-i18n-loader";
import { Aurelia } from "aurelia-framework";
import { AureliaEnhancedI18Next, I18N } from "../../src/i18n";
import { ComponentTester } from "aurelia-testing";
import { InitOptions } from "i18next";

export function bootstrapTestEnvironment(component: ComponentTester<any>, config: AureliaEnhancedI18Next & InitOptions) {
  component.bootstrap((aurelia: Aurelia) => {
    return aurelia.use
      .standardConfiguration()
      .feature("src", (instance: I18N) => {
        let aliases = ["t", "i18n"];

        // register backend plugin
        instance.i18next.use(Backend.with(aurelia.loader));


        return instance.setup(Object.assign({
          backend: {                                  // <-- configure backend settings
            loadPath: "./locales/{{lng}}/{{ns}}.json" // <-- XHR settings for where to get the files from
          },
          interpolation: {
            prefix: "{{",
            suffix: "}}"
          },
          attributes: aliases,
          lng: "en",
          defaultNS: "translation",
          fallbackLng: "en",
          debug: false
        }, config));
      });
  });
}
