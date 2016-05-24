/**
 * Check text content for specific element or input field
 */
module.exports = (type, element, falseCase, done) => {
  const command = (type !== 'inputfield') ? 'getText' : 'getValue';

  this.browser[command](element)
  .then((text) => {
    if (falseCase) {
    expect(text).to.not.be.empty;
    } else {
    expect(text).to.be.empty;
    }
  })
  .call(done);
};
