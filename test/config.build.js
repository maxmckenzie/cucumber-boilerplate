/**
 * Configuration overwrites for the build process
 */
const config = require('./config.js').config;

exports.config = (function (globalConfig) {
  globalConfig.capabilities = {
    browserName: 'phantomjs',
  };

  return globalConfig;
})(config);
