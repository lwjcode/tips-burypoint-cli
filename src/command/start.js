const glob = require('glob');
const path = require('path');
const fs = require('fs');
const log = require('../log');
const buryPoint = require('../buryPoint');

const cwdPath = process.cwd();

function getSourceFiles({ path, exclude }) {
  return glob.sync(`${path}/**/*.{js,jsx,tsx,ts}`, {
    ignore: (exclude || []).map(file => {
      return `${path}/${file}`;
    }),
  });
}

function getConfigOptions(configFileName = 'tips.config.js') {
  const options = {
    prettier: {
      parser: 'typescript',
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 100,
    },
  };
  const configFilePath = path.join(cwdPath, configFileName);
  if (fs.existsSync(configFilePath)) {
    let configurationFile = {};
    try {
      configurationFile = require(configFilePath);
    } catch (err) {
      log.error(`请检查 ${configFileName} 配置文件是否正确\n`);
    }
    Object.assign(options, configurationFile);
  } else {
    log.error(`配置文件 ${configFileName} 不存在\n`);
  }
  return options;
}

function convertToBuryPointTag(options) {
  const { entry, exclude } = options;
  const targetFiles = [].concat(entry).reduce((prev, cur) => {
    const files = getSourceFiles({ path: cur, exclude });
    return prev.concat(files);
  }, []);
  targetFiles.forEach(element => {
    log.info(`start: ${element}`);
    buryPoint(element, options);
    log.success(`done: ${element}`);
  });
}

function buryPointInit(programOption) {
  const options = programOption || getConfigOptions();
  if (!options.entry) {
    log.error('\n · 使用 -e [path] 或 --entry [path] 命令增加待转换的源码目录');
    log.error(" · 或在配置文件中设置 'entry' 字段\n");
    process.exit(2);
  }
  convertToBuryPointTag(options);
}


module.exports = buryPointInit;