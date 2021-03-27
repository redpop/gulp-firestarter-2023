import {dest, src} from 'gulp';

import * as config from './config';

export default function copy() {
    return src(config.PATH.src.staticAssets).pipe(
        dest(config.PATH.dist.folder),
    );
}
