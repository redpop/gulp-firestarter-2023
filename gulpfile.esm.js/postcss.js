import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import fibers from 'fibers';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
// import rename from 'gulp-rename';

import * as config from './config';

const $ = plugins();

export default function postcss() {
    const postCssPlugins = [
        autoprefixer,
    ].filter(Boolean);
    return gulp.src(`${config.PATH.src.css}/app.scss`).
        pipe($.if(!config.PRODUCTION, $.sourcemaps.init())).
        pipe(
            $.dartSass({
                includePaths: config.PATH.includePathsForSass,
                fiber: fibers,
            }).on('error', $.dartSass.logError),
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
        // pipe(
        //     rename((path) => {
        //         path.extname = '.css';
        //     }),
        // ).
        pipe($.if(!config.PRODUCTION, $.sourcemaps.write('.'))).
        pipe(gulp.dest(config.PATH.dist.css)).
        pipe(browser.reload({stream: true}));
}
