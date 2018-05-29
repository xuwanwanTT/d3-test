import React from 'react';

const PI = Math.PI;
const deg = PI / 180;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.raf = '';
  }

  componentDidMount() {
    const me = this;
    const ctx = me.refs.canvasRef.getContext('2d');
    me.ctx = ctx;

    ctx.fillRect(0, 0, 100, 100);

    ctx.strokeRect(100, 100, 50, 50);

    ctx.clearRect(25, 25, 50, 50);

    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(0, 150);
    ctx.lineTo(50, 150);
    // ctx.fill();
    // ctx.closePath();
    ctx.stroke();

    ctx.moveTo(0, 150);
    ctx.arc(1, 150, 50, 0, 90 * deg);
    ctx.stroke();

    let rect = new Path2D();
    rect.rect(0, 200, 100, 100);
    ctx.fill(rect);

    let circle = new Path2D();
    circle.arc(125, 175, 25, 0, 360 * deg);
    ctx.stroke(circle);

    me.ball.draw(ctx);

  }

  ball = {
    x: 125,
    y: 25,
    vx: 5,
    vy: 2,
    radius: 25,
    color: ['red', 'yellow', 'pink'],
    draw: function (ctx, index) {
      let n = index || 0;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 360 * deg, true);
      ctx.closePath();
      ctx.fillStyle = this.color[n];
      ctx.fill();
    }
  };

  draw() {
    let me = this;
    let ball = me.ball;
    me.ctx.fillStyle = 'rgba(102,51,153,0.3)';
    me.ctx.fillRect(100, 0, 300, 300);
    if (ball.y + ball.vy > me.refs.canvasRef.height - 25 || ball.y + ball.vy < 25) {
      ball.vy = -ball.vy;
      me.index = ~~(Math.random() * 3);
    }
    if (ball.x + ball.vx > me.refs.canvasRef.width - 25 || ball.x + ball.vx < 125) {
      ball.vx = -ball.vx;
      me.index = ~~(Math.random() * 2);
    }
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.draw(me.ctx, me.index);
    me.raf = window.requestAnimationFrame(me.draw.bind(me));
  }

  move() {
    let me = this;
    me.raf = window.requestAnimationFrame(me.draw.bind(me));
  }

  stop() {
    let me = this;
    window.cancelAnimationFrame(me.raf);
  }

  render() {
    const me = this;
    return (
      <div ref={'pageRef'}
        style={{
          position: 'absolute',
          top: me.props.top,
          left: me.props.left
        }}>
        <canvas ref={'canvasRef'}
          width={me.props.width}
          height={me.props.height}
          onMouseOver={me.move.bind(me)}
          onMouseOut={me.stop.bind(me)}
        ></canvas>
      </div >
    );
  }
};

export default Page;
