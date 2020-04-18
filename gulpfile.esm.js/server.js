import browser from 'browser-sync';

import * as config from './config';

export default function server(done) {
    browser.init(
        {
            // proxy: "https://example.org",
            // host: "example.org",
            // https: {
            //   key: "./certs/master.key",
            //   cert: "./certs/master.crt",
            // },
            server: {
                baseDir: config.PATHS.dist.folder,
            },
            open: false,
            port: config.BROWSERSYNC.port,
            ghostMode: {
                scroll: config.BROWSERSYNC.scrollmode,
            },
        },
        done
    );
}

export function reload(done) {
    browser.reload();
    done();
}
