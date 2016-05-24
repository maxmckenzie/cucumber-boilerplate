const Yadda = require('yadda');
const config = require('./configure');
const language = Yadda.localisation[upperCaseFirstLetter(config.language)];
const fs = require('fs');
const path = require('path');
const chai = require('chai');

module.exports = (() => {
  const library = language.library();
  const dictionary = new Yadda.Dictionary();
  const stepsFiles = path.join(__dirname, '..', 'steps');
  const steps = fs.readdirSync(stepsFiles);

  /**
   * define regex helpers
   */
  dictionary.define('string', '([^"]*)?');

  /**
   * define step library
   */
  steps.forEach((step) => {
    require(path.join(stepsFiles, step)).call(library, dictionary);
  });

  return library;
})();

function upperCaseFirstLetter(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
}
