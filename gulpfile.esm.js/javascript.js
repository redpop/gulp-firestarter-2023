import { src } from 'gulp';
import plugins from 'gulp-load-plugins';

import * as config from './config';

const $ = plugins();

const execOptions = {
    continueOnError: true, // default = false, true means don't emit error event
    pipeStdout: true, // default = false, true means stdout is written to file.contents
};

const reporterOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true, // default = true, false means don't write stdout
};

export default function javascript() {
    return src(config.PATHS.src.javascriptEntries, {
        read: false,
    })
        .pipe(
            $.if(
                !config.PRODUCTION,
                $.exec(
                    `parcel build <%= file.path %> --out-dir ${config.PATHS.dist.javascript} --public-url ./`,
                    execOptions
                ),
                $.exec(
                    `parcel build <%= file.path %> --out-dir ${config.PATHS.dist.javascript} --no-source-maps --public-url ./`,
                    execOptions
                )
            )
        )
        .pipe($.exec.reporter(reporterOptions));
}
