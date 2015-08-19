import {configure} from '../../src/index';

describe('testing aurelia configure routine', () => {

  var frameworkConfig = {
    globalResources: () => {

    },
    container: {
      registerInstance: (type, instance) => {

      },
      get: (type) => { return new type(); }
    }
  };

  it('should export configure function', () => {
    expect(typeof configure).toBe('function');
  });

  it('should accept a setup callback passing back the instance', (done) => {


    var cb = (instance) => {
      expect(typeof instance).toBe('object');
      done();
    };

    configure(frameworkConfig, cb);
  });

  it('should throw custom error message if no callback is provided', () => {
  expect(() => { configure(frameworkConfig); })
      .toThrow('You need to provide a callback method to properly configure the library');
  });
});
