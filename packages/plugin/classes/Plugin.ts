export abstract class Plugin {
  register() {
    throw new Error("You must implement the Register Method.");
  }
}
