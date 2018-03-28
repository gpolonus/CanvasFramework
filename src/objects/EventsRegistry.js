
export default class EventRegistry {
  constructor(el, actionMap) {
    /*********
     *
     * EVENTS TRIGGER ACTIONS
     *
    **********/
    // TODO: Refactor eventtMap types to be objects with keys at indicies instead of arrays
    const mouseEvetHandler = event => {
      this.eventMap.mouse.map(({ event: me, st }) => {
        me.activate(event);
        if (st) me.active.map(({ action: a }) => this.actionMap[a](event));
        return null;
      });
    };
    el && 'mousedown mouseup mousemove'.split(' ').map(eventType => {
      el.addEventListener(eventType, mouseEvetHandler);
      return null;
    });

    const keyEventHandler = event => {
      this.eventMap.key.map(({ event: ke, st }) => {
        ke.activate(event);
        if (st) ke.active.map(({ action: a }) => this.actionMap[a](event));
        return null;
      });
      return null;
    };
    'keydown keyup'.split(' ').map(eventType => {
      document.body.addEventListener(eventType, keyEventHandler);
      return null;
    });

    this.stopListening = () => {
      'keydown keyup'.split(' ').map(eventType => {
        document.body.removeEventListener(eventType, keyEventHandler);
        return null;
      });

      el && 'mousedown mouseup mousemove'.split(' ').map(eventType => {
        el.removeEventListener(eventType, mouseEvetHandler);
        return null;
      });

      this.removeEvents();
      this.resetActions();
    }

    // from UI event to list of actions
    this.eventMap = {
      mouse: [],
      key: []
    };

    // from action to function
    this.actionMap = this.setActions(actionMap);
  }

  setActions(actionMap) {
    return Object.assign(this.actionMap || {}, actionMap);
  }

  resetActions() {
    this.actionMap = {};
  }

  addAction(action, func) {
    this.actionMap[action] = func;
  }

  triggerAction(ge, index, active) {
    if (ge.run) {
      if (ge.run !== true) {
        ge.run = ge.run - 1;
      }
      return ge;
    } else {
      active.splice(index, 1);
    }
  }

  triggerActions() {
    const triggers = [];
    Object.keys(this.eventMap).map(eventType =>
      this.eventMap[eventType].map(({ event }) =>
        event.active.map((ge, index, active) => {
          const trigger = this.triggerAction(ge, index, active, triggers);
          trigger && triggers.push(trigger);
          return null;
        })
      )
    );
    triggers.map(({ action }) => this.actionMap[action]());
  }

  listen({type, bounds, events, st}) {
    this[type] && this[type](bounds, events, st);
  }

  // set mouse listener
  mouse(getDims, events, selfTrigger) {
    return this.eventMap.mouse.push({ event: this.mouseEvent(getDims, events), st: selfTrigger });
  }

  // set key listener
  // visit this website for keycodes: http://keycode.info/
  key(key, events, selfTrigger) {
    return this.eventMap.key.push({ event: this.keyEvent(_key => key === _key, events), st: selfTrigger }) - 1;
  }

  keys(keys, events, selfTrigger) {
    return this.eventMap.key.push({ event: this.keyEvent(keys, events), st: selfTrigger }) - 1;
  }

  // remove listener
  removeEvent(type, index) {
    return this.eventMap[type].splice(index, 1);
  }

  // remove listener
  removeEvents(type) {
    if (type) {
      this.eventMap[type] = [];
    } else {
      this.removeEvents('mouse');
      this.removeEvents('key');
    }
  }

  // create the mouse event data
  mouseEvent(dims, { down, up, over, out }) {
    const getDims = (() => {
      if (dims && dims.constructor && dims.call && dims.apply)
        return () => dims();
      else
        return () => dims;
    })();

    return {
      down,
      up,
      over,
      out,
      activate(event) {
        const _dims = getDims();
        const isInside =
          _dims.x < event.offsetX &&
          _dims.y < event.offsetY &&
          event.offsetX < _dims.w + _dims.x &&
          event.offsetY < _dims.h + _dims.y;
        const active = [];
        if (event.button === 0 && isInside) {
          if (event.type === "mouseup") {
            if (up) {
              active.push({ action: up, run: 1 });
            }
          } else if (event.type === "mousedown") {
            if (down) {
              active.push({ action: down, run: true });
            }
          }
        }
        if (event.type === "mousemove") {
          if (isInside && over) {
            active.push({ action: over, run: true });
          } else if (!isInside && out) {
            active.push({ action: out, run: true });
          }
        }
        this.active = active;
      },
      active: [],
    };
  }

  // create the key event data
  keyEvent(keys, { down, up }) {
    return {
      keys: keys,
      down: down,
      up: up,
      activate(event) {
        if (keys(event.which)) {
          const isUp = event.type === 'keyup';
          const active = [];
          !isUp && down && active.push({ action: down, run: true });
          isUp && up && active.push({ action: up, run: 1 });
          this.active = active;
        }
      },
      active: [],
    };
  }
}
