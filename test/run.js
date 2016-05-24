#!/usr/bin/env node
'use strict';
/**
 * wrapper arround mocha cmd
 * figures out options and calls mocha with desired arguments
 */

const spawn = require('child_process').spawn;
const path = require('path');
const args = [path.join(__dirname, '..', 'node_modules', 'mocha', 'bin', '_mocha')];
const config = require('./config').config;
let flag;
let proc;

/**
 * execute init script with mocha
 * init script handles the rest
 */
args.push(path.join(__dirname, 'support', 'init.js'));

/**
 * set mocha configs
 */
for (flag in (config.mochaOpts || {})) {
  args.push('--' + flag + '=' + config.mochaOpts[flag]);
}

process.argv.slice(2).forEach((arg) => {
  /**
   * set mocha specific args
   */
  flag = arg.split('=')[0];
  switch (flag) {
    case '-d':
      args.unshift('--debug');
      break;
    case 'debug':
    case '--debug':
    case '--debug-brk':
      args.unshift(arg);
      break;
    case '-gc':
    case '--expose-gc':
      args.unshift('--expose-gc');
      break;
    case '--gc-global':
    case '--harmony':
    case '--harmony-proxies':
    case '--harmony-collections':
    case '--harmony-generators':
    case '--prof':
      args.unshift(arg);
      break;
    default:
      if (arg.indexOf('--trace') === 0) {
        args.unshift(arg);
      } else {
        args.push(arg);
      }
      break;
  }
});

proc = spawn(process.argv[0], args, {
  stdio: 'inherit',
});
proc.on(
  'exit',
  (code, signal) => {
    process.on(
      'exit',
      () => {
        if (signal) {
          process.kill(process.pid, signal);
        } else {
          process.exit(code);
        }
      }
    );
  }
);
