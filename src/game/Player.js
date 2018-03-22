
import CommunicationService from '../objects/CommuncationService';
import { randomColor, p } from '../functions';

const WIDTH = 10;

class Player {

  constructor(data) {
    Object.assign(this, data);
    if(data.local) {
      this.cs = new CommunicationService();
    }
    this.dir = 'up';
    this.points = 0;
    this.color = randomColor();
  }

  draw(du, {x, y} = {x: this.loc.x, y: this.loc.y}) {
    const w2 = WIDTH / 2;
    const args = [this.color, 1, true, true];
    switch (this.spot.dir) {
      case 'up':
        du.points([
          p(x - w2, y + w2),
          p(x + w2, y + w2),
          p(x, y - w2),
        ], ...args);
        break;
      case 'down':
        du.points([
          p(x - w2, y - w2),
          p(x + w2, y - w2),
          p(x, y + w2)
        ], ...args);
        break;
      case 'left':
        du.points([
          p(x + w2, y - w2),
          p(x + w2, y + w2),
          p(x - w2, y)
        ], ...args);
        break;
      case 'right':
        du.points([
          p(this.loc.x - w2, this.loc.y - w2),
          p(this.loc.x - w2, this.loc.y + w2),
          p(this.loc.x + w2, this.loc.y)
        ], ...args);
        break;
      default:
        du.rectangle(this.loc.x - w2, this.loc.y - w2, WIDTH, WIDTH, this.color);
    }
  }

  retrieveMessage() {

  }

  sendMessage() {

  }
}

Player.WIDTH = WIDTH;
export default Player;