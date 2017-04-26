import {resolver} from 'aurelia-dependency-injection';

export let extend = (destination, source) => {
  for (let property in source) {
    destination[property] = source[property];
  }

  return destination;
};

export const isInteger = Number.isInteger || function(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
};

export let assignObjectToKeys = (root, obj) => {
  if (obj === undefined || obj === null) {
    return obj;
  }

  let opts = {};

  Object.keys(obj).map( (key) => {
    if (typeof obj[key] === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};

@resolver()
export class LazyOptional {
  constructor(key) {
    this.key = key;
  }

  get(container) {
    return () => {
      if (container.hasResolver(this.key, false)) {
        return container.get(this.key);
      }
      return null;
    };
  }

  static of(key) {
    return new LazyOptional(key);
  }
}
