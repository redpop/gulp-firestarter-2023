// Dependencies
const { rimraf } = require('rimraf');

const config = require('../config');

async function clean() {
    await rimraf(config.cleanPath, { glob: true });
}

exports.clean = clean;
