import { FrameworkConfiguration, ViewResources, Container, Aurelia } from "aurelia-framework";
import { bootstrap } from "aurelia-bootstrapper";

import { configure, I18N, Backend, AureliaBackendOptions } from "../../src/aurelia-i18n";
import { StageComponent } from "aurelia-testing";

describe("testing aurelia configure routine", () => {
  const frameworkConfig = {
    globalResources: () => { /**/ },
    container: {
      registerInstance: () => { /**/ },
      get: (Type: any) => new Type()
    },
    postTask: jest.fn()
  } as any as FrameworkConfiguration;

  it("should export configure function", () => {
    expect(typeof configure).toBe("function");
  });

  it("should accept a setup callback passing back the instance", (done) => {
    const cb = (instance: I18N) => {
      expect(typeof instance).toBe("object");
      done();

      return instance.i18next;
    };

    configure(frameworkConfig, cb);
  });

  it("should throw custom error message if no callback is provided", () => {
    expect(() => { (configure as any)(frameworkConfig); })
      .toThrow("You need to provide a callback method to properly configure the library");
  });

  it("should register default attributes if none provided", (done) => {
    const instanceCreator = (instance: I18N) => {
      return instance.i18next;
    };

    class ViewResourcesMock extends ViewResources { }
    const vrMock = new ViewResourcesMock();
    spyOn(vrMock, "registerAttribute");
    frameworkConfig.container.get = (Type: any) => {
      if (Type === ViewResources) {
        return vrMock;
      }

      return new Type();
    };

    frameworkConfig.postTask = jest.fn((cb: () => void) => {
      cb();

      expect(frameworkConfig.postTask).toHaveBeenCalled();
      expect(vrMock.registerAttribute).toHaveBeenCalledTimes(4);

      done();
    });

    configure(frameworkConfig, instanceCreator);
  });

  it("should apply default options if none provided", async () => {

    const target = "fallback-target";
    const component = StageComponent
      .withResources("mocks/rt-vm")
      .inView("<h5 id=" + target + " t=\"hello\">Hello!</h5>")
      .boundTo({ mydate: new Date() });

    const originalInit = Backend.prototype.init;
    Backend.prototype.init = function init(services: any, options: AureliaBackendOptions = {}) {
      this.services = services;
      this.options = Object.assign({}, {
        loadPath: "./fixtures/locales/{{lng}}/{{ns}}.json",
        addPath: "locales/add/{{lng}}/{{ns}}",
        allowMultiLoading: false,
        parse: JSON.parse
      }, options);
    };

    component.bootstrap((aurelia: Aurelia) => {
      return aurelia.use
        .standardConfiguration()
        .feature("src", (instance: I18N) => {
          // register backend plugin
          instance.i18next.use(Backend.with(aurelia.loader));

          return instance.setup();
        });
    });

    await component.create(bootstrap);

    const i18nInstance = Container.instance.get(I18N) as I18N;

    expect(i18nInstance.i18next.options).toMatchObject({
      skipTranslationOnMissingKey: false,
      lng: "en",
      attributes: ["t", "i18n"],
      fallbackLng: ["en"],
      debug: false
    });

    Backend.prototype.init = originalInit;

    component.dispose();
  });
});
