import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { DfValueConverter } from "../../src/df";
import { EventAggregator } from "aurelia-event-aggregator";

describe("dfvalueconverter tests", () => {
  let sut: I18N;
  let dfvc: DfValueConverter;

  beforeEach(async () => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    dfvc = new DfValueConverter(sut);

    sut.i18next = await sut.setup({
      resources: {
        en: {
          translation: {
            lives: "__count__ life remaining",
            lives_plural: "__count__ lives remaining",
            lives_indefinite: "a life remaining",
            lives_plural_indefinite: "some lives remaining"
          }
        }
      },
      lng: "en",
      fallbackLng: "en",
      debug: false
    });
  });

  it("should display only the date in the setup locale format by default", () => {
    const testDate = new Date(2000, 0, 1, 0, 0, 1);

    expect(dfvc.toView(testDate)).toEqual("1/1/2000");
  });

  it("should display date in the previously modified locale", (done) => {
    sut.setLocale("de").then(() => {
      const testDate = new Date(2000, 0, 1, 0, 0, 1);
      expect(dfvc.toView(testDate)).toEqual("1.1.2000");
      done();
    });
  });

  it("should display datetime", () => {
    const options = {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false
    };
    const testDate = new Date(2000, 0, 1, 0, 0, 1);
    expect(dfvc.toView(testDate, options, "de")).toEqual("01.01.2000, 00:00:01");
  });

  it("should return undefined if undefined value given", () => {
    const val = undefined;
    expect(dfvc.toView(val)).toBe(undefined);
  });

  it("should return null if null value given", () => {
    const val = null;
    expect(dfvc.toView(val)).toBe(null);
  });

  it("should return empty string if empty string value given", () => {
    const val = "";
    expect(dfvc.toView(val)).toBe("");
  });

  it("should return 0 as begin of unix timestamp", (done) => {
    const val = 0;
    sut.setLocale("de").then(() => {
      expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("1.1.1970");
      done();
    });
  });

  it("should return \"0\" as begin of unix timestamp", (done) => {
    const val = "0";
    sut.setLocale("de").then(() => {
      expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("1.1.1970");
      done();
    });
  });

  it("should return formated string if ISO8601 datetime string value given UTC+Offset time AU", (done) => {
    const val = "2016-09-05T23:36:00+12:00";
    sut.setLocale("en-AU").then(() => {
      expect(dfvc.toView(val)).toBe("5/9/16");
      done();
    });
  });

  it("should return formated string if ISO8601 datetime string value given UTC time AU", (done) => {
    const val = "2016-09-05T23:36:00Z";
    sut.setLocale("en-AU").then(() => {
      expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("5/9/16");
      done();
    });
  });

  it("should return formated string if ISO8601 date string value given LOCAL time AU", (done) => {
    const val = "2016-09-05";
    const options = {
      year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC"
    };
    sut.setLocale("en-AU").then(() => {
      expect(dfvc.toView(val, options)).toBe("05/09/2016");
      done();
    });
  });

  it("should return formated string if ISO8601 date string value given LOCAL time DE", (done) => {
    const val = "2016-09-05";
    sut.setLocale("de").then(() => {
      expect(dfvc.toView(val, { timeZone: "UTC"})).toBe("5.9.2016");
      done();
    });
  });
});
