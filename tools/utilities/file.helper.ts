import {readdirSync, statSync} from 'fs';
import {join} from 'path';

export default class FileHelper {
    static isDirectory(path: string): boolean {
        return statSync(path).isDirectory();
    }

    static getFolders(dir: string): string[] {
        return readdirSync(dir).filter(file => FileHelper.isDirectory(join(dir, file)));
    }

    static getDirs(base: string): string[] {
        return FileHelper.getFolders(base).map(path => `${base}/${path}`);
    }
}
