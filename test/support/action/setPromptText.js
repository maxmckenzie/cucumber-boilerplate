module.exports = function (modalText, done) {
  this.browser
    .alertText(modalText)
    .then((text) => {
      return this;
    }, () => {
      assert.ok(false, 'A prompt was not open when it should have been open');
    })
    .call(done);
};
