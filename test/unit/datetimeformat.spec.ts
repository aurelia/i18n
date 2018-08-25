import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";

describe("datetimeformat tests", () => {
  let sut: I18N;

  beforeEach(async (done) => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    await sut.setup({
      resources: {
        en: {
          translation: {
            "lives": "__count__ life remaining",
            "lives_plural": "__count__ lives remaining",
            "lives_indefinite": "a life remaining",
            "lives_plural_indefinite": "some lives remaining"
          }
        }
      },
      lng: "en",
      fallbackLng: "en",
      debug: false
    })
    
    done();
  });

  it("should display only the date in the setup locale format by default", () => {
    const df = sut.df();
    const testDate = new Date(2000, 0, 1, 0, 0, 1);

    expect(df.format(testDate)).toEqual("1/1/2000");
  });

  it("should display date in the previously modified locale", async (done) => {
    await sut.i18nextReady();

    sut.setLocale("de").then(() => {
      const df = sut.df();
      const testDate = new Date(2000, 0, 1, 0, 0, 1);

      expect(df.format(testDate)).toEqual("1.1.2000");

      done();
    });
  });

  it("should display datetime", () => {
    const options = {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false
    };
    const df = sut.df(options, "de");
    const testDate = new Date(2000, 0, 1, 0, 0, 1);

    expect(df.format(testDate)).toEqual("01.01.2000, 00:00:01");
  });
});
