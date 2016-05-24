module.exports = function (action, type, element, done) {
  const elem = (type === 'link') ? '=' + element : element;
  const method = (action === 'click') ? 'click' : 'doubleClick';

  this.browser[method](elem)
    .call(done);
};
