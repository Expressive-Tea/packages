import {getStages} from "../helpers";

export abstract class Plugin {
  readonly settings = {};
  constructor(settings = {}) {
    this.settings = Object.assign({}, settings);
  }
  register() {
    const stages = getStages(this);
    console.log(this.settings, stages);
    throw new Error("You must implement the Register Method.");
  }
}
