export default class DrawingStack {
  constructor() {
    this.stack = [];
  }

  push(funcs) {
    if (funcs.length) {
      this.stack = this.stack.concat(funcs);
    } else {
      this.stack.push(funcs);
    }
  }

  draw(i) {
    if (i === undefined) {
      this.stack.map(drawingFunc => drawingFunc());
    } else {
      this.stack[i]();
    }
  }
}