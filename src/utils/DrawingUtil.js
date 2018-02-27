
export default class DrawingUtil {
  constructor(canvasUtil, vp) {
    this.cu = canvasUtil;
    this.vp = vp;
  }

  rectangle(x, y, w, h, color) {
    color = color || 'black';
    const newBox = this.scaleBox(x, y, w, h);
    this.cu.rectangle(
      newBox.x,
      newBox.y,
      newBox.w,
      newBox.h,
      color
    );
  }

  box(x, y, w, h, color, lineWidth) {
    const newBox = this.scaleBox(x, y, w, h);
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
    const scaledPoints = points.map(p => this.scalePoint(p.x, p.y));
    this.cu.points(scaledPoints, color, lineWidth);
  }

  background(color) {
    this.cu.background(color);
  }

  scalePoint(x, y) {
    return {
      x: (x - this.vp.x) / this.vp.w * this.cu.dims.width,
      y: (y - this.vp.y) / this.vp.h * this.cu.dims.height
    };
  }

  scaleBox(x, y, w, h) {
    const newPoint = this.scalePoint(x, y);
    return {
      x: newPoint.x,
      y: newPoint.y,
      w: w / this.vp.w * this.cu.dims.width,
      h: h / this.vp.h * this.cu.dims.height,
    };
  }
}
