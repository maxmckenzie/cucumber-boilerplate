module.exports = function (modalType, falseState, done) {
  this.browser
    .alertText()
    .then(() => {
      if (falseState) {
        assert.ok(false, 'A ' + modalType + ' was opened when it shouldnt');
      }
    }, () => {
      if (!falseState) {
        assert.ok(false, 'A ' + modalType + ' was not opened when it should have been opened');
      }
    })
    .call(done);
};
