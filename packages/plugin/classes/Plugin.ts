import { getStages, getClass } from '../helpers';
import { BOOT_STAGES } from '../constants';
import {
	ExpressiveTeaServerProps,
	ExpressiveTeaPluginProps,
	ExpressiveTeaPluginSettings
} from '../interfaces';
import { findIndex, size, each } from 'lodash';
import { DependencyNotFound } from '../exceptions';

export abstract class Plugin {
	readonly settings: ExpressiveTeaPluginSettings = {};
	protected name: string;
	protected priority: number;
	protected dependencies: string[];

	private static isDependencyRegistered(dependencyName: string, dependencies: string[]): boolean {
		// tslint:disable-next-line:no-bitwise
		return !!~findIndex(dependencies, ['name', dependencyName]);
	}

	constructor(settings: ExpressiveTeaPluginSettings = {}) {
		this.settings = Object.assign({}, settings);
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
				if (!Plugin.isDependencyRegistered(dependency, registeredPlugins.map(d => d.name))) {
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
