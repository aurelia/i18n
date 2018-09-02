import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { bootstrapTestEnvironment } from "./staging-helpers";
import { TValueConverter } from "../../src/t";
import { I18N } from "../../src/i18n";

describe("t-attribute", () => {
  it("should call underlying service tr function", () => {
    const serviceInstance = { tr: jest.fn() } as any as I18N;
    const tVc = new TValueConverter(serviceInstance);

    tVc.toView("foobar");

    expect(serviceInstance.tr).toHaveBeenCalled();
  });

  it("should convert bound integers to strings", async () => {
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

    await component.create(bootstrap);

    const elem = document.getElementById(target);
    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe(expectedValue);

    component.dispose();
  });
});
