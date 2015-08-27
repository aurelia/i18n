import {I18N} from '../../src/i18n';
import {NfValueConverter} from '../../src/nf';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('nfvalueconverter tests', () => {
  
  var sut, nfvc;
  beforeEach(function() {
    sut = new I18N(new EventAggregator());
    nfvc = new NfValueConverter(sut);
  });

  it('should display number in the setup locale format by default', () => {
    var testNumber = 123456.789;
    expect(nfvc.toView(testNumber)).toEqual('123,456.789');
  });

  it('should display number in the previously modified locale', (done) => {
    sut.setLocale('de').then( () => {
      var testNumber = 123456.789;
      expect(nfvc.toView(testNumber)).toEqual('123.456,789');
      done();
    });
  });

  it('should display number as currency',() => {
    var testNumber = 123456.789;
    expect(nfvc.toView(testNumber,{ style: 'currency', currency: 'JPY' }, 'de')).toBe('123.456,789 ¥');
  });

});
