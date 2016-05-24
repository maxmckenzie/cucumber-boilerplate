module.exports = function (selector, done) {
  this.browser
    .waitForExist(selector, 15000)
    .then((result) => {
      return this
        .scroll(selector);
    })
    .call(done);
};
