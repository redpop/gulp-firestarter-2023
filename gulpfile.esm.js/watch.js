import gulp from 'gulp';

import { reload } from './server';
import * as config from './config';
import copy from './copy';
import images from './images';
import javascript from './javascript';
import templates, { resetTemplates } from './templates';
import sass from './sass';

export default function watch() {
    gulp.watch(config.PATHS.src.staticAssets, copy);
    gulp.watch(`${config.PATHS.src.templates.pages}/**/*.html`).on(
        'all',
        gulp.series(templates, reload)
    );
    gulp.watch(`${config.PATHS.src.folder}/{layouts,partials}/**/*.html`).on(
        'all',
        gulp.series(resetTemplates, templates, reload)
    );
    gulp.watch(`${config.PATHS.src.folder}/data/**/*.{js,json,yml}`).on(
        'all',
        gulp.series(resetTemplates, templates, reload)
    );
    gulp.watch(`${config.PATHS.src.folder}/helpers/**/*.js`).on(
        'all',
        gulp.series(resetTemplates, templates, reload)
    );
    gulp.watch(`${config.PATHS.src.sass}/**/*.scss`).on(
        'all',
        gulp.series(sass, stylelint)
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
