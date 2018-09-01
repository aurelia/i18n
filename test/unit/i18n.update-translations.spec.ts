// tslint:disable-next-line:no-reference
/// <reference path="../html-loader.d.ts" />
import { I18N, I18N_EA_SIGNAL } from "../../src/i18n";
import { BindingSignaler } from "aurelia-templating-resources";
import { EventAggregator } from "aurelia-event-aggregator";
import tpl from "./fixtures/template.html";

function loadTemplate() {
  // load the the html fixture
  const existingElement = document.querySelector("#the-template");
  if (existingElement) {
    document.body.removeChild(existingElement);
  }

  const template = document.createElement("div");
  template.id = "the-template";
  template.innerHTML = tpl;
  template.innerHTML = (template.firstChild! as HTMLElement).innerHTML;

  document.body.appendChild(template);

  return template;
}

describe("testing i18n translation update", () => {
  let sut: I18N;
  let resources: any;
  let template: HTMLElement;
  let ea: EventAggregator;

  beforeEach(async () => {
    resources = {
      en: {
        translation: {
          "title": "Title",
          "description": "Description",
          "description2": "Description <b>with some bold</b>",
          "nested_referencing": "The $t(title) is the header",
          "description-class": "red",
          "params": "My name is {{name}}",
          "testimage": "testimage-english.jpg"
        }
      },
      de: {
        translation: {
          "title": "Titel",
          "description": "Beschreibung",
          "description2": "Beschreibung <b>mit Fettdruck</b>",
          "nested_referencing": "Der $t(title) ist der Kopf",
          "description-class": "blue",
          "params": "Meine Name ist {{name}}",
          "testimage": "testimage-german.jpg"
        }
      }
    };

    ea = new EventAggregator();
    sut = new I18N(ea, new BindingSignaler());
    const i18nextSetupPromise = sut.setup({
      resources,
      lng: "en",
      attributes: ["t", "data-i18n"],
      fallbackLng: "en",
      debug: false
    });

    template = loadTemplate();

    // update the translations in the template when the locale changes
    ea.subscribe(I18N_EA_SIGNAL, () => {
      sut.updateTranslations(template);
    });

    await Promise.all([i18nextSetupPromise]);
  });

  describe("init locale", () => {
    beforeEach(async () => {
      await sut.setLocale("en");
    });

    it("should translate contents of elements with a translation attribute", async () => {
      expect(template.querySelector("#test1")!.innerHTML.trim()).toBe("Title");
      expect(template.querySelector("#test2")!.innerHTML.trim()).toBe("Description");

      await sut.setLocale("de");

      expect(template.querySelector("#test1")!.innerHTML.trim()).toBe("Titel");
      expect(template.querySelector("#test2")!.innerHTML.trim()).toBe("Beschreibung");
    });

    it("should translate nested keys", async () => {
      expect(template.querySelector("#test-nested")!.innerHTML.trim()).toBe("The Title is the header");

      await sut.setLocale("de");

      expect(template.querySelector("#test-nested")!.innerHTML.trim()).toBe("Der Titel ist der Kopf");
    });

    it("should work with all attributes specified in the options", async () => {
      const el = template.querySelector("#test-other-attr")!;

      expect(el.innerHTML.trim()).toBe("Description");

      await sut.setLocale("de");

      expect(el.innerHTML.trim()).toBe("Beschreibung");
    });

    it("should set the textContent when using the [text] attribute", async () => {
      const el = template.querySelector("#test-text")!;

      expect(el.innerHTML.trim()).toBe("Description");

      await sut.setLocale("de");

      expect(el.innerHTML.trim()).toBe("Beschreibung");
    });

    it("should escape html tags by default or when using [text]", async () => {
      const el = template.querySelector("#test-text-with-tags")!;

      expect(el.innerHTML.trim()).toBe("Description &lt;b&gt;with some bold&lt;/b&gt;");

      await sut.setLocale("de");

      expect(el.innerHTML.trim()).toBe("Beschreibung &lt;b&gt;mit Fettdruck&lt;/b&gt;");
    });

    it("should allow tags when using the [html] attribute", async () => {
      const el = template.querySelector("#test-html")!;

      expect(el.innerHTML.trim()).toBe("Description <b>with some bold</b>");

      await sut.setLocale("de");

      expect(el.innerHTML.trim()).toBe("Beschreibung <b>mit Fettdruck</b>");
    });
  });

  it("should prepend the translation when using the [prepend] attribute, and it allows html", async () => {
    const el = template.querySelector("#test-prepend")!;

    expect(el.innerHTML.trim()).toBe("content");

    await sut.setLocale("de");
    expect(el.innerHTML.trim()).toBe("Beschreibung <b>mit Fettdruck</b>content");

    await sut.setLocale("en");
    expect(el.innerHTML.trim()).toBe("Description <b>with some bold</b>content");
  });

  it("should append the translation when using the [append] attribute, and it allows html", async () => {
    const el = template.querySelector("#test-append")!;

    expect(el.innerHTML.trim()).toBe("content");

    await sut.setLocale("de");
    expect(el.innerHTML.trim()).toBe("contentBeschreibung <b>mit Fettdruck</b>");

    await sut.setLocale("en");
    expect(el.innerHTML.trim()).toBe("contentDescription <b>with some bold</b>");
  });

  it("should set multiple keys when separated with a semicolon", async () => {
    const el = template.querySelector("#test-multiple")!;

    expect(el.innerHTML.trim()).toBe("Wrong Description <b>with some bold</b>");
    expect(el.className).toBe("");

    await sut.setLocale("de");
    expect(el.innerHTML.trim()).toBe("Beschreibung <b>mit Fettdruck</b>");
    expect(el.className).toBe("blue");

    await sut.setLocale("en");
    expect(el.innerHTML.trim()).toBe("Description <b>with some bold</b>");
    expect(el.className).toBe("red");
  });

  it("should set multiple attributes when separated with a comma", async () => {
    const el = template.querySelector("#test-multiple-attributes")!;

    expect(el.innerHTML.trim()).toBe("Wrong Description");
    expect(el.getAttribute("alt")).toBe(null);
    expect(el.getAttribute("aria-label")).toBe(null);

    await sut.setLocale("de");
    expect(el.innerHTML.trim()).toBe("Beschreibung");
    expect(el.getAttribute("alt")).toBe("Beschreibung");
    expect(el.getAttribute("aria-label")).toBe("Beschreibung");

    await sut.setLocale("en");
    expect(el.innerHTML.trim()).toBe("Description");
    expect(el.getAttribute("alt")).toBe("Description");
    expect(el.getAttribute("aria-label")).toBe("Description");
  });

  it("should set the src attribute for images", async () => {
    const el = template.querySelector("#test-img")!;

    expect(el.getAttribute("src")).toBeNull();

    await sut.setLocale("de");
    expect(el.getAttribute("src")).toBe("testimage-german.jpg");

    await sut.setLocale("en");
    expect(el.getAttribute("src")).toBe("testimage-english.jpg");
  });
});
