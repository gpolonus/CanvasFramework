
import {render, random} from './functions';
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import Game from './game/Game';
import EventRegistry from './objects/EventsRegistry';

const init = () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  render(getStep(canvas));
};

const getStep = (canvas) => {
  const cu = new CanvasUtil(canvas, {paneView: 'square'});
  const vp = new Viewport({
    x: 0, y: 0, w: 1000, h: 1000
  });
  const du = new DrawingUtil(cu, vp);
  const dots = new Array(10).fill(0).map(() => ({
    x: random(1000),
    y: random(1000)
  }));
  const drawDots = dots => {
    du.points(dots);
  };
  const center = {
    x: 500,
    y: 500
  };
  // const g = new Game(du);
  const er = new EventRegistry(canvas, {
    'left': () => center.x--,
    'up': () => center.y--,
    'right': () => center.x++,
    'down': () => center.y++
  });
  er.key(37, {'down': 'left'});
  er.key(38, {'down': 'up'});
  er.key(39, {'down': 'right'});
  er.key(40, {'down': 'down'});
  return () => {
    // always trigger events first
    er.triggerEvents();
    // draw background before drawing other things
    cu.background('grey');
    // always set the viewport before drawing other things
    // else animation errors occur
    vp.set({
      x: center.x - 500,
      y: center.y - 500,
    });
    // draw things
    du.rectangle(center.x - 5, center.y - 5, 30, 30);
    drawDots(dots);
  };
};

init();
