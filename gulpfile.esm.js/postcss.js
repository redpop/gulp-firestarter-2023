import browser from 'browser-sync';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import rename from 'gulp-rename';
import tailwindcss from 'tailwindcss';

import * as config from './config';

const $ = plugins();

export default function postcss() {
    const postCssPlugins = [
        postcssImport,
        tailwindcss,
        postcssPresetEnv({stage: 1}),
    ].filter(Boolean);
    return gulp.src(`${config.PATH.src.css}/app.pcss`).
    pipe($.if(!config.PRODUCTION, $.sourcemaps.init())).
    pipe($.postcss(postCssPlugins)).
    pipe($.if(config.PRODUCTION,
        $.cleanCss(
            {
                compatibility: '*',
                level: 2,
            }),
        $.cleanCss(
            {
                compatibility: '*',
                level: 2,
                format: 'beautify',
            }),
    )).
    pipe(
        rename((path) => {
            path.extname = '.css';
        }),
    ).
    pipe($.if(!config.PRODUCTION, $.sourcemaps.write('.'))).
    pipe(gulp.dest(config.PATH.dist.css)).
    pipe(browser.reload({stream: true}));
}
