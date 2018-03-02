export default class DrawingStack {
  constructor(du) {
    this.stack = {};
  }

  push(key, func) {
    this.stack[key] = func;
  }

  remove(i) {
    delete this.stack[i];
  }

  draw(du) {
    Object.keys(this.stack).map(key => this.stack[key](du));
  }
}