import {PACKAGES_FOLDER, PACKAGES_PATHS} from './setup';
import {task, series, dest} from 'gulp';
import {createProject} from 'gulp-typescript';
import * as sourcemaps from 'gulp-sourcemaps';
import * as log from 'fancy-log';
import {Stream} from 'stream';

const registeredPackages = {
    plugin: createProject('packages/plugin/tsconfig.json')
};

const modules = Object.keys(registeredPackages);
const distId = process.argv.indexOf('--dist');
const dist = distId < 0 ? source : process.argv[distId + 1];

function buildPackage(name: string): Stream {
    log(`Building ${name}...`);
    return registeredPackages[name]
        .src()
        .pipe(registeredPackages[name]())
        .pipe(dest(`${dist}/${name}`));
}

function buildPackageDev(name: string): Stream {
    log(`Building Dev ${name}...`);
    return registeredPackages[name]
        .src()
        .pipe(sourcemaps.init(0, '', 0, undefined))
        .pipe(registeredPackages[packageName]())
        .pipe(
            sourcemaps.mapSources(
                (sourcePath: string) => './' + sourcePath.split('/').pop(),
            ),
        )
        .pipe(sourcemaps.write('.', {}))
        .pipe(dest(`${dist}/${name}`));
}

modules.forEach(packageName => {
    task(packageName, () => buildPackage(packageName));
    task(`${packageName}:dev`, () => buildPackageDev(packageName));
});

task('build', series(modules));
task('build:dev', series(modules.map(packageName => `${packageName}:dev`)));
