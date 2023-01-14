import { BOOT_STAGES } from '../constants';
import { getClass, getStage, setStage } from '../helpers';

export function Stage(stage: BOOT_STAGES, required: boolean = false): (target, propertyKey, descriptor) => void {
  return (target, propertyKey, descriptor) => {
    const selectedStage = getStage(stage, target);
    const item = {
      method: descriptor.value,
      name: [getClass(target).name, propertyKey].join(':'),
      required
    };

    selectedStage.unshift(item);
    setStage(stage, selectedStage, target);
  };
}
