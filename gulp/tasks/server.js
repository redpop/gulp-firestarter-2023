const browser = require('browser-sync');

const config = require('../config');

async function server() {
    await browser.init(
        // https://browsersync.io/docs/options
        {
            // proxy: "https://example.org",
            // host: "example.org",
            server: {
                baseDir: config.distPath,
                directory: config.browsersync.serverDirectory,
            },
            // https: {
            //     key: './certs/localhost+2-key.pem',
            //     cert: './certs/localhost+2.pem',
            // },
            open: false,
            port: config.browsersync.port,
            notify: false,
            ghostMode: {
                scroll: config.browsersync.scrollMode,
            },
        },
    );
}

exports.server = server;
