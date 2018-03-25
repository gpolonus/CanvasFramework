


export default class Steps {
  add(key, init, end, ...args) {
    this[key] = new Step(key, init, end, ...args);
    this[key].next = (nextKey) => {
      this[nextKey] && this[nextKey].init();
    };
    return this[key];
  }
}

class Step {
  constructor(key, init, end, ...args) {
    this.key = key;
    this.init = init.bind(this, this, ...args);
    this.end = end.bind(this, this, ...args);
  }
}
