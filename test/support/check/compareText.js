/**
 * compare content of two elements
 */

module.exports = function (element1, falseCase, element2, done) {
  let text1 = '';

  this.browser
    .getText(element1)
    .then((text) => {
      text1 = text;
    })
    .getText(element2)
    .then((text) => {
      if (falseCase) {
        text1.should.not.equal(text, 'expected text not to be ' + text1);
      } else {
        text1.should.equal(text, 'expected text to be "' + text1 + '"  but found "' + text + '"');
      }
    })
    .call(done);
};
