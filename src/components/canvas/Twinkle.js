import React from 'react';
const color = 'rgba(38,177,217,.5)';
const colorBg = 'rgba(38,177,217,.2)';

class Star {
  _sx = 25;
  _sy = 25;
  _vx = 0;
  _vy = 0;
  _r = 25;
  _width = 100;
  _height = 100;
  _color = 'red';

  draw(ctx) {
    this.speed();
    ctx.save();
    ctx.beginPath();
    ctx.arc(this._sx, this._sy, this._r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = this._color;
    ctx.fill();
    ctx.restore();
  }

  speed() {
    this._sx += this._vx;
    if (this._sx > this._width - this._r || this._sx < this._r) {
      this._vx = -this._vx;
    }
    this._sy += this._vy;
    if (this._sy > this._height - this._r || this._sy < this._r) {
      this._vy = -this._vy;
    }
  }

  set vx(x) {
    this._vx = x;
  }

  get vx() {
    return this._vx;
  }

  set vy(x) {
    this._vy = x;
  }

  get vy() {
    return this._vy;
  }

  set width(d) {
    this._width = d;
  }

  get width() {
    return this._width;
  }

  set height(d) {
    this._height = d;
  }

  get height() {
    return this._height;
  }

  set sx(x) {
    this._sx = x;
  }

  get sx() {
    return this._sx;
  }

  set sy(x) {
    this._sy = x;
  }

  get sy() {
    return this._sy;
  }

  set r(x) {
    this._r = x;
  }

  get r() {
    return this._r;
  }

  set color(x) {
    this._color = x;
  }

  get color() {
    return this._color;
  }
};

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 20,
      data: []
    };
  }

  twinkle(arr, ctx) {
    let me = this;
    ctx.clearRect(0, 0, me.width, me.height);
    me.checkCollided(arr);
    me.draw(arr, ctx);
    window.requestAnimationFrame(me.twinkle.bind(me, arr, ctx));
  }

  // 判断是否碰撞
  isCollision(site1, site2, r) {
    let x = site1[0] - site2[0];
    let y = site1[1] - site2[1];
    if (x * x + y * y <= r * r) {
      return true;
    } else {
      return false;
    }
  }

  // 碰撞后速度交换
  collided(star1, star2) {
    let r1 = star1._r;
    let r2 = star2._r;
    let r = r1 + r2;
    let site1 = [star1._sx, star1._sy];
    let site2 = [star2._sx, star2._sy];
    let vx1 = star1._vx;
    let vy1 = star1._vy;
    let vx2 = star2._vx;
    let vy2 = star2._vy;
    if (this.isCollision(site1, site2, r)) {
      star1._vx = vx2;
      star2._vx = vx1;
      star1._vy = vy2;
      star2._vy = vy1;
    }
  }

  // 检测数组中所有球是否碰撞
  checkCollided(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (i < arr.length - 1) {
        for (let k = i + 1; k < arr.length; k++) {
          this.collided(arr[i], arr[k])
        }
      }
    }
  }

  draw(arr, ctx) {
    for (let i = 0; i < arr.length; i++) {
      arr[i].draw(ctx);
    }
  }

  // new num个球
  createMore(num, width, height) {
    let arr = [];
    let r = 10;
    for (let i = 0; i < num; i++) {
      let star = new Star();
      star.width = width;
      star.height = height;
      star.r = r;
      star.vx = 3 * Math.random() + 2;
      star.vy = 4 * Math.random() + 2;
      star.sx = r + (width - r) * Math.random();
      star.sy = r + (height - r) * Math.random();
      star.color = `rgba(${~~(255 * Math.random())},${~~(255 * Math.random())},${~~(255 * Math.random())},${(.5 * Math.random() + .5)})`
      arr.push(star);
    }
    return arr;
  }

  componentDidMount() {
    const me = this;
    me.width = me.props.width;
    me.height = me.props.height;
    const ctx = me.refs.canvasRef.getContext('2d');
    const count = 500;
    let starArr = me.createMore(count, me.width, me.height);
    me.twinkle(starArr, ctx);
  }

  render() {
    let me = this;
    return (
      <div style={{
        width: me.props.width,
        height: me.props.height,
        position: 'absolute',
        top: me.props.top,
        left: me.props.left,
        zIndex: 0,
        background: 'radial-gradient(at top left, #0c275f 5%, #090e3c)'
      }}>
        <canvas ref={'canvasRef'} width={me.props.width} height={me.props.height}></canvas>
      </div>
    );
  }
};

export default Page;
