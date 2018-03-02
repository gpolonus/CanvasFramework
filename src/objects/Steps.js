


export default class Steps {
  add(key, init, next) {
    this[key] = new Step(key, init);
    this[key].next = (...args) => {
      const nextKey = next(...args);
      nextKey && this[nextKey].init();
    };
    return this[key];
  }
}

class Step {
  constructor(key, init) {
    this.key = key;
    this.init = init.bind(this, this);
  }
}
