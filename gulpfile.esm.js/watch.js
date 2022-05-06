import gulp from 'gulp';

import {reload} from './server';
import * as config from './config';
import copy from './copy';
import images from './images';
import javascript from './javascript';
import stylelint from './stylelint';
import styles from './styles';
import templates from './templates';

export default function watch() {
    gulp.watch(config.PATH.src.staticAssets, copy);
    gulp.watch(`${config.PATH.src.templates}/**/*`).on(
        'all',
        gulp.series(templates, styles, reload, stylelint),
    );
    gulp.watch(`${config.PATH.src.css}/**/*.scss`).on(
        'all',
        gulp.series(styles, stylelint),
    );
    gulp.watch(`${config.PATH.src.javascript}/**/*.js`).on(
        'all',
        gulp.series(javascript, reload),
    );
    gulp.watch(`${config.PATH.src.images}/**/*`).on(
        'all',
        gulp.series(images, reload),
    );
}
