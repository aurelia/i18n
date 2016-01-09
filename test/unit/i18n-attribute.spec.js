import {DOM} from 'aurelia-pal';
import {BindingSignaler} from 'aurelia-templating-resources';
import {initialize} from 'aurelia-pal-browser';
import {TCustomAttribute, TParamsCustomAttribute} from '../../src/t';
import {Container} from 'aurelia-dependency-injection';
import {TemplatingEngine} from 'aurelia-templating';
import {I18N} from '../../src/i18n';
import {EventAggregator} from 'aurelia-event-aggregator';

initialize();

describe('testing i18n attributes', () => {
  let container;
  let templatingEngine;
  let sut;

  beforeEach(() => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    sut.setup({
      resStore: {},
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      fallbackLng: 'en',
      debug: false
    });

    container = new Container();
    container.registerInstance(I18N, sut);
    container.registerInstance(DOM.Element, DOM.createElement('div'));
    templatingEngine = container.get(TemplatingEngine);
  });


  it('should raise value change on i18n custom attribute', done => {
    let i18nAttribute = templatingEngine.createViewModelForUnitTest(TCustomAttribute);
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
    let paramsAttribute = templatingEngine.createViewModelForUnitTest(TParamsCustomAttribute);
    container.registerInstance(TParamsCustomAttribute, paramsAttribute);

    let i18nAttribute = templatingEngine.createViewModelForUnitTest(TCustomAttribute);
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
