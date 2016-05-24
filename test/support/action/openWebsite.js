module.exports = function (type, page, done) {
  const url = (type === 'url') ? page : this.baseUrl + page;

  this.browser
    .url(url)
    .call(done);
};
