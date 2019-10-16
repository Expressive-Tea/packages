import {task, src} from 'gulp';
import {PACKAGES_FOLDER} from '../setup';
import * as clean from 'gulp-clean';
import {Stream} from 'stream';

function cleanOutput(): Stream {
    return src(
        [
            `${PACKAGES_FOLDER}/**/*.js`,
            `${PACKAGES_FOLDER}/**/*.d.ts`,
            `${PACKAGES_FOLDER}/**/*.js.map`,
            `${PACKAGES_FOLDER}/**/*.d.ts.map`,
        ],
        {
            read: false,
        },
    ).pipe(clean());
}

task('clean:dist', cleanOutput);
