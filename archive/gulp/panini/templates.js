import gulp from 'gulp';
import panini from 'panini';

import * as config from './config';

export default function templates() {
    return gulp
        .src(`${config.PATH.src.templates.pages}/**/*.html`)
        .pipe(
            panini({
                root: `${config.PATH.src.templates.pages}`,
                layouts: `${config.PATH.src.templates.layouts}`,
                partials: `${config.PATH.src.templates.partials}`,
                data: `${config.PATH.src.templates.data}`,
                helpers: `${config.PATH.src.templates.helpers}`,
            }),
        )
        .pipe(gulp.dest(config.PATH.dist.folder));
}

export function resetTemplates(done) {
    panini.refresh();
    done();
}
