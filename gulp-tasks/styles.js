import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import dartSass from 'sass';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

import * as config from './config';

const $ = plugins();

export default function styles() {
    const sass = $.sass(dartSass);
    const postCssPlugins = [
        autoprefixer,
    ].filter(Boolean);
    return gulp.src(`${config.PATH.src.css}/app.scss`).
        pipe($.if(!config.PRODUCTION, $.sourcemaps.init())).
        pipe(
            sass({
                includePaths: config.PATH.includePathsForSass,
            }).on('error', sass.logError),
        ).
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
        pipe($.if(!config.PRODUCTION, $.sourcemaps.write('.'))).
        pipe(gulp.dest(config.PATH.dist.css)).
        pipe(browser.reload({stream: true}));
}
