import {parallel, series} from 'gulp';

import clean from './clean';
import copy from './copy';
import images from './images';
import javascript from './javascript';
import templates from './templates';
import server from './server';
import stylelint from './stylelint';
import styles from './styles';
import watch from './watch';

export {
    clean,
    copy,
    images,
    javascript,
    server,
    stylelint,
    styles,
    templates,
    watch,
};

export function build(done) {
    series(clean, parallel(templates, javascript, images, copy), styles)(done);
}

export default series(build, server, watch);
