import { getClass } from '@expressive-tea/commons/helpers/object-helper';
import { BOOT_STAGES } from '@expressive-tea/commons/constants';
import { ExpressiveTeaServerProps, ExpressiveTeaPluginProps } from '@expressive-tea/commons/interfaces';
import { getStages } from 'helpers';
import { findIndex, size, each } from 'lodash';
import { DependencyNotFound } from '../exceptions';

export abstract class Plugin {
  protected name: string;
  protected priority: number;
  protected dependencies: string[];

  private static isDependencyRegistered(dependencyName: string, dependencies: string[]): boolean {
    // tslint:disable-next-line:no-bitwise
    return !!~findIndex(dependencies, ['name', dependencyName]);
  }

  getRegisteredStage(stage: BOOT_STAGES) {
    const stages = getStages(this);
    return stages[stage] || [];
  }

  register(
    appSettings: ExpressiveTeaServerProps,
    registeredPlugins: ExpressiveTeaPluginProps[]
  ): ExpressiveTeaPluginProps[] {
    if (size(this.dependencies)) {
      each(this.dependencies, dependency => {
        if (
          !Plugin.isDependencyRegistered(dependency, registeredPlugins.map(d => d.name))
      ) {
          throw new DependencyNotFound(dependency);
        }
      });
    }
    registeredPlugins.push({
      name: this.name || getClass(this).name,
      priority: this.priority || 999
    });

    return registeredPlugins;
  }
}
