import { I18N } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";
import Intl from "intl";
import "intl/locale-data/complete";

describe("numberformat tests", () => {
  let sut: I18N;

  beforeEach(() => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    sut.setup({
      lng: "en",
      fallbackLng: "en",
      debug: false
    });
  });

  it("should display number in the setup locale format by default", () => {
    const nf = sut.nf();
    const testNumber = 123456.789;

    const result = nf.format(testNumber);
    expect(result).toEqual("123,456.789");
  });

  it("should display number in the previously modified locale", async () => {
    const testNumber = 123456.789;

    await sut.setLocale("de");
    const nf = sut.nf();

    expect(nf.format(testNumber)).toEqual("123.456,789");
  });

  it("should display number as currency", () => {
    const nf = sut.nf({ style: "currency", currency: "EUR" }, "de");
    const testNumber = 123456.789;

    expect(nf.format(testNumber)).toBe("123.456,79 €");
  });

  describe("unformating numbers", () => {
    beforeEach(async () => {
      sut = new I18N(new EventAggregator(), new BindingSignaler());
      await sut.setup({
        resources: {},
        lng: "en",
        fallbackLng: "en",
        debug: false
      });

      await sut.setLocale("en");
      (window as any).Intl.NumberFormat = Intl.NumberFormat;
      sut.Intl.NumberFormat = Intl.NumberFormat;
    });

    it("should keep the decimal separator", () => {
      const sample = "1,234,567.89";
      const result = sut.uf(sample);

      expect(result).toBe(1234567.89);
    });

    it("should respect provided locale", () => {
      const sample = "1.234.567,89";
      const result = sut.uf(sample, "de");

      expect(result).toBe(1234567.89);
    });

    it("should remove currency symbols", () => {
      const sample = "$ 1,234.56";
      const result = sut.uf(sample);

      expect(result).toBe(1234.56);
    });

    it("should remove all non numeric symbols", () => {
      const sample = "1,234.56 m/s";
      const result = sut.uf(sample);

      expect(result).toBe(1234.56);
    });

    it("should respect negative values", () => {
      const sample = "-1,234.56";
      const result = sut.uf(sample);

      expect(result).toBe(-1234.56);
    });
  });
});
