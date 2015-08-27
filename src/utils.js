export var extend = (destination,source) => {
  for (var property in source)
    destination[property] = source[property];
  return destination;
};

export var assignObjectToKeys = (root, obj) => {
  if(obj === undefined || obj === null)
    return obj;

  var opts = {};

  Object.keys(obj).map( (key) => {
    if(typeof obj[key] === 'object') {
      extend(opts, assignObjectToKeys(key, obj[key]));
    } else {
      opts[root !== '' ? root + '.' + key : key] = obj[key];
    }
  });

  return opts;
};
