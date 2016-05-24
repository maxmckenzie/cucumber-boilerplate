module.exports = function (modalType, falseState, modalText, done) {
  this.browser
    .alertText()
    .then((text) => {
      if (falseState) {
        text.should.not.equal(modalText);
      } else {
        text.should.equal(modalText);
      }
    }, () => {
      assert.ok(false, 'A ' + modalType + ' was not opened when it should have been opened');
    })
    .call(done);
};
