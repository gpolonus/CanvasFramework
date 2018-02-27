


export default class Steps {
  add(key, init, next) {
    this[key] = new Step(key, init);
    this[key].next = (...args) => {
      const nextKey = next(...args);
      this[nextKey].init()
    };
    return this[key];
  }
}

class Step {
  constructor(key, init) {
    this.key = key;
    this._init = init;
  }

  init() {
    this._init(this);
  }
}
