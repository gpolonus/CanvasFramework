
import { render, animateLine, p } from '../functions';
import Game from './Game';
import PlayerService from '../objects/PlayerService'
import SignIn from '../objects/SignIn';

const init = async (er, cu, du) => {
  const ps = new PlayerService();
  await ps.fetchPlayers();
  const game = new Game(ps);
  game.start(er, du);
  const triggers = {
    'start': () => {
      er.removeEvents('mouse');
      startRender(game, er, cu, du);
    },
    'over-start': () => {
      drawStart(cu, true);
    },
    'out-start': () => {
      drawStart(cu);
    }
  };
  er.setActions(triggers);
  er.mouse(buttonDims(cu), {
    'up': 'start',
    'over': 'over-start',
    'out': 'out-start'
  }, true);
  drawStart(cu);
};

const startRender = (game, er, cu, du) => {
  render(() => {
    // always trigger events first
    er.triggerActions();

    // draw background before drawing other things
    du.background('#bbb');

    // always set the viewport before drawing other things
    // else animation errors occur
    // du.vp.set({
    //   x: corner.x,
    //   y: corner.y,
    // });

    // draw things
    game.draw(du, ({x, y, done}) => {
      const oldSpot = p(du.vp.x, du.vp.y);
      return animateLine(
        oldSpot,
        p(x, y),
        3,
        (_, {x: x1, y: y1}) => {
          du.vp.set({
            x: x1 - du.vp.w / 2,
            y: y1 - du.vp.h / 2,
          });
        },
        () => {
          done();
        }
      );
    }, ({x, y}) => {
      du.vp.set({
        x: x - du.vp.w / 2,
        y: y - du.vp.h / 2,
      });
    });
  });
};

const drawStart = (cu, over) => {
  cu.background('grey');
  const { x: x, y: y, w: w, h: h } = buttonDims(cu);
  cu.rectangle(x, y, w, h, 'white');
  if (over) cu.box(x, y, w, h, 'black', 10);
};

const buttonDims = ({ dims: dims }) => {
  const { left: x, top: y, width: w, height: h } = dims;
  return {
    x: w / 4,
    y: h / 4,
    w: w / 2,
    h: h / 2
  };
};

export default {
  init,
  startRender,
  drawStart,
  buttonDims
};
