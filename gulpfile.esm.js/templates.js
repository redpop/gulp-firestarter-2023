import gulp from 'gulp';
import nunjucksRender from 'gulp-nunjucks-render';

import * as config from './config';

export default function templates() {
    return gulp
        .src(`${config.PATHS.src.templates}/**/*.{html,njk}`)
        .pipe(
            nunjucksRender({
                path: [`${config.PATHS.src.templates}`],
            }),
        )
        .pipe(gulp.dest(config.PATHS.dist.folder));
}
