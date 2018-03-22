
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import GameWrapper from './game/GameWrapper';
import EventRegistry from './objects/EventsRegistry';

const init = () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);

  const cu = new CanvasUtil(canvas, { paneView: 'square' });
  const vp = new Viewport({
    x: -125, y: -125, w: 250, h: 250
  });
  const du = new DrawingUtil(cu, vp);
  const er = new EventRegistry(canvas, {});
  GameWrapper.init(er, cu, du);
};

init();
