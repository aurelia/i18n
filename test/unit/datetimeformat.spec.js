import {I18N} from '../../src/i18n';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('datetimeformat tests', () => {

  var sut;

  beforeEach(() => {
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

    sut = new I18N(new EventAggregator());
    sut.setup({
      resStore: resources,
      lng: 'en',
      getAsync: false,
      sendMissing: false,
      fallbackLng: 'en',
      debug: false
    });
  });

  it('should display only the date in the setup locale format by default', () => {
    var df = sut.df();
    var testDate = new Date(2000, 0, 1, 0,0,1);

    expect(df.format(testDate)).toEqual('1/1/2000');
  });

  it('should display date in the previously modified locale', (done) => {
    sut.setLocale('de').then( () => {
      var df = sut.df();
      var testDate = new Date(2000, 0, 1, 0,0,1);

      expect(df.format(testDate)).toEqual('1.1.2000');

      done();
    });
  });

  it('should display datetime',() => {
    var options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };
    var df = sut.df(options, 'de');
    var testDate = new Date(2000, 0, 1, 0,0,1);

    expect(df.format(testDate)).toEqual('01.01.2000, 00:00:01');
  });

});
