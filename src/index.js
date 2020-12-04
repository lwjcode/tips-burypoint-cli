#! /usr/bin/env node

const commander = require('commander');
const option = require('../package.json');
const log = require('./log');
const buryPointInit = require('./command/start');
const initConfig = require('./command/initConfig');

commander
  .version(option.version, '-v, --version')
  .parse(process.argv);

commander
  .command('init')
  .alias('i')
  .description('初始化')
  .action(function(cmd, options) {
    initConfig(options);
  });

commander
  .command('start')
  .alias('s')
  .description('初始化')
  .action(function(cmd, options) {
    buryPointInit(options);
  });

commander.command('*').action(function(cmd) {
  log.error(`unknown command ${cmd}`);
});

commander.parse(process.argv);
