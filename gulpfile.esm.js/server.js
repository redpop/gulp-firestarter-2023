import browser from 'browser-sync';

import * as config from './config';

export default function server(done) {
    browser.init(
        {
            // proxy: "https://example.org",
            // host: "example.org",
            server: {
                baseDir: config.PATHS.dist.folder,
                // index: 'index.html',
                // directory: true,
            },
            // https: {
            //     key: './certs/localhost+2-key.pem',
            //     cert: './certs/localhost+2.pem',
            // },
            open: false,
            port: config.BROWSERSYNC.port,
            notify: false,
            ghostMode: {
                scroll: config.BROWSERSYNC.scrollmode,
            },
        },
        done,
    );
}

export function reload(done) {
    browser.reload();
    done();
}
