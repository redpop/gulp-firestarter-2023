const { dest, src } = require('gulp');

const autoprefixer = require('autoprefixer');
const browser = require('browser-sync');
const dartSass = require('sass');
const inlineSvg = require('postcss-inline-svg');
const plugins = require('gulp-load-plugins');

const config = require('../config');
const env = require('../env');

const $ = plugins();

function styles() {
    const sass = $.sass(dartSass);
    const postCssPlugins = [autoprefixer, inlineSvg()].filter(Boolean);

    return src(`${config.stylesSrcPath}/app.scss`)
        .pipe($.if(!env.PRODUCTION, $.sourcemaps.init()))
        .pipe(
            sass({
                includePaths: config.includePathsForSass,
            }).on('error', sass.logError),
        )
        .pipe($.postcss(postCssPlugins))
        .pipe(
            $.if(
                env.PRODUCTION,
                $.cleanCss({
                    compatibility: '*',
                    level: 2,
                }),
                $.cleanCss({
                    compatibility: '*',
                    level: 2,
                    format: 'beautify',
                }),
            ),
        )
        .pipe($.if(!env.PRODUCTION, $.sourcemaps.write('.')))
        .pipe(dest(config.stylesDistPath))
        .pipe(browser.reload({ stream: true }));
}

exports.styles = styles;
