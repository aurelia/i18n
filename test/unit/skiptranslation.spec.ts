import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { bootstrapTestEnvironment } from "./staging-helpers";

describe("staged tests", () => {
  it("should keep original value instead of fallback to key, when defined via options", (done) => {
    const target = "fallback-target";
    const component = StageComponent
      .withResources("mocks/rt-vm")
      .inView("<h5 id=" + target + " t=\"hello\">Hello!</h5>")
      .boundTo({ mydate: new Date() });

    bootstrapTestEnvironment(component, {
      resources: {
        en: {
          translation: {
            hello: undefined
          }
        }
      },
      skipTranslationOnMissingKey: true
    });

    component.create(bootstrap)
      .then(() => {
        const elem = document.getElementById(target);
        expect(elem).not.toBeNull();
        expect(elem!.innerHTML).toBe("Hello!");

        component.dispose();
        done();
      });
  });
});
