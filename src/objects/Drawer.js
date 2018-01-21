import RandomUtil from '../utils/RandomUtil';

export default class Drawer {
  constructor(drawingUtil) {
    this.du = drawingUtil;
    const funcs = new Array(Math.round(Math.random() * 100)).fill(0).map(() => {
      const x = RandomUtil.random(1000);
      const y = RandomUtil.random(1000);
      const w = x + RandomUtil.random(500);
      const h = y + RandomUtil.random(500);
      const color = ['red', 'green', 'blue', 'yellow', 'grey'][RandomUtil.random(5)];
      return {
        x: x,
        y: y,
        w: w,
        h: h,
        color: color
      };
    }).map((dims) => {
      return (() => {
        this.du.box(dims.x, dims.y, dims.w, dims.h, 'black', 3);
        this.du.rectangle(dims.x, dims.y, dims.w, dims.h, dims.color);
      });
    });
    this.background = () => {
      funcs.map(func => func());
    }
  }

}
