import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { bootstrapTestEnvironment } from "./staging-helpers";

describe("t-attribute", () => {
  it("should convert bound integers to strings", (done) => {
    const target = "test-target";
    const expectedValue = "Foobar";
    const component = StageComponent
      .withResources("mocks/rt-vm")
      .inView(`<div t.bind="integer" id=${target}></div>`)
      .boundTo({ integer: 1 });

    bootstrapTestEnvironment(component, {
      resources: {
        en: { translation: { 1: expectedValue } }
      }
    });

    component.create(bootstrap)
      .then(() => {
        const elem = document.getElementById(target);
        expect(elem).not.toBeNull();
        expect(elem!.innerHTML).toBe(expectedValue);

        component.dispose();
        done();
      });
  });
});
