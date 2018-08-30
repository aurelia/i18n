import { FrameworkConfiguration } from "aurelia-framework";

import { configure, I18N } from "../../src/aurelia-i18n";

describe("testing aurelia configure routine", () => {
  const frameworkConfig = {
    globalResources: () => { /**/ },
    container: {
      registerInstance: () => { /**/ },
      get: (Type: any) => new Type()
    },
    postTask: () => { /**/ }
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
});
