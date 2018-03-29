
import { h, app } from 'hyperapp';
import { limit, render, random, randomColor } from './functions';
import CanvasUtil from './utils/CanvasUtil';
import Viewport from './objects/Viewport';
import DrawingUtil from './utils/DrawingUtil';
import GameWrapper from './game/GameWrapper';
import EventRegistry from './objects/EventsRegistry';
import PlayerService from './objects/PlayerService';
import RoomService from './objects/RoomService';
import LoadingModalContent from './components/LoadingModalContent'

const initState = {
  formState: 'hosting',
  hosting: false,
  numPlayers: 1,
  localPlayers: {0: ''},
  playerEnteringId: 0,
  roomId: -1,
  ready: false,
  rooms: null
};

const initActions = {
  hosting: (yesno) => () => {
    return {hosting: yesno, formState: 'multipleplayers'}
  },
  numPlayers: (e) => () => ({numPlayers: e.target.value}),
  setNumPlayers: () => () => ({formState: 'signin'}),
  changeName: (e) => (state) => {
    const localPlayers = {...state.localPlayers};
    localPlayers[state.playerEnteringId] = e.target.value;
    return {localPlayers};
  },
  enterName: () => (state) => {
    const localPlayers = {...state.localPlayers};
    let playerEnteringId = state.playerEnteringId;
    let formState = 'signin';
    if (state.numPlayers === playerEnteringId + 1) {
      if(state.hosting) {
        formState = 'hostRoom';
      } else {
        formState = 'viewRooms';
      }
    } else {
      localPlayers[++playerEnteringId] = '';
    }
    return {
      playerEnteringId,
      localPlayers,
      formState
    };
  },
  fetchRoomData: () => (state, actions) => {
    if(state.roomId === -1) {
      let first = true;
      RoomService.getOpenRooms(rooms => {
        if(state.hosting && first) {
          const newRoomName = RoomService.getNewRoomName(rooms);
          first = false;
          RoomService.createRoom(newRoomName, state.localPlayers).then(() => {
            actions.setState({roomId: newRoomName});
          });
        } else {
          actions.gotRoomUpdate(rooms);
        }
      });
    }
  },
  setState: obj => () => obj,
  gotRoomUpdate: rooms => () => {
    console.log(rooms);
    return {rooms}
  },
  setRoom: roomId => () => {
    return ({roomId: roomId, ready: false});
  },
  readyToggle: () => (state) => {
    const ready = !state.ready;
    if(ready) {
      RoomService.putInRoom(state.roomId, state.localPlayers, state.rooms);
    } else {
      RoomService.takeFromRoom(state.roomId, state.localPlayers, state.rooms);
    }
    return {ready};
  },
  start: () => async (state, actions) => {
    await RoomService.startGame(state.roomId, state.rooms);
    actions.startGame();
  },
  startGame: () => () => ({formState: 'game'})
};

const Aux = (parent, children) => {
  return children
};

const startForm = (state, actions) => {
  switch(state.formState) {
    case 'hosting':
      return (
        <Aux>
          <h2>Are you hosting?</h2>
          <div>
            <span class="button" onclick={() => actions.hosting(true)}>Yes</span>
            <span class="button" onclick={() => actions.hosting(false)}>No</span>
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
                {Array(6).fill().map((_, i) => <option value={i + 1}>{i + 1}</option>)}
              </select>
            </span>
            <span class="button" onclick={actions.setNumPlayers}>NEXT</span>
          </div>
        </Aux>
      );
    case 'signin':
      return (
        <Aux>
          <h2>GOING TO LEARN TO WRITE YOUR NAME: Player {Object.values(state.localPlayers).length}</h2>
          <div>
            <input
              class="signInInput"
              // onchange={actions.changeName}
              onkeyup={actions.changeName}
              value={state.localPlayers[Object.values(state.localPlayers).length - 1]}
            />
          </div>
          <div>
            <button
              class="button"
              onclick={actions.enterName}
              disabled={!state.localPlayers[Object.values(state.localPlayers).length - 1].length}
            >ENTER</button>
          </div>
        </Aux>
      );
    case 'hostRoom':
      if (state.rooms === null) {
        actions.fetchRoomData();
        return LoadingModalContent;
      } else if(!state.rooms[state.roomId]) {
        return LoadingModalContent;
      } else {
        return (
          <Aux>
            <h2>Your Hosted Room</h2>
            <div class={'room-row room-selected'}>
              <span>
                {Object.values(state.rooms[state.roomId].players).join(', ')}
              </span>
            </div>
            <div>
              <button class="button" onclick={actions.start}>Start</button>
            </div>
          </Aux>
        );
      }
    case 'viewRooms':
      if (state.rooms === null) {
        actions.fetchRoomData();
        return LoadingModalContent;
      } else {
        return (
          <Aux>
            <h2>Open Rooms</h2>
            <div>
              {Object.values(state.rooms).length ?
                Object.entries(state.rooms).map(([roomId, room]) => (
                  <div
                    class={'room-row' + (state.roomId === roomId ? ' room-selected' : '') }
                    onclick={() => actions.setRoom(roomId)}
                  >
                    <span>
                    {Object.values(room.players).length > 0 && !room.started ?
                      Object.values(room.players).join(', ') :
                      'No players in this room'
                    }
                    </span>
                  </div>
                )) :
                <div>No open rooms</div>
              }
            </div>
            <div>
              You are{state.ready ? '' : ' not'} ready!
            </div>
            <div>
              <button disabled={state.room === -1} class={'button ' + (state.ready ? 'ready' : 'unready')} onclick={actions.readyToggle}>
                {state.ready ? 'Unready' : 'Ready Up'}
              </button>
            </div>
          </Aux>
        );
      }
    default:
      alert('SOMETHING IS WRONG');
      return null;
  }
}

const init = (canvases, state) => {
  const playerData = Object.entries(state.rooms[state.roomId].players).map(([id, p]) => ({ name: p, id, local: false }));
  Object.values(state.localPlayers).map(p => {
    const localPlayer = playerData.find(({name: _p}) => p === _p && !_p.local);
    localPlayer.local = true;
    return null;
  });
  const ps = new PlayerService(playerData);

  const statusCanvas = canvases[0];
  const drawCanvas = canvases[1];

  const statusCU = new CanvasUtil(statusCanvas, 'square');
  statusCanvas.style.zIndex = 3;
  const drawCU = new CanvasUtil(drawCanvas, 'square');
  drawCanvas.style.zIndex = 2;
  const vp = new Viewport({
    x: -125, y: -125, w: 250, h: 250,
  });
  const du = new DrawingUtil(drawCU, vp);
  const er = new EventRegistry(statusCanvas, {});
  GameWrapper.init(er, statusCU, drawCU, du, ps);
};


// background animation stuff
let stopRender = () => {};

let boxes = 0;

const backgroundAnimate = (canvas) => {
  stopRender();
  const animateCU = new CanvasUtil(canvas, 'full');
  const animateDU = new DrawingUtil(animateCU);
  const boxesData = Array((++boxes) ** 2).fill().map(() => {
    const w = random(200);
    const h = random(200);
    return {
      w,
      h,
      x: random(animateCU.dims.width - w),
      y: random(animateCU.dims.height - h),
      color: randomColor(),
      dir: {
        // random direction times speed
        x: (-2 * random(1) + 1) * (random(4) + 1),
        y: (-2 * random(1) + 1) * (random(4) + 1)
      }
    };
  });
  animateDU.background(randomColor());
  stopRender = render(() => {
    boxesData.map((b) => {
      b.x += b.dir.x;
      b.y += b.dir.y;
      if (b.x + b.w >= animateCU.dims.width) {
        b.dir.x = -1 * Math.abs(b.dir.x);
      } else if(b.x <= 0) {
        b.dir.x = Math.abs(b.dir.x);
      }
      if (b.y + b.h >= animateCU.dims.height) {
        b.dir.y = -1 * Math.abs(b.dir.y);
      } else if (b.y <= 0) {
        b.dir.y = Math.abs(b.dir.y);
      }

      animateDU.rectangle(b.x, b.y, b.w, b.h, b.color);
      return null;
    });
  });
}

// view stuff and calling the game init
const gotCanvas = limit(2, init);

const initView = (state, actions) => (
  <div class="main">
    {state.formState === 'game' ?
      (<div class="Game">
        <canvas key="0" oncreate={(c) => gotCanvas(c, state)} onupdate={() => console.log('Canvas rendered')} />
        <canvas key="1" oncreate={(c) => gotCanvas(c, state)} onupdate={() => console.log('Canvas rendered')} />
      </div>) :
      (<div class="SignUpForm">
        <div class="modal">
          <div class="modalContents">
            {startForm(state, actions)}
          </div>
        </div>
        {/* <canvas key="2" oncreate={backgroundAnimate} onupdate={backgroundAnimate} onremove={stopRender}/> */}
      </div>)
    }
  </div>
);

// app(state, actions, view, document.body);
// false && app(initState, initActions, initView, document.body);
app(initState, initActions, initView, document.body);







// (async (rs) => {
//   let rooms = await rs.getOpenRooms(data => {
//     rooms = data;
//     console.log(data);
//   });
//   await rs.createRoom(rs.getNewRoomName(rooms), {
//     0: 'tim',
//     1: 'bob',
//     2: 'bill',
//   });
//   await rs.createRoom(rs.getNewRoomName(rooms), {
//     0: 'tim',
//     1: 'bob',
//     2: 'bill',
//   });
//   await rs.putInRoom(0, { [Object.values(rooms[0].players).length]: `person ${Object.values(rooms[0].players).length}`}, rooms)
//   await rs.startGame(0, rooms);
// })(RoomService);