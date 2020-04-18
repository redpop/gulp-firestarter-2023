import rimraf from 'rimraf';

import * as config from './config';

export default function clean(done) {
    rimraf(config.PATHS.clean, done);
}
