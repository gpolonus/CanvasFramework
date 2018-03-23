
import {render, random, log, once} from './functions';
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import Game from './game/Game';
import GameWrapper from './game/GameWrapper';
import EventRegistry from './objects/EventsRegistry';
import PlayerService from './objects/PlayerService';
import axios from 'axios';

const init = async () => {

  const ps = new PlayerService();
  await ps.fetchPlayers();

  const statusCanvas = document.createElement('canvas');
  const drawCanvas = document.createElement('canvas');
  document.body.appendChild(statusCanvas);
  document.body.appendChild(drawCanvas);

  const statusCU = new CanvasUtil(statusCanvas, { paneView: 'square' });
  statusCanvas.style.zIndex = 3;
  const drawCU = new CanvasUtil(drawCanvas, { paneView: 'square' });
  drawCanvas.style.zIndex = 2;
  const vp = new Viewport({
    x: -125, y: -125, w: 250, h: 250
  });
  const du = new DrawingUtil(drawCU, vp);
  const er = new EventRegistry(statusCanvas, {});
  GameWrapper.init(er, statusCU, drawCU, du, ps);
};

init();
