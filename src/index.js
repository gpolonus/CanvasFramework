
import {render, random, log, once} from './functions';
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
  let pickedUp = -1;
  const pickUp = () => {
    pickedUp = dots.findIndex(dot => {
      return dot.x < center.x + 15 &&
        dot.y < center.y + 15 &&
        center.x - 15 < dot.x &&
        center.y - 15 < dot.y;
    });
  }
  const er = new EventRegistry(canvas, {
    'left': () => center.x -= 2,
    'up': () => center.y -= 2,
    'right': () => center.x += 2,
    'down': () => center.y += 2,
    'pickUp': once(pickUp),
    'reset-pickUp': () => {
      pickedUp = -1;
      er.addTrigger('pickUp', once(pickUp));
    }
  });
  er.key(37, {'down': 'left'});
  er.key(38, {'down': 'up'});
  er.key(39, {'down': 'right'});
  er.key(40, {'down': 'down'});
  er.key(32, {'down': 'pickUp'});
  er.key(32, {'up': 'reset-pickUp'});
  return () => {
    // always trigger events first
    er.triggerEvents();
    if(pickedUp !== -1) {
      Object.assign(dots[pickedUp], center);
    }
    // draw background before drawing other things
    cu.background('grey');
    // always set the viewport before drawing other things
    // else animation errors occur
    vp.set({
      x: center.x - 500,
      y: center.y - 500,
    });
    // draw things
    du.rectangle(center.x - 15, center.y - 15, 30, 30);
    drawDots(dots);
  };
};

init();
