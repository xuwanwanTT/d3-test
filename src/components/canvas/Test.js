import React from 'react';

class Page extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  star(x, y, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = 'rgba(37,177,217,.9)';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 25, y - 10);
    ctx.closePath();
    ctx.strokeStyle = 'rgba(37,177,217,.2)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  clear(ctx) {
    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = 'rgba(37,177,217,.8)';
    ctx.fillRect(0, 0, 800, 300);
    ctx.restore();
  }

  oneStar = {
    x: 600,
    dx: 600,
    y: 0,
    dy: 0,
    vx: 2.5,
    vy: 1
  }

  draw(ctx) {
    const me = this;
    let s = this.oneStar;
    if (s.x - s.vx < 0 || s.y + s.vy > me.height) {
      s.x = s.dx;
      s.y = s.dy;
    }
    s.x -= s.vx;
    s.y += s.vy;
    me.star(s.x, s.y, ctx);
    me.clear(ctx);
    window.requestAnimationFrame(me.draw.bind(me, ctx));
  }

  componentDidMount() {
    const me = this;
    const ctx = me.refs.canvasRef.getContext('2d');
    me.ctx = ctx;
    me.draw(ctx);
  }

  render() {
    const me = this;
    return (
      <div style={{
        width: 800,
        height: 300,
        background: 'radial-gradient(at top left, #0c275f 5%, #090e3c)'
      }} >
        <canvas ref={'canvasRef'} width={800} height={300}></canvas>
      </div>
    );
  }
};

export default Page;
