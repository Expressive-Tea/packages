export class DependencyNotFound extends  Error {
    message: string = 'Unknown Dependency';
    dependencyName: string = 'Unknown';

    constructor(dependencyName = 'Unknown') {
        super();
        this.dependencyName = dependencyName;
        this.message = `Dependency ${dependencyName} was not satisfied`;
    }
}
