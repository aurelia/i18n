import {initialize, DOM} from 'aurelia-pal-browser';
import {TCustomAttribute, TParamsCustomAttribute} from '../../src/t';
import {Container} from 'aurelia-dependency-injection';
import {templatingEngine} from 'aurelia-templating';
import {I18N} from '../../src/i18n';

initialize();

describe('testing i18n attributes', () => {
  let container;

  beforeEach(() => {
    container = new Container();
    let element = DOM.createElement('div');
    container.registerInstance(DOM.Element, element);

    templatingEngine.initialize(container);
  });


  it('should raise value change on i18n custom attribute', done => {
    let i18nAttribute = templatingEngine.createModelForUnitTest(TCustomAttribute);
    spyOn(i18nAttribute, 'valueChanged');

    // disable DOM operations by mocking the specific function
    spyOn(container.get(I18N), 'updateValue');

    i18nAttribute.value = 'foo';

    setTimeout(() => {
      expect(i18nAttribute.valueChanged).toHaveBeenCalledWith('foo', undefined);
      done();
    });
  });

  it('should listen to params changes', done => {
    let paramsAttribute = templatingEngine.createModelForUnitTest(TParamsCustomAttribute);
    container.registerInstance(TParamsCustomAttribute, paramsAttribute);

    let i18nAttribute = templatingEngine.createModelForUnitTest(TCustomAttribute);
    spyOn(i18nAttribute, 'paramsChanged').and.callThrough();
    i18nAttribute.bind();

    setTimeout(() => {
      paramsAttribute.value = 'foo';
      setTimeout( () => {
        expect(i18nAttribute.paramsChanged).toHaveBeenCalledWith(undefined, 'foo', undefined);
        done();
      });
    });
  });
});
