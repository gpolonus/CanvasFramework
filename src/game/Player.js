


export default class Player {
  constructor(spot) {
    this.spot = spot;
    this.WIDTH = 10;
    this.colors = [];
  }

  draw(du, {x, y} = {x: this.spot.x, y: this.spot.y}) {
    const w2 = this.WIDTH / 2;
    du.rectangle(x - w2, y - w2, this.WIDTH, this.WIDTH, 'black');
  }
}
