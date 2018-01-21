export default class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  get x() {
    return this._x;
  }

  set x(x) {
    this._x = x;
  }

  get y() {
    return this._y;
  }

  set y(y) {
    this._y = y;
  }
}