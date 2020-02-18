import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { bootstrapTestEnvironment } from "./staging-helpers";

describe("t-attribute", () => {
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

  it("should convert bound integers to strings", async () => {
    const expectedValue = "";
    const component = StageComponent
      .withResources("mocks/rt-vm")
      .inView(`<p t.bind="undef" id="undefined">
        Undefined value
      </p>
      <p t.bind="nullul" id="null">
        Null value
      </p>
      <p t.bind="zero" id="zero">
        Zero value
      </p>`)
      .boundTo({
        undef: undefined,
        nullul: null,
        zero: 0
      });

    bootstrapTestEnvironment(component, {
      resources: {
        en: { translation: { 1: expectedValue } }
      }
    });

    await component.create(bootstrap);

    expect(document.getElementById("undefined")!.innerHTML).toBe("");
    expect(document.getElementById("null")!.innerHTML).toBe("");
    expect(document.getElementById("zero")!.innerHTML).toBe("0");

    component.dispose();
  });
});
