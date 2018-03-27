


export default {
  getOpenRooms: async (refresh) => {
    this.a.refresh = refresh;
    return {
      0: {players: [], id: 0},
      2: {players: [], id: 2}
    };
  },
  createRoom: async (id) => {
    this.a.refresh({
      [id]: { players: [], id },
      0: { players: [], id: 0 },
      2: { players: [], id: 2 } 
    });
  },
  addToRoom: () => {},
};