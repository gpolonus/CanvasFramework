
import { h, app } from 'hyperapp';
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import GameWrapper from './game/GameWrapper';
import EventRegistry from './objects/EventsRegistry';
import PlayerService from './objects/PlayerService';

const state = {
  ps: new PlayerService(),
  update: false
};

const actions = {
  setPlayers: () => (state, action) => ({
    update: true
  })
};

const init = async (canvas) => {
  await state.ps.fetchPlayers();
  actions.setPlayers();
  const cu = new CanvasUtil(canvas, { paneView: 'square' });
  const vp = new Viewport({
    x: -125, y: -125, w: 250, h: 250,
  });
  const du = new DrawingUtil(cu, vp);
  const er = new EventRegistry(canvas, {});
  GameWrapper.init(er, cu, du, state.ps);
};

const view = (state, actions) => (
  <div class="Game">
    <div id="log"></div>
    <div id="signIn">
      <div id="signInContents">
        <h2>GOING TO LEARN TO WRITE YOUR NAME</h2>
        <div>
          <input id="signInInput" />
        </div>
        <div>
          <button id="signInButton">START</button>
        </div>
      </div>
    </div>
    <div class="status" style={{
      position: 'absolute',
      top: CanvasUtil.getViewSquare().y + 'px',
      left: CanvasUtil.getViewSquare().x + 'px',
      backgroundColor: 'green',
      padding: '5px',
      zIndex: 2
    }}>{state.ps.map(p => (
      <div>{p.name}: {p.points}</div>
    ))}
    </div>
    <canvas oncreate={canvas => init(canvas)} onupdate={() => console.log('Canvas rendered')} />
  </div>
);

// app(state, actions, view, document.body);
app(state, {}, view, document.body);
