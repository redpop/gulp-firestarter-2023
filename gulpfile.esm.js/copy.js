import { dest, src } from 'gulp';

import * as config from './config';

export default function copy() {
    return src(config.PATHS.src.staticAssets).pipe(
        dest(config.PATHS.dist.folder)
    );
}
