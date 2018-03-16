
export const DIRECTIONS = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right'
};

class Board {

  constructor() {
    this.spots = [];
  }

  makeSpot(id, data) {
    this.spots[id] = new Spot(id, data);
    return this.spots[id];
  }

  draw(du) {
    this.spots.map(spot => spot.draw(du));
  }
}
Board.LENGTH = 8;
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
    const dir = this.dir || this.tempDir;
    switch(dir) {
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
    du.rectangle(this.x - widthOverTwo, this.y - widthOverTwo, WIDTH, WIDTH, 'white');
    du.points(points, 'black', this.dir ? 3 : 1, true);
  }
}

Spot.WIDTH = WIDTH;
export {Spot};