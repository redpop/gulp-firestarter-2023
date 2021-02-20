import fs from 'fs';
import yaml from 'js-yaml';

export const PRODUCTION = (process.env.NODE_ENV) === 'production';

function loadConfig() {
    const ymlFile = fs.readFileSync('config.yml', 'utf8');
    return yaml.load(ymlFile);
}

export const {PATHS, BROWSERSYNC} = loadConfig();
