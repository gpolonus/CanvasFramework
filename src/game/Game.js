
import Board from './Board';
import Player from './Player';
import { mod, log, animateLine, random } from '../functions';
import Steps from '../objects/Steps';
import DrawingStack from '../utils/DrawingStack';

export default class Game {
  constructor() {

    this.WIDTH = 100;
    this.OFFSET = {x: 0, y: 0};
    this.colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];

    this.board = this.makeBoard();

    this.player = new Player(this.board.spots[0]);

    this.ds = new DrawingStack();

    // roll a die
    // go to a spot or roll again
    // get a color
    // roll again till all colors are got

  }

  start(er) {
    // TODO try to make the er get passed around functionally?
    // TODO implement IMMUTABLE.js and REDUX for state
    this.getStart(er, this.ds, this.board, this.player);
  }

  makeBoard() {
    const b = new Board();
    // TODO have board making be location generic?
    const colors = this.colors;
    const colorsPI = colors.length / Math.PI / 2;
    b.spots = colors.map((color, i, list) => {
      const x = Math.cos(i / colorsPI) * this.WIDTH + this.OFFSET.x;
      const y = Math.sin(i / colorsPI) * this.WIDTH + this.OFFSET.y;
      return Board.makeSpot(x, y, {color: color, id: i});
    }).map((spot, i, list) => {
      // spot.setAdj([mod((i - 1), list.length), mod((i + 1), list.length)]);
      spot.setAdj([mod((i + 1), list.length)]);
      return spot;
    });
    return b;
  }

  getStart(er, ds, b, p) {
    const steps = new Steps();
    this.addStartStep(er, ds, b, p, steps);
    this.addWinStep(p, steps);
    steps['start'].init();
  }

  addStartStep(er, ds, b, p, steps) {
    steps.add('start', 
      step => {
        // roll
        log('Roll them dice! (Press Space)', true);
        er.setActions({
          'roll': () => {
            const roll = random(5) + 1;
            log('Rolled a ' + roll + '!');
            er.removeEvents();
            er.resetActions();
            const newIndex = mod(roll + p.spot.id, this.colors.length);
            this.moveToNext(p, b, ds, newIndex, () => step.next(newIndex));
          }
        });
        er.key(32, { 'up': 'roll'});
      },
      num => {
        // move and check effects
        const newSpot = b.spots[num];
        log('Moved to ' + num + 'th spot!', true);
        p.spot = newSpot;
        if (!p.colors.find(c => c === p.spot.color)) {
          p.colors.push(p.spot.color);
          log('Added the color ' + p.spot.color + '!', true);
          return 'win-test';
        } else {
          log('You already have that color!', true);
          log('Roll again!', true);
          return 'start';
        }
      },
    );
  }

  addWinStep(p, steps) {
    steps.add('win-test',
      step => {
        step.next();
      },
      step => {
        // test the win
        const win = this.colors.every(c => {
          return !!p.colors.find(_c => {
            return _c === c
          });
        });
        if (win) {
          log('You win!', true);
        } else {
          log('You haven\'t won yet!', true);
          return 'start';
        }
      }
    );
  }

  moveToNext(p, b, ds, endSpotIndex, done) {
    let prevSpot = p.spot;
    let nextSpot = b.spots[p.spot.adj[0]];
    const getAnimateLine = () => animateLine(
      prevSpot,
      nextSpot,
      1,
      (du, current) => {
        p.spot = current;
      },
      () => {
        if (nextSpot.id === endSpotIndex) {
          ds.remove('moving');
          done();
        } else {
          ds.remove('moving');
          prevSpot = nextSpot;
          nextSpot = b.spots[prevSpot.adj[0]];
          ds.push('moving', getAnimateLine());
        }
      }
    );
    ds.push('moving', getAnimateLine());
  }

  draw(du) {
    this.board.draw(du);
    this.player.draw(du);
    this.ds.draw(du);
  }
}