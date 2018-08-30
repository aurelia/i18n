import { resolver, Container } from "aurelia-dependency-injection";

export let extend = (destination: any, source: any) => {
  // tslint:disable-next-line:forin
  for (const property in source) {
    destination[property] = source[property];
  }

  return destination;
};

// tslint:disable-next-line:only-arrow-functions
export const isInteger = Number.isInteger || function(value) {
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};

export let assignObjectToKeys = (root: any, obj: any) => {
  if (obj === undefined || obj === null) {
    return obj;
  }

  const opts = {};

  Object.keys(obj).map((key) => {
    if (typeof obj[key] === "object") {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      (opts as any)[root !== "" ? root + "." + key : key] = obj[key];
    }
  });

  return opts;
};

@resolver()
export class LazyOptional {
  public static of(key: any) {
    return new LazyOptional(key);
  }

  constructor(private key: string) { }

  public get(container: Container) {
    return () => {
      if (container.hasResolver(this.key, false)) {
        return container.get(this.key);
      }
      return null;
    };
  }
}
