import gulp from 'gulp';
import named from 'vinyl-named';
import plugins from 'gulp-load-plugins';
import webpack2 from 'webpack';
import webpackStream from 'webpack-stream';

import * as config from './config';

const $ = plugins();

const webpackConfig = {
    mode: config.PRODUCTION ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        compact: false,
                    },
                },
            },
        ],
    },
    devtool: !config.PRODUCTION && 'source-map',
};

export default function javascript() {
    return gulp
        .src(config.PATHS.src.javascriptEntries)
        .pipe(named())
        .pipe($.sourcemaps.init())
        .pipe(webpackStream(webpackConfig, webpack2))
        .pipe(
            $.if(
                config.PRODUCTION,
                $.uglify().on('error', (event) => {
                    console.log(event); // eslint-disable-line no-console
                }),
            ),
        )
        .pipe($.if(!config.PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(config.PATHS.dist.javascript));
}
