

function render(func) {
  const _run = () => {
    window.requestAnimationFrame(() => {
      func();
      _run();
    });
  }
  _run();
}

function random(num) {
  return Math.round(Math.random() * num);
}

function log(text, repeat) {
  // if(repeat)
  //   document.getElementById('log').innerHTML += '<br><pre>' + text + '</pre>';
  // else
  //   document.getElementById('log').innerHTML = '<pre>' + text + '</pre>';
}

function once(func) {
  let i = true;
  return () => {
    if(i) {
      func();
      i = false;
    }
  }
}

function mod(n, p) {
  return ((n % p) + p) % p;
}

function animate(step, done) {
  let going = true;
  return (...args) => {
    if(going) {
      going = step(...args);
      return true;
    } else {
      done();
      return false;
    }
  };
}

function distance({ x: x0, y: y0 }, { x: x1, y: y1 }) {
  return Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
}

function inRange({x: x0, y: y0}, {x: x1, y: y1}, radius) {
  return (x0 - x1)**2 + (y0 - y1)**2 <= radius**2
}

function p(x, y) {
  return {x, y};
}

function animateLine(
    {x: x0, y: y0},
    {x: x1, y: y1},
    speed,
    draw,
    done,
  ) {
  let current = {x: x0, y: y0};
  return animate((du) => {
    const {x, y} = current;
    const dist = distance(current, p(x1, y1));
    if(dist < speed) {
      draw(du, p(x1, y1));
      return false;
    }
    const speedCoeff = speed / dist;
    current = {
      x: (x1 - x) * speedCoeff + current.x,
      y: (y1 - y) * speedCoeff + current.y
    };
    draw(du, current);
    return true;
  }, done);
}

const randomColor  = () => {
  return '#' + 
    zeroPadFront(random(255).toString(16), 2) +
    zeroPadFront(random(255).toString(16), 2) +
    zeroPadFront(random(255).toString(16), 2);
}

const zeroPadFront = (str, length) => {
  if(str.length < length) {
    return Array(length - str.length).fill(0).join('') + str;
  }
  return str;
}

export {
  render,
  random,
  log,
  once,
  mod,
  animate,
  animateLine,
  p,
  inRange,
  randomColor
};