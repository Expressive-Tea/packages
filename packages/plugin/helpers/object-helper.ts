import { getClass } from '@expressive-tea/commons/helpers/object-helper';
import { PLUGIN_STAGES_KEY } from '../constants';
import {StorageManager} from './storage-helper';

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
