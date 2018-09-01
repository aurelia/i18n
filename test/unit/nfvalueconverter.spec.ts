import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { NfValueConverter } from "../../src/nf/nf-value-converter";
import { EventAggregator } from "aurelia-event-aggregator";

describe("nfvalueconverter tests", () => {
  let sut: I18N;
  let nfvc: NfValueConverter;

  beforeEach(() => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    nfvc = new NfValueConverter(sut);

    sut.setup({
      lng: "en",
      fallbackLng: "en",
      debug: false
    });
  });

  it("should display number in the setup locale format by default", () => {
    const testNumber = 123456.789;

    expect(nfvc.toView(testNumber)).toEqual("123,456.789");
  });

  it("should display number in the previously modified locale", async () => {
    const testNumber = 123456.789;

    await sut.setLocale("de");

    expect(nfvc.toView(testNumber)).toEqual("123.456,789");
  });

  it("should return undefined if undefined value given", () => {
    const val = undefined;

    expect(nfvc.toView(val)).toBe(undefined);
  });

  it("should return null if null value given", () => {
    const val = null;

    expect(nfvc.toView(val)).toBe(null);
  });

  it("should return empty string if empty string value given", () => {
    const val = "";

    expect(nfvc.toView(val)).toBe("");
  });

  it("should display number as currency", () => {
    const testNumber = 123456.789;

    expect(nfvc.toView(testNumber, { style: "currency", currency: "JPY" }, "de")).toBe("123.457 ¥");
  });
});
