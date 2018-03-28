
import Board, { Spot } from './Board';
import { animateLine, random } from '../functions';
import Steps from '../objects/Steps';
import DrawingStack from '../utils/DrawingStack';
import VPL from '../objects/ViewPortLocation';

export default class Game {
  constructor(playerService) {
    const boardSideLength = 5;
    const board = this.makeBoard(boardSideLength);
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

  start(er, du, statusChange) {
    // TODO try to make the er get passed around functionally?
    // TODO implement IMMUTABLE.js and REDUX for state
    this.statusChange = statusChange;
    // TODO use the directions object instead of strings
    this._start(er, this.ds, this.board, this.ps, du);
  }

  makeBoard(l) {
    const b = new Board(l);
    Array(b.length ** 2).fill().map((_, index) => {
      const spot = b.makeSpot(index, b.length);
      spot.setAdj({
        up: index < b.length ? null : index - b.length,
        down: index + 1 > b.length ** 2 - b.length ? null : index + b.length,
        left: index % b.length === 0 ? null : index - 1,
        right: index % b.length === b.length -1 ? null : index + 1
      });
      return null;
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
        const actions = {
          'roll': () => {
            const roll = random(5) + 1;
            er.removeEvents();
            er.resetActions();
            this.moveToNext(ps, b, ds, er, du, roll,
              () => {
                const loop = b.isLoop(ps.current().spot);
                loop.map(spotId => b.spots[spotId].dir = null);
                ps.current().points += loop.length ** 2 / 2;
                if(loop.length > 0) this.statusChange();
              },
              () => step.end()
            );
          }
        };
        const listener = {
          type: 'key',
          bounds: 32,
          events: { 'up': 'roll' }
        };
        ps.action(er, actions, listener);
      },
      step => {
        step.next('win-test');
      },
    );
  }

  addWinStep(ps, steps) {
    steps.add('win-test',
      step => {
        step.end();
      },
      async (step) => {
        // test the win
        // const win = ps.current().points >= 100;
        const win = false;
        if (win) {
        } else {
          ps.next();
          const loc = ps.current().loc;
          VPL.set(loc.x, loc.y, 'goto', () => {
            step.next('start');
          });
        }
      }
    );
  }

  async moveToNext(ps, b, ds, er, du, numChoices, each, done) {
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
        each();
        if (--choicesLeft === 0) {
          ds.remove('moving');
          done();
        } else {
          ds.remove('moving');
          prevSpot = nextSpot;
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
      const nextSpot = b.spots[spot.adj[spot.dir]];
      if(ps.players.find(p => p.spot.id === nextSpot.id)) return spot;
      else return nextSpot;
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
      Object.entries(prevSpot.adj).map(([kind, spotId], _, list) => {
        if(!b.spots[spotId] || ps.players.find(p => p.spot.id === spotId)) return null;
        const spot = b.spots[spotId];
        spot.kindaLit = true;
        moveChoices['over-' + spotId] = () => {
          spot.lit = true;
          prevSpot.dir = kind;
        };
        moveChoices['out-' + spotId] = () => {
          spot.lit = false;
        };
        moveChoices['up-' + spotId] = () => {
          list.map(([, _spotId]) => {
            if (!b.spots[_spotId]) return null;
            b.spots[_spotId].lit = false;
            b.spots[_spotId].kindaLit = false;
            return null;
          });
          prevSpot.dir = kind;
          er.resetActions();
          er.removeEvents();
          ps.current().sendMessage('up-' + spotId);
          resolve(b.spots[spotId]);
          return null;
        };
        moveListeners = [...moveListeners,
          {
            type: 'mouse',
            bounds: () => du.scaleBox(spot.x - Spot.WIDTH / 2, spot.y - Spot.WIDTH / 2, Spot.WIDTH, Spot.WIDTH),
            events: { up: 'up-' + spotId, over: 'over-' + spotId, out: 'out-' + spotId}
          }
        ];
        return null;
      });

      // assign the choices
      ps.action(er, moveChoices, ...moveListeners);
    });
  }

  draw(du, changeViewPort, setViewPort) {
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