

export default class CanvasUtil {

  constructor(canvas, options) {
    this.context = canvas.getContext('2d');
    this.dims = {};
    this.setViewOptions(options);
  }

  setViewOptions(options) {
    const paneView = options.paneView ? options.paneView : options;
    const responsive = options.responsive ? options.responsive : false;

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
    if (px) {
      if (this._paneView === 'full') {
        return {
          height: window.innerHeight + 'px',
          width: window.innerWidth + 'px',
          top: 0 + 'px',
          left: 0 + 'px',
        };
      } else if (this._paneView === 'square') {
        const dims = CanvasUtil.getViewSquare();
        return {
          height: dims.l + 'px',
          width: dims.l + 'px',
          top: dims.y + 'px',
          left: dims.x + 'px',
        };
      }
    } else {
      if (this._paneView === 'full') {
        return {
          height: window.innerHeight,
          width: window.innerWidth,
          top: 0,
          left: 0,
        };
      } else if (this._paneView === 'square') {
        const dims = CanvasUtil.getViewSquare();
        return {
          height: dims.l,
          width: dims.l,
          top: dims.y,
          left: dims.x,
        };
      }
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

  clear() {
    this.context.clearRect(0, 0, this.dims.width, this.dims.height);
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

  points(points, color, lineWidth, connect, fill) {
    if(points.length === 0) {
      return;
    }
    const ctx = this.context;
    ctx.lineWidth = lineWidth;
    fill ? ctx.fillStyle = color : ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    let i = 1;
    Array(points.length - 1).fill(1).map(() => {
      ctx.lineTo(points[i].x, points[i++].y);
      return null;
    });
    if(connect)
      ctx.lineTo(points[0].x, points[0].y);
    fill ? ctx.fill() : ctx.stroke();
  }

  text(text, x, y, font, color) {
    const ctx = this.context;
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
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

  center() {
    return { x: parseInt(this.dims.width) / 2, y: parseInt(this.dims.height) / 2};
  }
}