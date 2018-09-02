import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";

describe("feature verification pluralization", () => {
  let sut: I18N;

  beforeEach( () => {
    const resources = {
      en: {
        translation: {
          lives: "{{count}} life remaining",
          lives_plural: "{{count}} lives remaining"
        }
      }
    };

    sut = new I18N(new EventAggregator(), new BindingSignaler());
    sut.setup({
      resources,
      lng: "en",
      fallbackLng: "en",
      debug: false
    });
  });

  it("should return singular translation", () => {
    expect(sut.tr("lives", { count: 1 })).toEqual("1 life remaining");
  });

  it("should return plural translation", () => {
    expect(sut.tr("lives", { count: 2 })).toEqual("2 lives remaining");
  });

  it("should return same key if no plural is defined", () => {
    expect(sut.tr("wrongtest", { count: 2 })).toContain("wrongtest");
  });
});
