import rimraf from 'rimraf';

import * as config from './config';

export default function clean(done) {
    rimraf(config.PATH.clean, done);
}
