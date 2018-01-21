import Point from '../objects/Point';

export default class CanvasUtil {

  constructor(canvas, options) {
    this.context = canvas.getContext('2d');
    this.dims = {};
    this.setViewOptions(options);
  }

  setViewOptions(options) {
    const paneView = options ? options.paneView : options;
    const responsive = options.responsive;

    if (responsive) {
      window.addEventListener('resize', () => {
        if (paneView) {
          this.setPaneView(paneView);
        }
        responsive.refresh();
      });
    }

    if (paneView) {
      this.setPaneView(paneView);
    }
  }

  setPaneView(paneView) {
    this.paneViewOption = paneView;
    const canvas = this.context.canvas;
    canvas.style.position = 'absolute';
    this.dims = this.getPaneView(false);
    this.setCanvasDims(this.getPaneView(true));
  }

  getPaneView(px) {
    let suffix = '';
    if (px) {
      suffix = 'px'
    }
    if (this._paneView === 'full') {
      return {
        height: window.innerHeight + suffix,
        width: window.innerWidth + suffix,
        top: 0,
        left: 0,
      };
    } else if (this._paneView === 'square') {
      const dims = CanvasUtil.getViewSquare();
      return {
        height: dims.l + suffix,
        width: dims.l + suffix,
        top: dims.y + suffix,
        left: dims.x + suffix,
      };
    }
  }

  set paneViewOption(paneView) {
    this._paneView = paneView;
  }

  get paneViewOption() {
    return this._paneView;
  }

  setCanvasDims(dims) {
    const canvas = this.context.canvas;
    canvas.style.height = dims.height;
    this.context.canvas.height = parseInt(dims.height, 10);
    canvas.style.width = dims.width;
    // this.context.width = dims.width;
    this.context.canvas.width = parseInt(dims.width, 10);
    canvas.style.top = dims.top;
    canvas.style.left = dims.left;
  }

  get context() {
    return this.ctx;
  }

  set context(ctx) {
    this.ctx = ctx;
  }

  background(color) {
    this.rectangle(0, 0, window.innerWidth, window.innerHeight, color);
  }

  rectangle(x, y, w, h, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, w, h);
  }

  box(x, y, w, h, color, lineWidth) {
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.strokeRect(x, y, w, h);
  }

  static getViewSquare() {
    const dims = {
      x: 0,
      y: 0,
      l: 0,
      widthLonger: false
    };
    // TODO figure out what the function is to get rid of this if check
    if (window.innerWidth > window.innerHeight) {
      dims.x = window.innerWidth / 2 - window.innerHeight / 2;
      dims.l = window.innerHeight;
      dims.widthLonger = true;
    } else {
      dims.y = window.innerHeight / 2 - window.innerWidth / 2;
      dims.l = window.innerWidth;
    }
    return dims;
  }
}