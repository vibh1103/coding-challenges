#!/usr/bin/env node

const { Command } = require('commander');
const pjson = require('./package.json');
const processFile = require('./lib/processFile');

const program = new Command();

program
  .name('ccwc')
  .description('Custom wc tool built with Node.js')
  .version(pjson.version)
  .option('-c, --bytes', 'output the byte count')
  .option('-l, --lines', 'output the line count')
  .option('-w, --words', 'output the word count')
  .option('-m, --chars', 'output the character count');

program.parse(process.argv);

const options = program.opts();
const filePath = program.args[0];

if (!filePath && process.stdin.isTTY) {
  console.error('No file specified.');
  process.exit(1);
}

processFile(filePath, options);
