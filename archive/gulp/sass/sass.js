import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

import * as config from './config';

const $ = plugins();

export default function sass() {
    const postCssPlugins = [autoprefixer()].filter(Boolean);

    return gulp
        .src(`${config.PATH.src.sass}/app.scss`)
        .pipe($.sourcemaps.init())
        .pipe(
            $.sass({
                includePaths: config.PATH.inlcudePathsForSass,
            }).on('error', $.sass.logError),
        )
        .pipe($.postcss(postCssPlugins))
        .pipe($.if(config.PRODUCTION, $.cleanCss({compatibility: '*'})))
        .pipe($.if(!config.PRODUCTION, $.sourcemaps.write('.')))
        .pipe(gulp.dest(config.PATH.dist.css))
        .pipe(browser.reload({stream: true}));
}
