
export default class DrawingUtil {
  constructor(canvasUtil, camera) {
    this.cu = canvasUtil;
    this.c = camera;
  }

  rectangle(x, y, w, h, color) {
    const newPoint = this.fixPoint(x, y);
    this.cu.rectangle(
      newPoint.x,
      newPoint.y,
      w / this.c.w * this.cu.dims.width,
      h / this.c.h * this.cu.dims.height,
      color
    );
  }

  box(x, y, w, h, color, lineWidth) {
    const newPoint = this.fixPoint(x, y);
    this.cu.box(
      newPoint.x,
      newPoint.y,
      w / this.c.w * this.cu.dims.width,
      h / this.c.h * this.cu.dims.height,
      color,
      lineWidth
    );
  }

  fixPoint(x, y) {
    return {
      x: (x - this.c.x) / this.c.w * this.cu.dims.width,
      y: (y - this.c.y) / this.c.h * this.cu.dims.height
    };
  }
}
