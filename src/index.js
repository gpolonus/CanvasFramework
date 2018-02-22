
import {render, random} from './functions';
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import Game from './game/Game';

const init = () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  render(getStep(canvas));
};

const getStep = (canvas) => {
  const cu = new CanvasUtil(canvas, {paneView: 'square'});
  const vp = new Viewport({
    x: 0, y: 0, w: 100, h: 100
  });
  const du = new DrawingUtil(cu, vp);
  const dots = new Array(random(10)).fill(0).map(() => ({
    x: random(100),
    y: random(100)
  }));
  const drawDots = dots => {
    du.points(dots);
  };
  const center = {
    x: 50,
    y: 50
  };
  const g = new Game(du);
  return () => {
    cu.background('grey');
    drawDots(dots);
    du.rectangle(center.x - 5, center.y - 5, 10, 10);
    vp.set({
      x: center.x - 20,
      y: center.y - 20,
      // w: 40,
      // h: 40
    });
  };
};

init();
