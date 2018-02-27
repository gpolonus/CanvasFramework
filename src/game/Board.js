


export default class Board {
  constructor() {
    this.spots = [];
  }

  static makeSpot(x, y, data) {
    return new Spot(x, y, data);
  }

  draw(du) {
    this.spots.map((spot, i, list) => {
      spot.adj.map(id => {
        const adjSpot = list[id];
        du.points([spot, adjSpot], 'black', 4);
      });
      return spot;
    }).map(spot => spot.draw(du));
  }
}

class Spot {

  constructor(x, y, data) {
    this.x = x;
    this.y = y;
    this.adj = [];
    this.WIDTH = 15;
    this.setData(data || {});
  }

  setData({color: color, id: id}) {
    this.color = color;
    this.id = id;
  }

  setAdj(ids) {
    this.adj = [...ids];
  }

  draw(du) {
    const w2 = this.WIDTH / 2;
    const args = [this.x - w2, this.y - w2, this.WIDTH, this.WIDTH];
    du.rectangle(...args, this.color);
    du.box(...args, 'black', 2);
  }
}