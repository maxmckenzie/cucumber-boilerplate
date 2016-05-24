module.exports = function (type, done) {
  this.browser
    .windowHandles()
    .then((windowHandles) => {
      const lastWindowHandle = windowHandles.value.slice(-1);

      return this
        .window(lastWindowHandle[0])
        .close();
    })
    .call(done);
};
