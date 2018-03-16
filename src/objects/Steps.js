


export default class Steps {
  add(key, init, next, ...args) {
    this[key] = new Step(key, init, ...args);
    this[key].next = (..._args) => {
      const nextKey = next(..._args);
      nextKey && this[nextKey].init();
    };
    return this[key];
  }
}

class Step {
  constructor(key, init, ...args) {
    this.key = key;
    this.init = init.bind(this, this, ...args);
  }
}
