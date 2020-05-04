import browser from 'browser-sync';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import postcssPresetEnv from 'postcss-preset-env';
import tailwindcss from 'tailwindcss';

import * as config from './config';

const $ = plugins();

export default function postcss() {
    const postCssPlugins = [
        tailwindcss(),
        postcssPresetEnv({ stage: 1 }),
    ].filter(Boolean);

    return gulp
        .src(`${config.PATHS.src.css}/app.css`)
        .pipe($.sourcemaps.init())
        .pipe($.postcss(postCssPlugins))
        .pipe($.if(config.PRODUCTION, $.cleanCss({ compatibility: '*' })))
        .pipe($.if(!config.PRODUCTION, $.sourcemaps.write('.')))
        .pipe(gulp.dest(config.PATHS.dist.css))
        .pipe(browser.reload({ stream: true }));
}
