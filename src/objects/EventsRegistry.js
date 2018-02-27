
import * as $ from 'jquery';

export default class EventRegistry {
  constructor(canvas, actionMap) {
    this.canvas = canvas;
    // TODO: Refactor eventtMap types to be objects with keys at indicies instead of arrays
    $(this.canvas).on('mousedown mouseup mousemove', event => {
      this.eventMap.mouse.map(({event: me, st: st}) => {
        me.activate(event);
        if(st) me.active.map(({action: a}) => this.actionMap[a]());
      });
    });
    $(document.body).on('keydown keyup', event => {
      this.eventMap.key.map(({event: ke, st: st}) => {
        ke.activate(event);
        if(st) ke.active.map(({action: a}) => this.actionMap[a]());
      });
    });

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
      this.eventMap[eventType].map(({event: event}) =>
        event.active.map((ge, index, active) => {
        const trigger = this.triggerAction(ge, index, active, triggers);
          trigger && triggers.push(trigger);
        })
      )
    );
    triggers.map(({action: action}) => this.actionMap[action]());
  }

  // set mouse listener
  mouse(getDims, events, selfTrigger) {
    return this.eventMap.mouse.push({event: this.mouseEvent(getDims, events), st: selfTrigger});
  }

  // set key listener
  // visit this website for keycodes: http://keycode.info/
  key(key, events, selfTrigger) {
    return this.eventMap.key.push({event: this.keyEvent(key, events), st: selfTrigger}) - 1;
  }

  // remove listener
  removeEvent(type, index) {
    return this.eventMap[type].splice(index, 1);
  }

  // remove listener
  removeEvents(type) {
    return this.eventMap[type] = [];
  }

  // create the mouse event data
  mouseEvent(dims, { down: down, up: up, over: over, out: out }) {
    const getDims = (() => {
      if (dims && dims.constructor && dims.call && dims.apply)
        return () => dims();
      else
        return () => dims;
    })();

    return {
      down: down,
      up: up,
      over: over,
      out: out,
      activate(event) {
        const _dims = getDims();
        const isInside =
          _dims.x < event.offsetX &&
          _dims.y < event.offsetY &&
          event.offsetX < _dims.w + _dims.x &&
          event.offsetY < _dims.h + _dims.y;
        const active = [];
        if (event.button === 0 && isInside) {
          if(event.type === "mouseup") {
            if(up) {
              active.push({action: up, run: 1});
            }
          } else if (event.type === "mousedown") {
            if(down) {
              active.push({action: down, run: true});
            }
          }
        }
        if(event.type === "mousemove") {
          if (isInside && over){
            active.push({action: over, run: true});
          } else if (!isInside && out) {
            active.push({action: out, run: true});
          }
        }
        this.active = active;
      },
      active: [],
    };
  }

  // create the key event data
  keyEvent(key, {down: down, up: up}) {
    return {
      key: key,
      down: down,
      up: up,
      activate(event) {
        if(event.which === key) {
          const isUp = event.type === 'keyup';
          const active = [];
          !isUp && down && active.push({action: down, run: true});
          isUp && up && active.push({action: up, run: 1});
          this.active = active;
        }
      },
      active: [],
    };
  }
}
