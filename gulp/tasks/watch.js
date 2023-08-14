const { series, watch } = require('gulp');

const browser = require('browser-sync');

const config = require('../config');

async function browserReload() {
    await browser.reload();
}

function watchFiles() {
    watch(config.staticAssets, series('copy'));
    watch(`${config.templatesPath}/**/*`).on('all', series('templates', browserReload));
    watch(`${config.stylesSrcPath}/**/*.scss`).on('all', series('styles', 'stylesLint'));
    watch(`${config.javascriptSrcPath}/**/*.js`).on('all', series('javascript', browserReload));
}

exports.watch = watchFiles;
