module.exports = function (method, text, element, done) {
  const command = (method === 'add') ? 'addValue' : 'setValue';

  this.browser[command](element, text)
    .call(done);
};
