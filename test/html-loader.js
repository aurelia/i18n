const htmlLoader = require("html-loader");

module.exports = {
  process(src, _filename, _config, _options) {
    return htmlLoader(src);
  }
}
