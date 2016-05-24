/**
 * check url path
 */
const config = require('../../config.js').config;

module.exports = function (falseCase, path, done) {
  this.browser
    .url()
    .then((result) => {
      // Remove the domain from the url
      const domain = config.env.baseUrl;

      if (result.value.indexOf(domain) === 0) {
        result.value = result.value.replace(domain, '');
      }

      if (falseCase) {
        result.value.should.not.equal(path, 'expected path not to be ' + result.value);
      } else {
        result.value.should.equal(path, 'expected path to be "' + path + '"  but found "' + result.value + '"');
      }

      return this;
    })
    .call(done);
};
