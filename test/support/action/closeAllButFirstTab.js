const Q = require('q');

module.exports = function (windowType, done) {
  this.browser
    // Close all tabs but the first one - this should remain the last step
    .windowHandles()
    .then((windowHandles) => {
      const handles = windowHandles.value;
      const currentHandleNr = 0;
      const browser = this;

      return Q.all(handles.map((handle) => {
            currentHandleNr++;

            if (currentHandleNr > 1) {
              return browser.close();
            }

            return handle;
          }
        )
      );
    })
    .call(done);
};
