import gulp from 'gulp';
import gulpStylelint from 'gulp-stylelint';

import * as config from './config';

export default function stylelint() {
    return gulp.src(`${config.PATHS.src.sass}/**/*.scss`).pipe(
        gulpStylelint({
            reporters: [{ formatter: 'string', console: true }],
        })
    );
}
