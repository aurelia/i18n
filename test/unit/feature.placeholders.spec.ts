import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";

describe("feature verification placeholders", () => {
  let sut: I18N;

  beforeEach( () => {
    const resources = {
      en: {
        translation: {
          demo: "{{framework}} is the {{quality}} framework in the world",
          curlies: "using curlies is {difficulty}",
          es6interpolation: "you can use ${type} as well"
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

  it("should replace all given variables and return translation", () => {
    expect(sut.tr("demo", {
      framework: "Aurelia",
      quality: "best"
    })).toEqual("Aurelia is the best framework in the world");
  });

  it("should use single-curly variable handles", () => {
    const options = { difficulty: "easy", interpolation: { prefix: "{", suffix: "}" }};

    expect(sut.tr("curlies", options)).toBe("using curlies is easy");
  });

  it("should use es6 interpolation variable handles", () => {
    const options = { type: "interpolation", interpolation: { prefix: "${", suffix: "}" }};

    expect(sut.tr("es6interpolation", options)).toBe("you can use interpolation as well");
  });
});
