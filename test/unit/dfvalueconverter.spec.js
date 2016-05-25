import {I18N} from '../../src/i18n';
import {BindingSignaler} from 'aurelia-templating-resources';
import {DfValueConverter} from '../../src/df';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('dfvalueconverter tests', () => {

  let sut, dfvc;

  beforeEach(() => {
    sut = new I18N(new EventAggregator(), new BindingSignaler());
    dfvc = new DfValueConverter(sut);
  });

  it('should display only the date in the setup locale format by default', () => {
    let testDate = new Date(2000, 0, 1, 0, 0, 1);

    expect(dfvc.toView(testDate)).toEqual('1/1/2000');
  });

  it('should display date in the previously modified locale', (done) => {
    sut.setLocale('de').then( () => {
      let testDate = new Date(2000, 0, 1, 0, 0, 1);
      expect(dfvc.toView(testDate)).toEqual('1.1.2000');
      done();
    });
  });

  it('should display datetime', () => {
    let options = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    };
    let testDate = new Date(2000, 0, 1, 0, 0, 1);
    expect(dfvc.toView(testDate, options, 'de')).toEqual('01.01.2000, 00:00:01');
  });
  
  it('should return undefined if undefined value given', () => {
    let val = undefined;
    expect(dfvc.toView(val)).toBe(undefined);
  });
  
  it('should return null if null value given', () => {
    let val = null;
    expect(dfvc.toView(val)).toBe(null);
  });

  it('should return empty string if empty string value given', () => {
    let val = "";
    expect(dfvc.toView(val)).toBe("");
  });

  it('should return 0 as begin of unix timestamp', (done) => {
    let val = 0;
    sut.setLocale('de').then( () => {
      expect(dfvc.toView(val, { timeZone: 'UTC'})).toBe("1.1.1970");
      done();
    });
  });

  fit('should return "0" as begin of unix timestamp', (done) => {
    let val = '0';
    sut.setLocale('de').then( () => {
      expect(dfvc.toView(val, { timeZone: 'UTC'})).toBe('1.1.1970');
      done();
    });
  });
});
