import gulp from 'gulp';

import { reload } from './server';
import * as config from './config';
import copy from './copy';
import images from './images';
import javascript from './javascript';
import postcss from './postcss';
import stylelint from './stylelint';
import templates from './templates';

export default function watch() {
    gulp.watch(config.PATHS.src.staticAssets, copy);
    gulp.watch(`${config.PATHS.src.templates}/**/*.{html,njk}`).on(
        'all',
        gulp.series(templates, reload)
    );
    gulp.watch(`${config.PATHS.src.css}/**/*.css`).on(
        'all',
        gulp.series(postcss, stylelint)
    );
    gulp.watch(`${config.PATHS.src.javascript}/**/*.js`).on(
        'all',
        gulp.series(javascript, reload)
    );
    gulp.watch(`${config.PATHS.src.images}/**/*`).on(
        'all',
        gulp.series(images, reload)
    );
}
