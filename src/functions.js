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

export {render, random};