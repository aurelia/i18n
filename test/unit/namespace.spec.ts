import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";

import { I18N } from "../../src/i18n";
import { Resource } from "i18next";

describe("testing i18n namespaces", () => {
  let sut: I18N;
  let resources: Resource;

  beforeEach( () => {
    resources = {
      en: {
        translation: {
          score: "Score: {{score}}",
          lives: "{{count}} life remaining",
          lives_plural: "{{count}} lives remaining",
          friend: "A friend",
          friend_male: "A boyfriend",
          friend_female: "A girlfriend",
          complex: "{{field}} should be between {{threshold.min}} and {{threshold.max}}",
          nested_referencing: "$t(lives) in round {{round}}",
          statement: "{{brand}} is a next next gen JavaScript client framework",
          novar: "{{notexisting}} should be replaced with an empty string"
        }
      },
      de: {
        translation: {
          score: "Punktestand: {{score}}",
          lives: "{{count}} Lebenspunkt übrig",
          lives_plural: "{{count}} Lebenspunkte übrig",
          friend: "Ein Freund",
          friend_male: "Ein Freund",
          friend_female: "Eine Freundin",
          statement: "{{brand}} ist ein JavaScript client framework der nächsten Generation",
          novar: "{{notexisting}} sollte mit einem Leerstring ersetzt werden"
        }
      }
    };

    sut = new I18N(new EventAggregator(), new BindingSignaler());
  });

  it("should have translation as defaultNS", () => {
    sut.setup({
      resources,
      lng: "en",
      fallbackLng: "en",
      debug: false
    });

    expect(sut.i18next.options.defaultNS).toEqual(["translation"]);
  });

  it("should have customns as defaultNS", () => {
    sut.setup({
      resources,
      lng: "en",
      fallbackLng: "en",
      defaultNS: "customns",
      debug: false
    });

    expect(sut.i18next.options.defaultNS).toBe("customns");
  });
});
