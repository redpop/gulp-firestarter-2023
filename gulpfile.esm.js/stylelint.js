import gulp from 'gulp';
import gulpStylelint from '@ronilaukkarinen/gulp-stylelint';

import * as config from './config';

export default function stylelint() {
    return gulp.src(`${config.PATH.src.css}/**/*.css`).pipe(
        gulpStylelint({
            failAfterError: false,
            reporters: [{formatter: 'string', console: true}],
        }),
    );
}
