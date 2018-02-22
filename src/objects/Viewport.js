
export default class Viewport {
  constructor(dims) {
    dims = dims || {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    };

    this.x = dims.x;
    this.y = dims.y;
    this.w = dims.w;
    this.h = dims.h;
  }

  set({x: x, y: y, w: w, h: h}) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.w = w || this.w;
    this.h = h || this.h;
  }
}