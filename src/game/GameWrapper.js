
import { render, animateLine, p } from '../functions';
import Game from './Game';
import PlayerService from '../objects/PlayerService'

const init = async (er, cu, du) => {
  const ps = new PlayerService();
  await ps.fetchPlayers();
  const game = new Game(ps);
  const triggers = {
    'start': () => {
      er.removeEvents('mouse');
      game.start(er, du);
      startRender(game, er, cu, du, ps);
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

const startRender = (game, er, cu, du, ps) => {
  render(() => {
    // always trigger events first
    er.triggerActions();

    // draw background before drawing other things
    du.background('#bbb');


    // always set the viewport before drawing other things
    // else animation errors occur


    // draw things
    game.draw(du, ({x, y, done}) => {
      const oldSpot = du.vp.center();
      return animateLine(
        oldSpot,
        p(x, y),
        2,
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

// const drawStatus = () => {
//   // draw status things about players and game control buttons
//   ps.players.map((p, i) => {
//     // text height
//     const th = 25;
//     // line spacing
//     const ls = 10;
//     cu.text(p.name + ': ' + p.points, 0, 2 * ls + i * th, th + "px Arial", "black");
//   });
// }

const drawStart = (cu, over) => {
  cu.background('grey');
  const {x, y, w, h } = buttonDims(cu);
  cu.rectangle(x, y, w, h, 'white');
  if (over) cu.box(x, y, w, h, 'black', 10);
};

const buttonDims = ({ dims }) => {
  const { width: w, height: h } = dims;
  return {
    x: w / 4,
    y: h / 4,
    w: w / 2,
    h: h / 2
  };
};

export default {
  init
};
