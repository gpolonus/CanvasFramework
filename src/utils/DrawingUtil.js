
export default class DrawingUtil {
  constructor(canvasUtil, vp) {
    this.cu = canvasUtil;
    this.vp = vp;
  }

  rectangle(x, y, w, h, color) {
    color = color || 'black';
    const newBox = this.fixBox(x, y, w, h);
    this.cu.rectangle(
      newBox.x,
      newBox.y,
      newBox.w,
      newBox.h,
      color
    );
  }

  box(x, y, w, h, color, lineWidth) {
    const newBox = this.fixBox(x, y, w, h);
    this.cu.box(
      newBox.x,
      newBox.y,
      newBox.w,
      newBox.h,
      color,
      lineWidth
    );
  }

  points(points, color, lineWidth) {
    color = color || 'black';
    lineWidth = lineWidth || 2;
    this.cu.points(points.map(p => this.fixPoint(p.x, p.y)), color, lineWidth);
  }

  fixPoint(x, y) {
    return {
      x: (x - this.vp.x) / this.vp.w * this.cu.dims.width,
      y: (y - this.vp.y) / this.vp.h * this.cu.dims.height
    };
  }

  fixBox(x, y, w, h) {
    const newPoint = this.fixPoint(x, y);
    return {
      x: newPoint.x,
      y: newPoint.y,
      w: w / this.vp.w * this.cu.dims.width,
      h: h / this.vp.h * this.cu.dims.height,
    };
  }
}
