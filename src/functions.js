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
  if(repeat)
    document.getElementById('log').innerHTML += '<br><pre>' + text + '</pre>';
  else
    document.getElementById('log').innerHTML = '<pre>' + text + '</pre>';
}

export {render, random, log};