export default class Renderer {
  constructor(func) {
    this.func = () => {
      func();
    }
  }

  start() {
    this._run();
  }

  _run() {
    this.func();
    requestAnimationFrame(() => this._run());
  }
}