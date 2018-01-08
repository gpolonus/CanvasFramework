
export default class EventRegistry {
  constructor(element) {
    this.el = element || document.body;
    this.events = {};
  }

  add(name, func) {
    this.events[name] = {f: func};
    this.el.addEventListener(name, func);
  }

  remove(name) {
    this.el.removeEventListener(name, this.events[name].f);
  }

  key(keys, func) {
    this.add('keydown', () => {

    });

    keyloop = () => {
      func();
    }
  }
}