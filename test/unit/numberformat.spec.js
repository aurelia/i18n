import {I18N} from '../../src/i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {EventAggregator} from 'aurelia-event-aggregator';
import Intl from 'Intl.js';

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

  describe('unformating numbers', () => {
    beforeEach( () => {
      sut = new I18N(new EventAggregator());
      sut.setup({
        resStore: {},
        lng: 'en',
        getAsync: false,
        sendMissing: false,
        fallbackLng: 'en',
        debug: false
      });

      window.Intl.NumberFormat = Intl.NumberFormat;
      sut.Intl.NumberFormat = Intl.NumberFormat;
    });

    it('should keep the decimal separator', () => {
      let sample = '1,234.56';
      let result = sut.uf(sample);

      expect(result).toBe(1234.56);
    });

    it('should respect provided locale', () => {
      let sample = '1.234,56';
      let result = sut.uf(sample, 'de');

      expect(result).toBe(1234.56);
    });

    it('should remove currency symbols', () => {
      let sample = '$ 1,234.56';
      let result = sut.uf(sample);

      expect(result).toBe(1234.56);
    });

    it('should remove all non numeric symbols', () => {
      let sample = '1,234.56 m/s';
      let result = sut.uf(sample);

      expect(result).toBe(1234.56);
    });

    it('should respect negative values', () => {
      let sample = '-1,234.56';
      let result = sut.uf(sample);

      expect(result).toBe(-1234.56);
    });
  });
});
