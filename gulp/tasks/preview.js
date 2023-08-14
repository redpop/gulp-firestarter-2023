const browser = require('browser-sync');

const config = require('../config');

async function preview() {
    await browser.init({
        server: {
            baseDir: config.distPath,
            directory: config.browsersync.previewDirectory,
        },
        open: false,
        port: config.browsersync.port,
        notify: false,
        ghostMode: {
            scroll: config.browsersync.scrollMode,
        },
    });
}

exports.preview = preview;
