const Yadda = require('yadda');
const chai = require('chai');
const path = require('path');
const glob = require('glob');
const merge = require('deepmerge');
const config = require('./configure');
const beforeHook = require('../hooks/before.js');
const afterHook = require('../hooks/after.js');
const beforeEachHook = require('../hooks/beforeEach.js');
const afterEachHook = require('../hooks/afterEach.js');
let processed = 0;
let fileCount = null;
const context = {};
let currentStep;
let runIsolateTestOnly = false;
const files = [];

/**
 * expose assertion library
 */
global.expect = chai.expect;
global.assert = chai.assert;
global.should = chai.should();

/**
 * register own global namespace
 */
global.testscope = {};

Yadda.plugins.mocha.StepLevelPlugin.init();

/**
 * gather feature files
 */
config.featureFiles.forEach((globPattern) => {
  glob.sync(
    globPattern,
    {
      cwd: path.join(__dirname, '..', '..'),
    }
  ).forEach((file) => {
    files.push(path.join(__dirname, '..', '..', file));
  });
});

/**
 * Looking for tests scenarios to run in isolation, if found set the flag to run only those
 */
files.forEach((file, i, files) => {
  featureFile(
    file,
    (feature) => {
      scenarios(
        feature.scenarios,
        (scenario) => {
          if (scenario.annotations.isolate) {
            runIsolateTestOnly = true;
          }
        }
      );
    }
  );
});

files.forEach((file, i, files) => {
  fileCount = (fileCount === null) ? files.length : fileCount;

  featureFile(
    file,
    (feature) => {
      if (feature.annotations.pending) {
        fileCount--;
      }

      before((done) => {
        if (processed === 0) {
          return beforeHook.call(global.testscope, beforeEachHook.bind(global.testscope, done));
        }

        beforeEachHook.call(global.testscope, done);
      });

      scenarios(
        feature.scenarios,
        (scenario) => {
          const stepDefinitions = require('./step-definitions');
          const yadda = new Yadda.Yadda(stepDefinitions, context);

          if (runIsolateTestOnly &&
            !scenario.annotations.isolate &&
            !scenario.annotations.only
          ) {
            return;
          }

          steps(
            scenario.steps,
            (step, done) => {
              var context = merge(global.testscope, config.env);

              if (scenario.annotations.executedBy) {
                context.browser = context.browser.select(scenario.annotations.executedBy);
              }

              yadda.run(step, context, done);
            }
          );
        }
      );

      Yadda.EventBus.instance().on(
        Yadda.EventBus.ON_EXECUTE,
        (event) => {
          currentStep = event.data.step;
        }
      );

      after((done) => {
        if (++processed === fileCount) {
          return afterEachHook.call(global.testscope, afterHook.bind(global.testscope, done));
        }

        afterEachHook.call(global.testscope, done);
      });
    }
  );
});
