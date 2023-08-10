import {babel} from '@rollup/plugin-babel';
import buffer from 'vinyl-buffer';
import gulp from 'gulp';
import nodeResolve from '@rollup/plugin-node-resolve';
import multiEntry from '@rollup/plugin-multi-entry';
import plugins from 'gulp-load-plugins';
import rollup from '@rollup/stream';
import source from 'vinyl-source-stream';
import terser from 'gulp-terser';

import * as config from './config';

const $ = plugins();

let cache;

export default function javascript() {
    const options = {
        input: {
            include: config.PATH.src.javascriptEntries,
        },
        cache,
        plugins: [
            multiEntry(),
            nodeResolve(),
            babel({babelHelpers: 'bundled'}),
        ],
        output: {
            format: 'iife',
            sourcemap: true,
        },
    };
    return rollup(options).
    on('bundle', (bundle) => {
        cache = bundle;
    }).
    pipe(source('app.js')).
    pipe(buffer()).
    pipe($.if(!config.PRODUCTION, $.sourcemaps.init({loadMaps: true}))).
    pipe($.if(config.PRODUCTION, terser({keep_fnames: true, mangle: false}))).
    pipe($.if(!config.PRODUCTION,
        $.sourcemaps.write(config.PATH.dist.javascript))).
    pipe(gulp.dest(config.PATH.dist.javascript));
}
