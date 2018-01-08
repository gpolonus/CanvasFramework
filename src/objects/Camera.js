
export default class Camera {
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
}