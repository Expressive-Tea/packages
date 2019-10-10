import {getStages} from "../helpers";
import {BOOT_STAGES} from "../constants";

export abstract class Plugin {
  readonly settings = {};
  constructor(settings = {}) {
    this.settings = Object.assign({}, settings);
  }

  getRegisteredStage(stage: BOOT_STAGES) {
    const stages = getStages(this);
    return stages[stage] || [];
  }

  register() {}


}
