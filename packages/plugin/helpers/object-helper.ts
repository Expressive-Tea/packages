import { PLUGIN_STAGES_KEY } from '../constants';
import {StorageManager} from './storage-helper';

/**
 * Get the provide constructor if target is an instance.
 * @param target
 * @returns {*}
 * @ignore
 */
export function getClass(target: any): any {
  return target.prototype ? target : target.constructor;
}

export function getStages(target) {
  return StorageManager.get(PLUGIN_STAGES_KEY, getClass(target)) || {};
}

export function getStage(stage, target) {
  const stages = getStages(target);
  if (!stages[stage]) {
    stages[stage] = [];
  }

  return stages[stage];
}

export function setStage(stage, value, target) {
  const stages = getStages(target);
  stages[stage] = value;
  StorageManager.set(PLUGIN_STAGES_KEY, stages, getClass(target));
}
