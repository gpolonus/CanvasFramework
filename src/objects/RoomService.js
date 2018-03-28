
import firebase from 'firebase';

const config = {
  databaseURL: "https://boardgamerooms.firebaseio.com",
};

firebase.initializeApp(config);
const database = firebase.database();

export default {
  // init grab of room data
  // refresh function is for listening for any updates on the room data
  getOpenRooms: (refresh) => {
    this.a.valueCallback = database.ref('rooms').on('value', (d) => {
      const data = d.toJSON() || {};
      refresh(data);
    });
  },
  // for creating a room that people can enter
  // sends an update to everyone looking at the data
  createRoom: (roomId, players) => {
    // set the new room data for everyone to see
    return new Promise(resolve => {
      database.ref(`rooms/${roomId}`).set({players}, resolve);
    });
  },
  // adds a non-host to a room
  putInRoom: (roomId, localPlayers, rooms) => {
    if(!rooms[roomId]) return Promise.reject('BAD');
    // const players = {...localPlayers, ...rooms[roomId].players};
    let i = Object.values(rooms[roomId].players).length;
    const players = localPlayers.reduce((ac, next) => ({...ac, [i]: next}), rooms[roomId].players);
    return new Promise(resolve => {
      database.ref(`rooms/${roomId}`).set({...rooms[roomId], players}, resolve);
    });
  },
  // start the game at the id with the players in it
  startGame: async (roomId, rooms) => {
    if (!rooms[roomId]) return Promise.reject('BAD');
    await new Promise(resolve => {
      database.ref(`rooms/${roomId}`).set({...rooms[roomId], started: true}, resolve);
    });

    // reference.off('value', this.a.valueCallback);
    // TODO test that this works for offing the listener
    database.ref('rooms').off('value', this.a.valueCallback);
    database.goOffline();
  },
  getNewRoomName: (rooms) => {
    let i = 0;
    while(true) {
      if(!rooms[i]) return i;
      else i++;
    }
  }
};
