


export default class Player {
  constructor(spot) {
    this.spot = spot;
    this.WIDTH = 10;
    this.colors = [];
  }

  draw(du) {
    const w2 = this.WIDTH / 2;
    du.rectangle(this.spot.x - w2, this.spot.y - w2, this.WIDTH, this.WIDTH, 'black');
  }
}
