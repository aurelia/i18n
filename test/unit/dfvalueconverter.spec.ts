import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { DfValueConverter } from "../../src/df/df-value-converter";
import { EventAggregator } from "aurelia-event-aggregator";
import { DateTimeFormatOptions } from "intl";

describe("dfvalueconverter tests", () => {
  let sut: I18N;
  let dfvc: DfValueConverter;

  beforeEach(async () => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    dfvc = new DfValueConverter(sut);

    sut.i18next = await sut.setup({
      lng: "en",
      fallbackLng: "en",
      debug: false
    });
  });

  it("should display only the date in the setup locale format by default", () => {
    const testDate = new Date(2000, 0, 1, 0, 0, 1);

    expect(dfvc.toView(testDate)).toEqual("1/1/2000");
  });

  it("should display date in the previously modified locale", async () => {
    const testDate = new Date(2000, 0, 1, 0, 0, 1);

    await sut.setLocale("de");

    expect(dfvc.toView(testDate)).toEqual("1.1.2000");
  });

  it("should display datetime", () => {
    const options: DateTimeFormatOptions = {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false
    };
    const testDate = new Date(2000, 0, 1, 0, 0, 1);

    expect(dfvc.toView(testDate, options, "de")).toEqual("01.01.2000, 00:00:01");
  });

  it("should return undefined if undefined value given", () => {
    const val = undefined;

    expect(dfvc.toView(val)).toBeUndefined();
  });

  it("should return null if null value given", () => {
    const val = null;

    expect(dfvc.toView(val)).toBeNull();
  });

  it("should return empty string if empty string value given", () => {
    const val = "";

    expect(dfvc.toView(val)).toBe("");
  });

  it("should return 0 as begin of unix timestamp", async () => {
    const val = 0;

    await sut.setLocale("de");

    expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("1.1.1970");
  });

  it("should return \"0\" as begin of unix timestamp", async () => {
    const val = "0";

    await sut.setLocale("de");

    expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("1.1.1970");
  });

  it("should return formated string if ISO8601 datetime string value given UTC+Offset time AU", async () => {
    const val = "2016-09-05T23:36:00+12:00";

    await sut.setLocale("en-AU");

    expect(dfvc.toView(val)).toBe("5/9/16");
  });

  it("should return formated string if ISO8601 datetime string value given UTC time AU", async () => {
    const val = "2016-09-05T23:36:00Z";

    await sut.setLocale("en-AU");

    expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("5/9/16");
  });

  it("should return formated string if ISO8601 date string value given LOCAL time AU", async () => {
    const val = "2016-09-05";
    const options: DateTimeFormatOptions = {
      year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC"
    };

    await sut.setLocale("en-AU");

    expect(dfvc.toView(val, options)).toBe("05/09/2016");
  });

  it("should return formated string if ISO8601 date string value given LOCAL time DE", async () => {
    const val = "2016-09-05";

    await sut.setLocale("de");

    expect(dfvc.toView(val, { timeZone: "UTC" })).toBe("5.9.2016");
  });
});
