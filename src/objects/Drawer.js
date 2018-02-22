import random from '../functions/random';

export default class Drawer {
  constructor(drawingUtil) {
    this.du = drawingUtil;
    const funcs = new Array(Math.round(Math.random() * 100)).fill(0).map(() => {
      const x = random(1000);
      const y = random(1000);
      const w = x + random(500);
      const h = y + random(500);
      const color = ['white', 'grey'][random(2)];
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
