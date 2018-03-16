
import Board, { Spot, DIRECTIONS } from './Board';
import Player from './Player';
import { mod, log, animateLine, random } from '../functions';
import Steps from '../objects/Steps';
import DrawingStack from '../utils/DrawingStack';
import VPL from '../objects/ViewPortLocation';

export default class Game {
  constructor(playerService) {
    const board = this.makeBoard();
    playerService.players = playerService.players.map(p => {
      p.spot = board.spots[random(board.spots.length - 1)];
      p.loc = { x: p.spot.x, y: p.spot.y };
      return p;
    });
    const loc = playerService.current().loc;
    VPL.set(loc.x, loc.y, 'setting');
    Object.assign(this, {
      WIDTH: 100,
      OFFSET: {x: 0, y: 0},
      colors: ['blue', 'red', 'green', 'yellow', 'orange', 'purple'],
      board: board,
      ps: playerService,
      ds: new DrawingStack(),
    });

    // roll a die
    // choose your path
      // as you go along, arrows are placed and decide the direction of spots
      // make loops to get coins
      // when you encounter a loop, the loop is wiped, but you end your turn?
  }

  start(er, du) {
    // TODO try to make the er get passed around functionally?
    // TODO implement IMMUTABLE.js and REDUX for state
    this._start(er, this.ds, this.board, this.ps, du);
  }

  makeBoard() {
    const b = new Board();
    Array(Board.LENGTH ** 2).fill().map((_, index) => {
      const spot = b.makeSpot(index, Board.LENGTH);
      spot.setAdj({
        up: index - Board.LENGTH,
        down: index + Board.LENGTH,
        left: index - 1,
        right: index + 1
      });
    });
    return b;
  }

  _start(er, ds, b, ps, du) {
    const steps = new Steps();
    this.addStartStep(er, ds, b, ps, du, steps);
    this.addWinStep(ps, steps);
    steps['start'].init();
  }

  addStartStep(er, ds, b, ps, du, steps) {
    steps.add('start',
      step => {
        // roll
        log('Roll them dice! (Press Space)', true);
        const actions = {
          'roll': () => {
            const roll = random(5) + 1;
            log('Rolled a ' + roll + '!');
            er.removeEvents();
            er.resetActions();
            this.moveToNext(ps, b, ds, er, du, roll, () => step.next());
          }
        };
        const listener = {
          type: 'key',
          bounds: 32,
          events: { 'up': 'roll' }
        };
        ps.action(er, actions, listener);
      },
      num => {
        return 'win-test';
      },
    );
  }

  addWinStep(ps, steps) {
    steps.add('win-test',
      step => {
        step.next();
      },
      async (step) => {
        // test the win
        const win = false;
        if (win) {
          log('You win!', true);
        } else {
          log('You haven\'t won yet!', true);
          await ps.next();
          return 'start';
        }
      }
    );
  }

  async moveToNext(ps, b, ds, er, du, numChoices, done) {
    let choicesLeft = numChoices;
    let prevSpot = ps.current().spot;
    let nextSpot = await this.getNextSpot(ps, b, er, du);
    const getAnimateLine = () => animateLine(
      prevSpot,
      nextSpot,
      2,
      (du, current) => {
        ps.current().loc = Object.assign({}, current);
        VPL.set(current.x, current.y, 'setting');
      },
      async () => {
        ps.current().spot = nextSpot;
        if (--choicesLeft == 0) {
          ds.remove('moving');
          done();
        } else {
          ds.remove('moving');
          prevSpot = nextSpot;
          // nextSpot = b.spots[prevSpot.adj[0]];
          nextSpot = await this.getNextSpot(ps, b, er, du);
          ds.push('moving', getAnimateLine());
        }
      }
    );
    ds.push('moving', getAnimateLine());
  }

  async getNextSpot(ps, b, er, du) {
    const spot = ps.current().spot;
    if(spot.dir) {
      return b.spots[spot.adj[spot.dir]];
    } else {
      return await this.chooseNextSpot(ps, b, er, du);
    }
  }

  chooseNextSpot(ps, b, er, du) {
    return new Promise(resolve => {
      const prevSpot = ps.current().spot;

      // make the options
      const moveChoices = {};
      let moveListeners = [];
      Object.entries(prevSpot.adj).map(([kind, spotId]) => {
        if(!b.spots[spotId]) return; 
        const spot = b.spots[spotId];
        moveChoices['over-' + spotId] = () => {
          spot.tempDir = kind;
          prevSpot.tempDir = kind;
        };
        moveChoices['out-' + spotId] = () => {
          spot.tempDir = null;
          prevSpot.tempDir = null;
        };
        moveChoices['up-' + spotId] = () => {
          spot.tempDir = null;
          prevSpot.dir = kind;
          er.resetActions();
          er.removeEvents();
          ps.current().sendMessage('up-' + spotId);
          resolve(b.spots[spotId]);
        };
        moveListeners = [...moveListeners,
          {
            type: 'mouse',
            bounds: () => du.scaleBox(spot.x - Spot.WIDTH / 2, spot.y - Spot.WIDTH / 2, Spot.WIDTH, Spot.WIDTH),
            events: { up: 'up-' + spotId, over: 'over-' + spotId, out: 'out-' + spotId}
          }
        ];
      });

      // assign the choices
      ps.action(er, moveChoices, ...moveListeners);
    });
  }

  draw(du, changeViewPort, setViewPort) {
    console.log(VPL);
    if(VPL.goto) {
      VPL.changing = changeViewPort(VPL);
      VPL.goto = false;
    } else if (VPL.setting) {
      setViewPort(VPL);
      VPL.setting = false;
    }
    VPL.changing();
    this.board.draw(du);
    this.ps.players.map(p => p.draw(du));
    this.ds.draw(du);
  }
}