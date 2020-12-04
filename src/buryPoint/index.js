const fs = require('fs');
const prettier = require('prettier');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse');
const generate = require('@babel/generator');
const buryPointPlugin = require('../plugin');

function buryPoint(filePath, options) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const ast = parser.parse(fileContent, {
    sourceType: 'module',
    plugins: [
      'typescript',
      'jsx',
      'dynamicImport',
      'optionalChaining',
      'classProperties',
      'decorators-legacy',
      'functionBind',
      'objectRestSpread',
      'asyncGenerators',
    ],
  });
  traverse.default(ast, buryPointPlugin());
  let { code } = generate.default(ast, {});
  code = prettier.format(code, options.prettier);
  fs.writeFileSync(filePath, code, { encoding: 'utf-8' });
}

module.exports = buryPoint;