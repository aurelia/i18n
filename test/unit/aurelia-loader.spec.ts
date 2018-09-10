import Backend from "../../src/aurelia-i18n-loader";

describe("aurelia-loader", () => {
  it("should accept backend options", async () => {
    const expectedValue = "./my/own/locales/{{lng}}/{{ns}}.json";
    const sut = new Backend({});

    sut.init({}, {
      loadPath: expectedValue
    });

    expect(sut.options.loadPath).toBe(expectedValue);
  });
});
