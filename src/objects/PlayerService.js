import axios from 'axios';
import SignIn from './SignIn';
import Player from '../game/Player'
import { mod } from '../functions';

const getPlayersUrl = '';

class PlayerService {
  constructor() {
    this.currentPlayerId = 0;
  }

  async fetchPlayers() {
    const localPlayers = await this.getLocalPlayers();
    const remotePlayers = await this.getRemotePlayers();
    this.setPlayers([...localPlayers, ...remotePlayers].sort(({id: a}, {id: b}) => a < b ? -1 : 1));
  }

  getLocalPlayers() {
    // const name = await(new SignIn()).getName();
    return Promise.resolve([
      {
        name: 'Bob',
        id: 0,
        local: true
      },
      {
        name: 'Bill',
        id: 1,
        local: true
      }
    ]);
  }

  getRemotePlayers() {
    // return axios.get(getPlayersUrl);
    return Promise.resolve([
    ]);
    //   {
    //     name: 'Alice',
    //     id: 2,
    //     local: false
    //   }
    // ]);
  }

  setPlayers(players) {
    const playerObjects = players.map((player) => new Player(player)); 
    this.players = playerObjects;
  }

  current() {
    return this.players[this.currentPlayerId];
  }

  next() {
    this.currentPlayerId = mod(this.currentPlayerId + 1, this.players.length);
  }

  action(er, actions, ...listeners) {
    const currentPlayer = this.current();
    let p;
    er.setActions(actions);
    if(currentPlayer.local) {
      // use the er
      listeners.map(listener => er.listen(listener));
    } else {
      // listen for player communications
      currentPlayer.retrieveMessage().then(message => {
        // some processing of message here
        const action = message;
        actions[action]();
      });
    }
  }
}

export default PlayerService;