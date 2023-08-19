import { babel } from '@rollup/plugin-babel';
import { cacheBuild } from 'rollup-cache';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import progress from 'rollup-plugin-progress';
import { terser } from 'rollup-plugin-terser';

import config from './gulp/config.js';
import env from './gulp/env.js';

const MANUAL_CHUNKS = {
    // popperjs: ['node_modules/@popperjs/core'],
};

const cacheConfig = {
    name: 'app',
    dependencies: ['rollup.config.mjs'],
    prebuild: !env.PRODUCTION ? ['bootstrap'] : [''],
};

const onwarn = (warning) => {
    console.warn(`(!) ${warning.message}`);
};

export default cacheBuild(cacheConfig, {
    input: {
        app: config.javascriptEntries,
    },
    onwarn,
    treeshake: env.PRODUCTION,
    plugins: [
        replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            preventAssignment: true,
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true,
        }),
        commonjs({
            transformMixedEsModules: true,
        }),
        nodeResolve(),
        babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' }),
        env.PRODUCTION && terser({ ecma: 2021, module: true }),
        !env.PRODUCTION && progress(),
    ],
    output: {
        dir: config.javascriptDistPath,
        format: 'es',
        sourcemap: !env.PRODUCTION,
        manualChunks: MANUAL_CHUNKS,
    },
});
