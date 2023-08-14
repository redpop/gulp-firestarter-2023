const { dest, src } = require('gulp');

const config = require('../config');

function copy() {
    return src(config.staticAssets, { base: config.staticAssetsBase }).pipe(dest(config.distPath));
}

exports.copy = copy;
