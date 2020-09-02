import { bootstrap } from "aurelia-bootstrapper";
import { Container } from "aurelia-dependency-injection";
import { EventAggregator } from "aurelia-event-aggregator";
import { TaskQueue } from "aurelia-framework";
import { BindingSignaler } from "aurelia-templating-resources";
import { StageComponent } from "aurelia-testing";
import { translations } from "../../src/defaultTranslations/relative.time";
import { AureliaEnhancedOptions, I18N } from "../../src/i18n";
import { RelativeTime } from "../../src/relativeTime";
import { bootstrapTestEnvironment } from "./staging-helpers";

function modifiedDateFromNow(days: number, months: number, years: number) {
  const date = new Date();

  date.setDate(date.getDate() + days);
  date.setMonth(date.getMonth() + months);
  date.setFullYear(date.getFullYear() + years);

  return date;
}

describe("testing relative time support", () => {
  async function arrange(options?: AureliaEnhancedOptions) {
    const ea = new EventAggregator();
    const i18n = new I18N(ea, new BindingSignaler());
    await i18n.setup(Object.assign({
      lng: "en",
      debug: false,
      interpolation: {
        prefix: "__",
        suffix: "__"
      }
    }, options));

    const sut = new RelativeTime(i18n, ea);

    return { ea, i18n, sut };
  }

  it("should use the fallback language if no lng is provided", async () => {
    const { sut } = await arrange({ lng: undefined, fallbackLng: "en" });
    const expectedDate = new Date();

    expect(sut.getRelativeTime(expectedDate)).toBe("now");
  });

  it("should provide now unit", async () => {
    const { sut } = await arrange();
    const expectedDate = new Date();

    expect(sut.getRelativeTime(expectedDate)).toBe("now");
  });

  describe("ago tests", () => {
    it("should provide singular time unit", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setHours(new Date().getHours() - 1);

      expect(sut.getRelativeTime(expectedDate)).toBe("1 hour ago");
    });

    it("should provide plural time unit", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setHours(new Date().getHours() - 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("2 hours ago");
    });

    it("should provide month ranges", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setMonth(new Date().getMonth() - 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("2 months ago");
    });

    it("should provide year ranges", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setFullYear(new Date().getFullYear() - 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("2 years ago");
    });
  });

  describe("in tests", () => {
    it("should provide singular time unit", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setHours(new Date().getHours() + 1);

      expect(sut.getRelativeTime(expectedDate)).toBe("in 1 hour");
    });

    it("should provide plural time unit", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setHours(new Date().getHours() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("in 2 hours");
    });

    it("should provide month ranges", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setMonth(new Date().getMonth() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("in 2 months");
    });

    it("should provide year ranges", async () => {
      const { sut } = await arrange();
      const expectedDate = new Date();

      expectedDate.setFullYear(new Date().getFullYear() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("in 2 years");
    });
  });

  describe("test i18n support", () => {
    it("should provide the translation in German", async () => {
      const { sut } = await arrange({ lng: "de", fallbackLng: "de" });

      const expectedDate = new Date();
      expectedDate.setHours(new Date().getHours() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("in 2 Stunden");
    });

    it("should provide the translation in English when the locale is not present", async () => {
      const { i18n, sut } = await arrange({ lng: "en", fallbackLng: "en" });

      await i18n.setLocale("notPresent");

      const expectedDate = new Date();
      expectedDate.setHours(new Date().getHours() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe("in 2 hours");
    });
  });

  it("should try to find the language of the locale when the full locale is not found", async () => {
    const { i18n, sut } = await arrange({ lng: "en", fallbackLng: "en" });
    expect(translations["nl-BE"]).toBe(undefined); // If this fails, someone added translations for nl-BE

    await i18n.setLocale("nl-BE");
    const expectedDate = new Date();
    expectedDate.setHours(new Date().getHours() + 2);

    expect(sut.getRelativeTime(expectedDate)).toBe("over 2 uur");
  });

  it("should provide the translation for the full locale when available", async () => {
    const { i18n, sut } = await arrange({ lng: "en", fallbackLng: "en" });
    translations["nl-XX"] = {
      translation:
        { hour_in_plural: "in __count__ periods of an hourly length", hour_in: "in __count__ uur" }
    };

    await i18n.setLocale("nl-XX");
    const expectedDate = new Date();
    expectedDate.setHours(new Date().getHours() + 2);

    expect(sut.getRelativeTime(expectedDate)).toBe("in 2 periods of an hourly length");
  });

  it("should provide the translation for the base locale when a key is not found in the full locale", async () => {
    const { i18n, sut } = await arrange({ lng: "en", fallbackLng: "en" });
    translations["nl-XX"] = {
      translation: { hour_in_plural: "in __count__ periods of an hourly length", hour_in: "in __count__ uur" }
    };

    await i18n.setLocale("nl-XX");
    const expectedDate = new Date();
    expectedDate.setMinutes(new Date().getMinutes() + 2);

    expect(sut.getRelativeTime(expectedDate)).toBe("over 2 minuten");
  });

  it("should handle non-defined interpolation prefix and suffix", async () => {
    const { sut } = await arrange({
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        prefix: undefined,
        suffix: undefined
      }
    });

    const expectedDate = new Date();
    expectedDate.setHours(new Date().getHours() - 3);

    expect(sut.getRelativeTime(expectedDate)).toBe("3 hours ago");
  });

  it("should respect interpolation settings", async () => {
    const { sut } = await arrange({
      lng: "en",
      fallbackLng: "en",
      interpolation: {
        prefix: undefined,
        suffix: undefined
      }
    });
    const expectedDate = new Date();
    expectedDate.setHours(new Date().getHours() - 1);

    expect(sut.getRelativeTime(expectedDate)).toBe("1 hour ago");
  });

  it("should update relative time bindings using custom signal", async (done) => {
    const target = "relative-time-target";
    const viewModel = { mydate: modifiedDateFromNow(0, -1, 0) };
    const component = StageComponent
      .withResources("mocks/rt-vm")
      .inView("<div id=\"" + target + "\">${mydate & rt}</div>")
      .boundTo(viewModel);

    bootstrapTestEnvironment(component);

    await component.create(bootstrap);

    const elem = document.getElementById(target);
    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe("1 month ago");

    viewModel.mydate = modifiedDateFromNow(0, 0, -1);

    const signaler = Container.instance.get(BindingSignaler);

    const queue = Container.instance.get(TaskQueue) as TaskQueue;
    queue.queueTask(() => {
      signaler.signal("aurelia-relativetime-signal");
      expect(elem).not.toBeNull();
      expect(elem!.innerHTML).toBe("1 year ago");

      component.dispose();
      done();
    });
  });

  it("should return value space provided", async () => {
    const target = "relative-time-target";
    const viewModel = { mydate: " " };
    const component = StageComponent
      .withResources("mocks/rt-vm")
      .inView("<div id=\"" + target + "\">${mydate & rt}</div>")
      .boundTo(viewModel);

    bootstrapTestEnvironment(component);

    await component.create(bootstrap);

    const elem = document.getElementById(target);
    expect(elem).not.toBeNull();
    expect(elem!.innerHTML).toBe(" ");
  });
});
