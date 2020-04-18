import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

import * as config from './config';

const $ = plugins();

export default function images() {
    return gulp
        .src(`${config.PATHS.src.images}/**/*`)
        .pipe($.if(config.PRODUCTION, $.imagemin()))
        .pipe(gulp.dest(config.PATHS.dist.images));
}
