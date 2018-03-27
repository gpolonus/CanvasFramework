
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
import SignIn from './objects/SignIn';

const initState = {
  formState: 'hosting',
  hosting: false,
  numPlayers: 1,
  localPlayers: [''],
  roomId: -1,
  ready: false,
  rooms: {}
};

const getNewRoomName = (rooms) => {
  const sortedRooms = Object.values(rooms).sort((ra, rb) => +rb.id - +ra.id);
  return Array(sortedRooms.length).fill().map((_, i) => i).find(i => i !== sortedRooms[i].id) || sortedRooms.length + 1;
}

const initActions = {
  hosting: (yesno) => () => {
    return {hosting: yesno, formState: 'multipleplayers'}
  },
  numPlayers: (e) => () => ({numPlayers: e.target.value}),
  setNumPlayers: () => () => ({formState: 'signin'}),
  changeName: (e) => (state) => {
    const localPlayers = [...state.localPlayers];
    localPlayers[state.localPlayers.length - 1] = e.target.value;
    return {localPlayers};
  },
  enterName: () => (state) => {
    const localPlayers = [...state.localPlayers];
    let formState = 'signin';
    if (state.numPlayers <= state.localPlayers.length) {
      if(state.hosting) {
        formState = 'hostRoom';
      } else {
        formState = 'viewRooms';
      }
    } else {
      localPlayers.push('');
    }
    return {
      localPlayers,
      formState
    };
  },
  fetchRoomData: () => async (state, actions) => {
    const rooms = await RoomService.getOpenRooms(actions.gotRoomUpdate);
    if (state.hosting) {
      const newRoomName = getNewRoomName(rooms);
      await RoomService.createRoom(newRoomName, state.localPlayers);
      actions.setState({roomId: newRoomName});
    } else {
      actions.gotRoomUpdate(rooms);
    }
  },
  setState: obj => () => obj,
  gotRoomUpdate: rooms => () => ({rooms}),
  setRoom: roomId => () => ({roomId: roomId, ready: true}),
  readyToggle: () => (state) => {
    const ready = !state.ready;
    if(ready) {
      RoomService.addToRoom(state.roomId, state.localPlayers);
    }
    return {ready};
  },
  start: () => () => ({formState: 'game'})
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
          <h2>GOING TO LEARN TO WRITE YOUR NAME: Player {state.localPlayers.length}</h2>
          <div>
            <input
              class="signInInput"
              // onchange={actions.changeName}
              onkeyup={actions.changeName}
              value={state.localPlayers[state.localPlayers.length - 1]}
            />
          </div>
          <div>
            <button
              class="button"
              onclick={actions.enterName}
              disabled={!state.localPlayers[state.localPlayers.length - 1].length}
            >ENTER</button>
          </div>
        </Aux>
      );
    case 'hostRoom':
      if (Object.values(state.rooms).length === 0) {
        actions.fetchRoomData();
        return LoadingModalContent;
      } else {
        return (
          <Aux>
            <h2>Your Hosted Room</h2>
            <div class={'room-row room-selected'}>
              <span>
                {[...state.localPlayers, ...state.rooms[state.roomId].players].join(', ')}
              </span>
            </div>
            <div>
              <button class="button" onclick={actions.start}>Start</button>
            </div>
          </Aux>
        );
      }
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
                state.rooms.map(room => (
                  <div
                    class={'room-row' + state.roomId === room.id ? ' room-selected' : '' }
                    onclick={() => actions.setRoom(room.id)}
                  >
                    <span>
                    {room.players.length > 0 ?
                      room.players.join(', ') :
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

const init = (canvases) => {
  const ps = new PlayerService();
  // await ps.fetchPlayers();
  
  // const statusCanvas = document.createElement('canvas');
  // const drawCanvas = document.createElement('canvas');
  const statusCanvas = canvases[0];
  const drawCanvas = canvases[1];
  // document.body.appendChild(statusCanvas);
  // document.body.appendChild(drawCanvas);
  
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

let stopRender = () => {};

let boxes = 0;

const backgroundAnimate = (canvas) => {
  stopRender();
  const animateCU = new CanvasUtil(canvas, 'full');
  const animateDU = new DrawingUtil(animateCU);
  const boxesData = Array(++boxes).fill().map(() => {
    const w = random(200);
    const h = random(200);
    return {
      w,
      h,
      x: random(animateCU.dims.width - w),
      y: random(animateCU.dims.height - h),
      speed: 2,
      color: randomColor(),
      dir: {
        x: 2 * random(1) + 1,
        y: 2 * random(1) + 1
      }
    };
  });
  animateDU.background(randomColor());
  stopRender = render(() => {
    boxesData.map((b) => {
      b.x += b.speed * b.dir.x;
      b.y += b.speed * b.dir.y;
      if (b.x + b.w >= animateCU.dims.width) {
        b.dir.x = -1;
      } else if(b.x <= 0) {
        b.dir.x = 1;
      }
      if (b.y + b.h >= animateCU.dims.height) {
        b.dir.y = -1;
      } else if (b.y <= 0) {
        b.dir.y = 1;
      }

      animateDU.rectangle(b.x, b.y, b.w, b.h, b.color);
    });
  });
}

const gotCanvas = limit(2, init);

const initView = (state, actions) => (
  <div class="main">
    {state.formState === 'game' ?
      (<div class="Game">
        <canvas key="0" oncreate={console.log(state) || gotCanvas} onupdate={() => console.log('Canvas rendered')} />
        <canvas key="1" oncreate={console.log(state) || gotCanvas} onupdate={() => console.log('Canvas rendered')} />
      </div>) :
      (<div class="SignUpForm">
        <div class="modal">
          <div class="modalContents">
            {console.log(state) || startForm(state, actions)}
          </div>
        </div>
        <canvas key="2" oncreate={backgroundAnimate} onupdate={backgroundAnimate} onremove={stopRender}/>
      </div>)
    }
  </div>
);

// app(state, actions, view, document.body);
app(initState, initActions, initView, document.body);
