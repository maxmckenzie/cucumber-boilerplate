/**
 * this file generates the config attribute according
 * to current NODE_ENV
 */
const fs = require('fs');
const path = require('path');
const merge = require('deepmerge');
let config = require('../config.js').config;
const envConfigPath = path.join(__dirname, '..', 'config.' + process.env.NODE_ENV + '.js');

if (process.env.NODE_ENV && fs.existsSync(envConfigPath)) {
  config = merge(config, require(envConfigPath).config);
}

module.exports = config;
