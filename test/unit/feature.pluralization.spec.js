import {I18N} from '../../src/i18n';
import {DefaultLoader} from 'aurelia-loader-default';
import {BindingSignaler} from 'aurelia-templating-resources';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('feature verification pluralization', () => {

  var sut;

  beforeEach( () => {
    var resources = {
      en: {
        translation: {
          "lives": "__count__ life remaining",
          "lives_plural": "__count__ lives remaining",
          "lives_indefinite": "a life remaining",
          "lives_plural_indefinite": "some lives remaining"
        }
      }
    };

    sut = new I18N(new EventAggregator(), new DefaultLoader(), new BindingSignaler());
    sut.setup({
      resStore: resources,
      lng : 'en',
      getAsync : false,
      sendMissing : false,
      fallbackLng : 'en',
      debug : false
    });
  });

  it('should return singular translation', () => {
    expect(sut.tr('lives', { count: 1 })).toEqual('1 life remaining');
  });

  it('should return plural translation', () => {
    expect(sut.tr('lives', { count: 2 })).toEqual('2 lives remaining');
  });

  it('should return unknown error if no plural is defined', () => {
    expect(sut.tr('wrongtest', { count: 2 })).toContain('plural_not_found');
  });

  it('should return singular indefinite translation', () => {
    expect(sut.tr('lives', { count: 1, indefinite_article: true })).toEqual('a life remaining');
  });

  it('should return plural indefinite translation', () => {
    expect(sut.tr('lives', { count: 2, indefinite_article: true })).toEqual('some lives remaining');
  });
});
