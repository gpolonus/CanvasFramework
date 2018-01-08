export default class DrawingStack {
  constructor() {
    this.stack = [];
  }

  push(funcs) {
    if (funcs.length) {
      funcs.map(func => this.stack.push(func));
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