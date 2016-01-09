import {I18N} from '../../src/i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('numberformat tests', () => {
  let sut;

  beforeEach( () => {
    let resources = {
      en: {
        translation: {
          'lives': '__count__ life remaining',
          'lives_plural': '__count__ lives remaining',
          'lives_indefinite': 'a life remaining',
          'lives_plural_indefinite': 'some lives remaining'
        }
      }
    };

    sut = new I18N(new EventAggregator(), new BindingSignaler());
    sut.setup({
      resStore: resources,
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      fallbackLng: 'en',
      debug: false
    });
  });

  it('should display number in the setup locale format by default', () => {
    let nf = sut.nf();
    let testNumber = 123456.789;

    let result = nf.format(testNumber);
    expect(result).toEqual('123,456.789');
  });

  it('should display number in the previously modified locale', (done) => {
    sut.setLocale('de').then( () => {
      let nf = sut.nf();
      let testNumber = 123456.789;

      expect(nf.format(testNumber)).toEqual('123.456,789');

      done();
    });
  });

  it('should display number as currency', () => {
    let nf = sut.nf({ style: 'currency', currency: 'EUR' }, 'de');
    let testNumber = 123456.789;

    expect(nf.format(testNumber)).toBe('123.456,79 €');
  });
});
