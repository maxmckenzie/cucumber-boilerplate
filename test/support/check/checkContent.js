/**
 * check content for specific element or input field
 */

module.exports = function (type, element, falseCase, origText, done) {
  const command = (type !== 'inputfield') ? 'getText' : 'getValue';

  // Check for empty element
  if (!done && typeof origText === 'function') {
    done = origText;
    origText = '';

    falseCase = !falseCase;
  }

  this.browser[command](element)
    .then((text) => {
      if (falseCase) {
        origText.should.not.equal(text);
      } else {
        origText.should.equal(text);
      }
    })
    .call(done);
};
