
import CommunicationService from '../objects/CommuncationService';

const WIDTH = 10;

class Player {

  constructor(data) {
    Object.assign(this, data);
    if(data.local) {
      this.cs = new CommunicationService();
    }
  }

  draw(du, {x, y} = {x: this.loc.x, y: this.loc.y}) {
    const w2 = WIDTH / 2;
    du.rectangle(x - w2, y - w2, WIDTH, WIDTH, 'black');
  }

  retrieveMessage() {

  }

  sendMessage() {

  }
}

Player.WIDTH = WIDTH;
export default Player;