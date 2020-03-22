import { PACKAGES_FOLDER } from '../setup';
import { task, series, dest } from 'gulp';
import { createProject } from 'gulp-typescript';
import * as log from 'fancy-log';
import { Stream } from 'stream';

const registeredPackages = {
  commons: createProject('packages/commons/tsconfig.json'),
  plugin: createProject('packages/plugin/tsconfig.json')
};

const modules = Object.keys(registeredPackages);

function buildPackage(name: string): Stream {
  log(`Building ${name}...`);
  return registeredPackages[name]
    .src()
    .pipe(registeredPackages[name]())
    .pipe(dest(`${PACKAGES_FOLDER}/${name}`));
}

modules.forEach(packageName => {
  task(`${packageName}`, () => buildPackage(packageName));
});

task('build', series(modules));
