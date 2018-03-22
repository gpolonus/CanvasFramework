export default class DrawingStack {
  constructor() {
    this.stack = {};
  }

  push(key, func) {
    this.stack[key] = func;
  }

  remove(i) {
    delete this.stack[i];
  }

  draw(du) {
    Object.values(this.stack).map(value => value(du));
  }
}