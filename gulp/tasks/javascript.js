const { dest } = require('gulp');

const { babel } = require('@rollup/plugin-babel');
const buffer = require('vinyl-buffer');
const nodeResolve = require('@rollup/plugin-node-resolve');
const multiEntry = require('@rollup/plugin-multi-entry');
const plugins = require('gulp-load-plugins');
const rollup = require('@rollup/stream');
const source = require('vinyl-source-stream');
const terser = require('gulp-terser');

const config = require('../config');
const env = require('../env');

const $ = plugins();

let javascripCache;

function javascript() {
    const options = {
        input: {
            include: config.javascriptEntries,
        },
        cache: javascripCache,
        plugins: [multiEntry(), nodeResolve(), babel({ babelHelpers: 'bundled' })],
        output: {
            format: 'iife',
            sourcemap: true,
        },
    };
    return rollup(options)
        .on('bundle', (bundle) => {
            javascripCache = bundle;
        })
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe($.if(env.PRODUCTION, terser({ keep_fnames: true, mangle: false })))
        .pipe(dest(config.javascriptDistPath));
}

exports.javascript = javascript;
