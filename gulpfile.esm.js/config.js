import fs from 'fs';
import yaml from 'js-yaml';
import yargs from 'yargs';

export const PRODUCTION = !!yargs.argv.production;

function loadConfig() {
    const ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

export const { PATHS, BROWSERSYNC } = loadConfig();
