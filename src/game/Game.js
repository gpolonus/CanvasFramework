
import Board from './Board';
import Player from './Player';
import { mod, log } from '../functions';
import Steps from '../objects/Steps';

export default class Game {
  constructor() {

    this.WIDTH = 100;
    this.OFFSET = {x: 0, y: 0};
    this.colors = ['blue', 'red', 'green', 'yellow', 'orange', 'purple'];

    this.board = this.makeBoard();

    this.player = new Player(this.board.spots[0]);

    // roll a die
    // go to a spot or roll again
    // get a color
    // roll again till all colors are got

  }

  start(er) {
    // TODO try to make the er get passed around functionally?
    this.getStart(er, this.board, this.player);
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

  getStart(er, b, p) {
    const steps = new Steps();
    this.addStartStep(er, b, p, steps);
    this.addWinStep(p, steps);
    steps['start'].init();
  }

  addStartStep(er, b, p, steps) {
    steps.add('start', 
        step => {
          // roll
          log('Roll them dice!', true);
        const moveNext = num => {
          er.setActions({});
          er.eventMap.key = [];
          step.next(num);
        };
        er.setActions({
          '1': () => moveNext(1),
          '2': () => moveNext(2),
          '3': () => moveNext(3),
          '4': () => moveNext(4),
          '5': () => moveNext(5),
          '6': () => moveNext(6),
        });
        this.colors.map((c, i) => {
          er.key(i + 49, { 'up': '' + (i + 1) });
        });
      },
      num => {
        // move and check effects
        const newIndex = mod(num + p.spot.id, this.colors.length);
        const newSpot = b.spots[newIndex];
        log('Moved to ' + newIndex + 'th spot!', true);
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

  draw(du) {
    this.board.draw(du);
    this.player.draw(du);
  }
}