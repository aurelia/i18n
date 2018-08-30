import { I18N, I18NEventPayload } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";

describe("testing i18n translations", () => {
  let sut: I18N;

  beforeEach( () => {
    const resources = {
      en: {
        translation: {
          score: "Score: {{score}}",
          lives: "{{count}} life remaining",
          lives_plural: "{{count}} lives remaining",
          lives_indefinite: "a life remaining",
          lives_plural_indefinite: "some lives remaining",
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
          lives_indefinite: "ein Lebenspunkt übrig",
          lives_plural_indefinite: "einige Lebenspunkte übrig",
          friend: "Ein Freund",
          friend_male: "Ein Freund",
          friend_female: "Eine Freundin",
          statement: "{{brand}} ist ein JavaScript client framework der nächsten Generation",
          novar: "{{notexisting}} sollte mit einem Leerstring ersetzt werden"
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

  it("should translate a simple key without options", () => {
    expect(sut.tr("friend", { count: 0 })).toEqual("A friend");
  });

  it("should replace a not provided variable with an empty string", () => {
    expect(sut.tr("novar")).toEqual(" should be replaced with an empty string");
  });

  it("should properly switch locales", (done) => {
    expect(sut.getLocale()).toBe("en");

    sut.setLocale("de").then( () => {
      expect(sut.getLocale()).toBe("de");
      expect(sut.tr("friend", { count: 0 })).toEqual("Ein Freund");
      done();
    });
  });

  it("should pass on provided options", () => {
    expect(sut.i18next.options.debug).toBe(false);
    expect(sut.i18next.options.fallbackLng).toEqual(["en"]);
  });

  it("should map complex object", () => {
    const options = {
      threshold: {
        min: 1,
        max: 10
      },
      field: "Age"
    };

    expect(sut.tr("complex", options)).toEqual("Age should be between 1 and 10");
  });

  it("should support nested translations", () => {
    expect(sut.tr("nested_referencing", { count: 1, round: 1 })).toEqual("1 life remaining in round 1");
  });

  it("should automatically add global variables as options if none provided", () => {
    sut.registerGlobalVariable("brand", "Aurelia");

    expect(sut.tr("statement")).toEqual("Aurelia is a next next gen JavaScript client framework");
  });

  it("should prefer passed in options vs. global variables", () => {
    sut.registerGlobalVariable("brand", "Aurelia");

    expect(sut.tr("statement", {
      brand: "Aurelia.io"
    })).toEqual("Aurelia.io is a next next gen JavaScript client framework");
  });

  it("should allow unregistering of global variables", () => {
    sut.registerGlobalVariable("brand", "Aurelia");
    expect(sut.tr("statement")).toEqual("Aurelia is a next next gen JavaScript client framework");

    sut.unregisterGlobalVariable("brand");
    expect(sut.tr("statement")).toEqual(" is a next next gen JavaScript client framework");
  });

  it("should rewrite undefined options with empty string", () => {
    expect(sut.tr("nested_referencing", { count: 1, round: undefined })).toEqual("1 life remaining in round ");
  });

  it("should trigger an event when switching locales", (done) => {
    const subscription = (sut as any).ea.subscribe("i18n:locale:changed", (payload: I18NEventPayload) => {
      subscription.dispose();

      expect(payload.oldValue).toBe("en");
      expect(payload.newValue).toBe("de");
      done();
    });

    sut.setLocale("de");
  });

  it("should handle undefined elements during translation updates", () => {
    expect(() => { (sut.updateTranslations as any)(); }).not.toThrow();
  });

  it("should not process comment nodes during translation updates", () => {
    const comment = document.createComment("A DEMO COMMENT");
    expect(() => { sut.updateTranslations(comment as any); }).not.toThrow();
  });
});
