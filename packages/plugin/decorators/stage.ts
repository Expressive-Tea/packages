import {BOOT_STAGES} from "../constants";
import {getStage, setStage} from "../helpers";;

export function Stage(stage: BOOT_STAGES): (target, propertyKey, descriptor) => void {
    return (target, propertyKey, descriptor) => {
        const selectedStage = getStage(stage, target);
        const item = {
            method: descriptor.value.bind(target)
        };

        selectedStage.unshift(item);
        setStage(stage, selectedStage, target);
    };
}

