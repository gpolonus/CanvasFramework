
import { h, app } from 'hyperapp';
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import GameWrapper from './game/GameWrapper';
import EventRegistry from './objects/EventsRegistry';
import PlayerService from './objects/PlayerService';
import RoomService from './objects/RoomService';
import LoadingModalContent from './components/LoadingModalContent'

const state = {
  formState: 'hosting',
  hosting: false,
  numPlayers: 0,
  playerNames: [''],
  room: -1,
  ready: false,
  rooms: []
};

const actions = {
  hosting: (yesno) => () => ({hosting: yesno, formState: 'multipleplayers'}),
  numPlayers: (e) => () => ({numPlayers: e.target.value}),
  setNumPlayers: () => () => ({formState: 'signin'}),
  changeName: (e) => (state) => {
    const playerNames = [...state.playerNames];
    playerNames[state.playerNames.length - 1] = e.target.value;
    return {playerNames};
  },
  enterName: () => (state) => {
    if (state.hosting && state.numPlayers === state.playerNames.length) {
      RoomService.createRoom(state.playerNames);
    }
    return {
      playerNames: [...state.playerNames, ''],
      formState: state.numPlayers === state.playerNames.length ? 'viewRooms' : 'signin'
    };
  },
  fetchRoomData: () => async (_, actions) => actions.gotRoomUpdate(
    await RoomService.getOpenRooms(state.hosting, actions.gotRoomUpdate)
  ),
  gotRoomUpdate: rooms => () => ({rooms}),
  setRoom: roomId => () => ({room: roomId}),
  readyToggle: () => (state) => {
    if(!state.ready) {
      RoomService.addToRoom(state.roomId, state.playerNames);
    }
    return {ready: !state.ready};
  },
  start: () => (state) => {

  }
};

const Aux = ({children}) => children;

const startForm = (state, actions) => {
  switch(state.formState) {
    case 'hosting':
      return (
        <Aux>
          <h2>Are you hosting?</h2>
          <div>
            <span class="button" onclick={actions.hosting(true)}>Yes</span>
            <span class="button" onclick={actions.hosting(false)}>No</span>
          </div>
        </Aux>
      );
    case 'multipleplayers':
      return (
        <Aux>
          <h2>How many players locally?</h2>
          <div>
            <span>
              <select onchange={actions.numPlayers} value={state.numPlayers}>
                <option value="1" selected>1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </span>
            <span class="button" onclick={actions.setNumPlayers}></span>
          </div>
        </Aux>
      );
    case 'signin':
      return (
        <Aux>
          <h2>GOING TO LEARN TO WRITE YOUR NAME: Player {state.players.length}</h2>
          <div>
            <input class="signInInput" onchange={actions.changeName} value={state.playerNames[state.playerNames.length - 1]} />
          </div>
          <div>
            <button class="signInButton" onclick={actions.enterName}>ENTER</button>
          </div>
        </Aux>
      );
    case 'viewRooms':
      if(state.rooms.length === 0) {
        actions.fetchRoomData();
        return LoadingModalContent;
      } else {
        return (
          <Aux>
            <h2>Open Rooms</h2>
            <div>
              {state.rooms.length ?
                state.rooms.map(room => {
                  <div
                    class={'room-row' + state.room === room.id ? ' room-selected' : '' }
                    onclick={() => actions.setRoom(room.id)}
                  >
                    <span>
                    {room.players.length ?
                      room.players.join(', ') :
                      'No players in this room'}
                    </span>
                  </div>
                }) :
                <div>No open rooms</div>
              }
            </div>
            {state.room !== -1 ?
              <div>
                <span class={'button ' + state.ready ? 'ready' : 'unready'} onclick={actions.readyToggle}>
                  {state.ready ? 'Ready Up' : 'Unready'}
                </span>
              </div> : null
            }
            {state.host ?
              <div>
                <span class="button" onclick={actions.start}>Start</span>
              </div> : null
            }
          </Aux>
        );
      }
    // case 'done':
    //   return <Aux>
    //     <canvas oncreate={canvas => init(canvas)} onupdate={() => console.log('Canvas rendered')} />
    //     <canvas oncreate={canvas => init(canvas)} onupdate={() => console.log('Canvas rendered')} />
    //   </Aux>
    default:
      alert('SOMETHING IS WRONG');
      return null;
  }
}

const init = async (canvas) => {
  // await state.ps.fetchPlayers();
  // actions.setPlayers();
  const cu = new CanvasUtil(canvas, { paneView: 'square' });
  const vp = new Viewport({
    x: -125, y: -125, w: 250, h: 250,
  });
  const du = new DrawingUtil(cu, vp);
  const er = new EventRegistry(canvas, {});
  GameWrapper.init(er, cu, du, state.ps);
};

const view = (state, actions) => (
  <div class="main">
    <div id="log"></div>
    <div class="modal">
      <div class="modalContents">
        {startForm(state, actions)}
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
  </div>
);

// app(state, actions, view, document.body);
app(state, actions, view, document.body);
