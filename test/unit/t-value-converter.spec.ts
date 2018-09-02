import { StageComponent } from "aurelia-testing";
import { bootstrap } from "aurelia-bootstrapper";

import { bootstrapTestEnvironment } from "./staging-helpers";
import { TValueConverter } from "../../src/t";
import { I18N } from "../../src/i18n";

const resources = {
  en: {
    translation: {
      score: "Score: {{score}}",
      lives: "{{count}} life remaining",
      lives_plural: "{{count}} lives remaining",
      friend: "A friend",
      friend_male: "A boyfriend",
      friend_female: "A girlfriend"
    }
  }
};

async function createTestComponent(view: string, vm: {}) {
  const target = "test-target";
  const component = StageComponent
    .withResources("mocks/rt-vm")
    .inView(`<div id=${target}>${view}</div>`)
    .boundTo(vm);

  bootstrapTestEnvironment(component, { resources });

  await component.create(bootstrap);

  const elem = document.getElementById(target);

  return { component, elem };
}

describe("TValueConverter", () => {
  it("should call underlying service tr function", () => {
    const serviceInstance = { tr: jest.fn() } as any as I18N;
    const tVc = new TValueConverter(serviceInstance);

    tVc.toView("foobar");

    expect(serviceInstance.tr).toHaveBeenCalled();
  });

  it("should translate using a provided variable", async () => {
    const expectedValue = 1;
    const { component, elem } = await createTestComponent(
      "${ 'score' | t: {'score': userScore}}",
      { userScore: expectedValue }
    );

    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe(
      resources.en.translation.score.replace("{{score}}", expectedValue.toString())
    );

    component.dispose();
  });

  it("should do singular translation", async () => {
    const expectedValue = 1;
    const { component, elem } = await createTestComponent(
      `\${ 'lives' | t: { 'count': ${expectedValue} } }`,
      {}
    );

    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe(
      resources.en.translation.lives.replace("{{count}}", expectedValue.toString())
    );

    component.dispose();
  });

  it("should do plural translation", async () => {
    const expectedValue = 2;
    const { component, elem } = await createTestComponent(
      `\${ 'lives' | t: { 'count': ${expectedValue} } }`,
      {}
    );

    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe(
      resources.en.translation.lives_plural.replace("{{count}}", expectedValue.toString())
    );

    component.dispose();
  });

  it("should do translation with context", async () => {
    const { component, elem } = await createTestComponent(
      `\${ 'friend' | t: { 'context': 'female' } }`,
      {}
    );

    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe(
      resources.en.translation.friend_female
    );

    component.dispose();
  });
});
