import gulp from 'gulp';
import changed from 'gulp-changed';
import plugins from 'gulp-load-plugins';

import * as config from './config';

const $ = plugins();

export default function images() {
    return gulp
        .src(`${config.PATH.src.images}/**/*`)
        .pipe(changed(`${config.PATH.dist.images}`))
        .pipe($.if(config.PRODUCTION, $.imagemin()))
        .pipe(gulp.dest(config.PATH.dist.images));
}
