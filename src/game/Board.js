
export const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};

class Board {

  constructor(length) {
    this.length = length;
    this.spots = [];
  }

  makeSpot(id, data) {
    this.spots[id] = new Spot(id, data);
    return this.spots[id];
  }

  isLoop(spot) {
    const check = (spot, spotIds) => {
      const next = this.spots[spot.adj[spot.dir]];
      if(!next || !next.dir) {
        return [];
      } else if(spotIds.find(id => id === next.id)) {
        return spotIds;
      } else {
        spotIds = [...spotIds, next.id];
        return check(next, spotIds);
      }
    }
    return check(this.spots[spot.id], []);
  }

  draw(du) {
    const widthOverTwo = Spot.WIDTH / 2;
    const boardLength = this.length * Spot.WIDTH;
    du.rectangle(this.spots[0].x - widthOverTwo, this.spots[0].y - widthOverTwo, boardLength, boardLength, 'white');
    this.spots.map(spot => spot.draw(du));
  }
}
export default Board;


// used by the spot class then applied statically
const WIDTH = 25;

class Spot {

  constructor(id, boardLength, ...data) {
    this.adj = [];
    this.id = id;
    const {i, j} = Spot.getLocation(id, boardLength);
    this.x = WIDTH * i;
    this.y = WIDTH * j;
    this.setData(...data);
    this.lit = false;
  }

  setLoc({x, y}) {
    this.x = x;
    this.y = y;
  }

  setData(dir) {
    this.dir = dir;
  }

  static getLocation(id, size) {
    const i = id % size;
    const j = Math.floor(id / size);
    return {i, j};
  }

  setAdj(adj) {
    this.adj = adj;
  }

  draw(du) {
    const widthOverTwo = WIDTH / 2;
    let points;
    const p = (x, y) => ({x, y});
    switch(this.dir) {
      case 'up':
        points = [
          p(this.x - widthOverTwo, this.y + widthOverTwo),
          p(this.x + widthOverTwo, this.y + widthOverTwo),
          p(this.x, this.y - widthOverTwo),
        ];
        break;
      case 'down':
        points = [
          p(this.x - widthOverTwo, this.y - widthOverTwo),
          p(this.x + widthOverTwo, this.y - widthOverTwo),
          p(this.x, this.y + widthOverTwo)
        ];
        break;
      case 'left':
        points = [
          p(this.x + widthOverTwo, this.y - widthOverTwo),
          p(this.x + widthOverTwo, this.y + widthOverTwo),
          p(this.x - widthOverTwo, this.y)
        ];
        break;
      case 'right':
        points = [
          p(this.x - widthOverTwo, this.y - widthOverTwo),
          p(this.x - widthOverTwo, this.y + widthOverTwo),
          p(this.x + widthOverTwo, this.y)
        ];
        break;
      default:
        points = [];
    }
    this.kindaLit && du.rectangle(this.x - widthOverTwo, this.y - widthOverTwo, WIDTH, WIDTH, '#ddd');
    du.box(this.x - widthOverTwo, this.y - widthOverTwo, WIDTH, WIDTH, 'black', this.lit ? 3 : 1);
    du.points(points, 'black', 1, true);
  }
}

Spot.WIDTH = WIDTH;
export {Spot};