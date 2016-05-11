import {I18N} from '../../src/i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('testing i18n namespaces', () => {
  let sut;
  let resources;
  
  beforeEach( () => {
    resources = {
      en: {
        translation: {
          'score': 'Score: {{score}}',
          'lives': '{{count}} life remaining',
          'lives_plural': '{{count}} lives remaining',
          'lives_indefinite': 'a life remaining',
          'lives_plural_indefinite': 'some lives remaining',
          'friend': 'A friend',
          'friend_male': 'A boyfriend',
          'friend_female': 'A girlfriend',
          'complex': '{{field}} should be between {{threshold.min}} and {{threshold.max}}',
          'nested_referencing': '$t(lives) in round {{round}}',
          'statement': '{{brand}} is a next next gen JavaScript client framework',
          'novar': '{{notexisting}} should be replaced with an empty string'
        }
      },
      de: {
        translation: {
          'score': 'Punktestand: {{score}}',
          'lives': '{{count}} Lebenspunkt übrig',
          'lives_plural': '{{count}} Lebenspunkte übrig',
          'lives_indefinite': 'ein Lebenspunkt übrig',
          'lives_plural_indefinite': 'einige Lebenspunkte übrig',
          'friend': 'Ein Freund',
          'friend_male': 'Ein Freund',
          'friend_female': 'Eine Freundin',
          'statement': '{{brand}} ist ein JavaScript client framework der nächsten Generation',
          'novar': '{{notexisting}} sollte mit einem Leerstring ersetzt werden'
        }
      }
    };

    sut = new I18N(new EventAggregator(), new BindingSignaler());
    
  });
  
  fit('should have translation as defaultNS', () => {
    sut.setup({
      resources: resources,
      lng: 'en',
      fallbackLng: 'en',
      debug: false
    });
    
    expect(sut.i18next.options.defaultNS).toEqual(["translation"]);
  });
  
  fit('should have customns as defaultNS', () => {
    sut.setup({
      resources: resources,
      lng: 'en',
      fallbackLng: 'en',
      defaultNS: 'customns',
      debug: false
    });
    
    expect(sut.i18next.options.defaultNS).toBe("customns");
  });
});
