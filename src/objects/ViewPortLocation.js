
const vpl = {
  x: 0,
  y: 0,
  changing: () => false,
  _changing: () => false,
  goto: false,
  setting: false,
  set: (x, y, type, done) => {
    this.a.x = x;
    this.a.y = y;
    if(type === 'goto') this.a._done = done;
    this.a[type] = true;
  },
  resetVPL: () => {
    this.a.changing = this.a._changing;
    this.a._done = () => {};
    this.a.goto = false;
    this.a.setting = false;
  },
  done: () => {
    this.a._done();
    this.a.resetVPL();
  }
};

export default vpl;