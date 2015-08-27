import {I18N} from '../../src/i18n';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('testing i18n translations', () => {

  var sut;

  beforeEach( () => {
    var resources = {
      en: {
        translation: {
          "score": "Score: __score__",
          "lives": "__count__ life remaining",
          "lives_plural": "__count__ lives remaining",
          "lives_indefinite": "a life remaining",
          "lives_plural_indefinite": "some lives remaining",
          "friend": "A friend",
          "friend_male": "A boyfriend",
          "friend_female": "A girlfriend",
          "complex": '__field__ should be between __threshold.min__ and __threshold.max__',
          "nested_referencing": '$t(lives) in round __round__',
          "statement": '__brand__ is a next next gen JavaScript client framework'
        }
      },
      de: {
        translation: {
          "score": "Punktestand: __score__",
          "lives": "__count__ Lebenspunkt übrig",
          "lives_plural": "__count__ Lebenspunkte übrig",
          "lives_indefinite": "ein Lebenspunkt übrig",
          "lives_plural_indefinite": "einige Lebenspunkte übrig",
          "friend": "Ein Freund",
          "friend_male": "Ein Freund",
          "friend_female": "Eine Freundin",
          "statement": '__brand__ ist ein JavaScript client framework der nächsten Generation'
        }
      }
    };

    sut = new I18N(new EventAggregator());
    sut.setup({
      resStore: resources,
      lng : 'en',
      getAsync : false,
      sendMissing : false,
      fallbackLng : 'en',
      debug : false
    });
  });

  it('should translate a simple key without options', () => {
    expect(sut.tr('friend', { count: 0 })).toEqual('A friend');
  });

  it('should properly switch locales', (done) => {
    expect(sut.getLocale()).toBe('en');

    sut.setLocale('de').then( () => {
      expect(sut.getLocale()).toBe('de');
      expect(sut.tr('friend', { count: 0 })).toEqual('Ein Freund');
      done();
    });
  });

  it('should pass on provided options', () => {
    expect(sut.i18next.options.debug).toBe(false);
    expect(sut.i18next.options.sendMissing).toBe(false);
    expect(sut.i18next.options.fallbackLng).toEqual(['en']);
  });

  it('should map complex object', () => {
    var options = {
      'threshold': {
        'min': 1,
        'max': 10
      },
      'field': 'Age'
    };

    expect(sut.tr('complex', options)).toEqual('Age should be between 1 and 10');
  });

  it('should support nested translations', () => {
    expect(sut.tr('nested_referencing', { count: 1, round: 1 })).toEqual('1 life remaining in round 1');
  });

  it('should automatically add global variables as options if none provided', () => {
    sut.registerGlobalVariable('brand', 'Aurelia');

    expect(sut.tr('statement')).toEqual('Aurelia is a next next gen JavaScript client framework');
  });

  it('should prefer passed in options vs. global variables', () => {
    sut.registerGlobalVariable('brand', 'Aurelia');

    expect(sut.tr('statement', { brand: 'Aurelia.io' })).toEqual('Aurelia.io is a next next gen JavaScript client framework');
  });

  it('should allow unregistering of global variables', () => {
    sut.registerGlobalVariable('brand', 'Aurelia');
    expect(sut.tr('statement')).toEqual('Aurelia is a next next gen JavaScript client framework');

    sut.unregisterGlobalVariable('brand');
    expect(sut.tr('statement')).toEqual('__brand__ is a next next gen JavaScript client framework');
  });

  it('should handle null options', () => {
    expect(sut.tr('nested_referencing', { count: 1, round: null })).toEqual('1 life remaining in round __round__');
  });

  it('should handle undefined options', () => {
    expect(sut.tr('nested_referencing', { count: 1, round: undefined })).toEqual('1 life remaining in round undefined');
  });

  it('should trigger an event when switching locales', (done) => {
    var subscription = sut.ea.subscribe('i18n:locale:changed', (payload) => {
      subscription();

      expect(payload.oldValue).toBe('en');
      expect(payload.newValue).toBe('de');
      done();
    });

    sut.setLocale('de');
  });
});
