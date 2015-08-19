import {I18N} from '../../src/i18n';
import {RelativeTime} from '../../src/relativeTime';
import {EventAggregator} from 'aurelia-event-aggregator';

describe('testing relative time support', () => {

  var sut, i18n;

  beforeEach( () => {
    i18n = new I18N(new EventAggregator());
    i18n.setup({
      lng : 'en',
      getAsync : false,
      sendMissing : false,
      fallbackLng : 'en',
      debug : false
    });

    sut = new RelativeTime(i18n);
  });

  it('should provide now unit', () => {
    var expectedDate = new Date();

    expect(sut.getRelativeTime(expectedDate)).toBe('just now');
  });

  describe('ago tests', () => {
    it('should provide singular time unit', () => {
      var expectedDate = new Date();
      expectedDate.setHours(new Date().getHours() - 1);

      expect(sut.getRelativeTime(expectedDate)).toBe('1 hour ago');
    });

    it('should provide plural time unit', () => {
      var expectedDate = new Date();
      expectedDate.setHours(new Date().getHours() - 2);

      expect(sut.getRelativeTime(expectedDate)).toBe('2 hours ago');
    });

    it('should provide month ranges', () => {
      var expectedDate = new Date();
      expectedDate.setMonth(new Date().getMonth() - 2);

      expect(sut.getRelativeTime(expectedDate)).toBe('2 months ago');
    });

    it('should provide year ranges', () => {
      var expectedDate = new Date();
      expectedDate.setFullYear(new Date().getFullYear() - 2);

      expect(sut.getRelativeTime(expectedDate)).toBe('2 years ago');
    });
  });

  describe('in tests', () => {
    it('should provide singular time unit', () => {
      var expectedDate = new Date();
      expectedDate.setHours(new Date().getHours() + 1);

      expect(sut.getRelativeTime(expectedDate)).toBe('in 1 hour');
    });

    it('should provide plural time unit', () => {
      var expectedDate = new Date();
      expectedDate.setHours(new Date().getHours() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe('in 2 hours');
    });

    it('should provide month ranges', () => {
      var expectedDate = new Date();
      expectedDate.setMonth(new Date().getMonth() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe('in 2 months');
    });

    it('should provide year ranges', () => {
      var expectedDate = new Date();
      expectedDate.setFullYear(new Date().getFullYear() + 2);

      expect(sut.getRelativeTime(expectedDate)).toBe('in 2 years');
    });
  });

  describe('test i18n support', () => {
    it('should provide the translation in German', (done) => {
      i18n.setLocale('de').then( () => {
        var expectedDate = new Date();
        expectedDate.setHours(new Date().getHours() + 2);

        expect(sut.getRelativeTime(expectedDate)).toBe('in 2 Stunden');
        done();
      });
    });
  });

  it('should respect interpolation settings', () => {
    var customInterpolationSettings = new I18N();
    customInterpolationSettings.setup({
      lng : 'en',
      getAsync : false,
      sendMissing : false,
      fallbackLng : 'en',
      debug : false,
      interpolationPrefix: '${',
      interpolationSuffix: '}'
    });

    var customSut = new RelativeTime(customInterpolationSettings);

    var expectedDate = new Date();
    expectedDate.setHours(new Date().getHours() - 1);

    expect(customSut.getRelativeTime(expectedDate)).toBe('1 hour ago');
  });
});
