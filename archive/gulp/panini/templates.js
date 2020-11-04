import gulp from 'gulp';
import panini from 'panini';

import * as config from './config';

export default function templates() {
    return gulp
        .src(`${config.PATHS.src.templates.pages}/**/*.html`)
        .pipe(
            panini({
                root: `${config.PATHS.src.templates.pages}`,
                layouts: `${config.PATHS.src.templates.layouts}`,
                partials: `${config.PATHS.src.templates.partials}`,
                data: `${config.PATHS.src.templates.data}`,
                helpers: `${config.PATHS.src.templates.helpers}`,
            }),
        )
        .pipe(gulp.dest(config.PATHS.dist.folder));
}

export function resetTemplates(done) {
    panini.refresh();
    done();
}
