
import {render} from '../functions';
import Game from './Game';

export default class GameWrapper {
  constructor() {
    // this.er = eventRegistry
    // this.state = 'start';
  }

  init(er, cu, du) {
    const triggers = {
      'start': () => {
        er.removeEvents('mouse');
        this.startRender(er, cu, du);
      },
      'over-start': () => {
        this.drawStart(cu, true);
      },
      'out-start': () => {
        this.drawStart(cu);
      }
    };
    er.setActions(triggers);
    er.mouse(this.buttonDims(cu), {'up': 'start', 'over': 'over-start', 'out': 'out-start'}, true);
    this.drawStart(cu);
  }

  startRender(er, cu, du) {
    const game = new Game(er);
    game.start(er);
    render(() => {
      // always trigger events first
      er.triggerActions();
      // draw background before drawing other things
      du.background('grey');
      // always set the viewport before drawing other things
      // else animation errors occur
      // du.vp.set({
      //   x: corner.x,
      //   y: corner.y,
      // });
      // draw things
      game.draw(du);
    });
  }

  drawStart(cu, over) {
    cu.background('grey');
    const {x: x, y: y, w: w, h: h} = this.buttonDims(cu);
    cu.rectangle(x, y, w, h, 'white');
    if(over) cu.box(x, y, w, h, 'black', 10);
  }

  buttonDims({dims: dims}) {
    const {left: x, top: y, width: w, height: h} = dims;
    return {
      x: w / 4,
      y: h / 4,
      w: w / 2,
      h: h / 2
    };
  }
}