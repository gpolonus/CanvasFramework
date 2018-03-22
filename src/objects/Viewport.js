
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

  set({x, y, w, h}) {
    this.x = x || this.x;
    this.y = y || this.y;
    this.w = w || this.w;
    this.h = h || this.h;
  }

  center() {
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2
    };
  }
}