const fs = require('fs');
const inquirer = require('inquirer');
const prettier = require('prettier');

async function doInquire() {
  let configExist = true;
  try {
    fs.accessSync('./tips.config.js');
  } catch (e) {
    configExist = false;
  }
  // 如果配置文件存在
  if (configExist) {
    ans = await inquirer.prompt([
      {
        name: 'overwrite',
        type: 'confirm',
        message: '配置文件 tips.config.js 已存在，是否覆盖？',
      },
    ]);
    if (!ans.overwrite) {
      process.exit(0);
    }
  }
}

module.exports = async function initConfig() {
  await doInquire();
  const options = {
    entry: 'src',
    exclude: [],
    prettier: {
      parser: 'typescript',
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
    },
  };
  // 配置信息写入文件
  fs.writeFileSync(
    './tips.config.js',
    prettier.format(
      'module.exports = ' + JSON.stringify(options), {
        parser: 'babel',
        singleQuote: true,
        trailingComma: 'es5',
      }
    ),
    'utf8'
  );
};
