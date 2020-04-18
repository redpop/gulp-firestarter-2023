import { parallel, series } from 'gulp';

import clean from './clean';
import copy from './copy';
import images from './images';
import javascript from './javascript';
import templates from './templates';
import sass from './sass';
import server from './server';
import stylelint from './stylelint';
import watch from './watch';

export {
    clean,
    copy,
    images,
    javascript,
    sass,
    server,
    stylelint,
    templates,
    watch,
};

export function build(done) {
    series(clean, parallel(templates, javascript, images, copy), sass)(done);
}

export default series(build, server, watch);
