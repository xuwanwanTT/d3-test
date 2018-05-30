import React from 'react';
const color = 'rgba(38,177,217,.5)';
const colorBg = 'rgba(38,177,217,.2)';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 20,
      data: [
        {
          dx: this.props.width,
          x: this.props.width,
          dy: 0,
          y: 0,
          vx: 5,
          vy: 2
        },
        {
          dx: this.props.width / 5,
          x: this.props.width / 5,
          dy: 100,
          y: 100,
          vx: 5,
          vy: 2
        },
        {
          dx: this.props.width / 2,
          x: this.props.width / 2,
          dy: 100,
          y: 100,
          vx: 5,
          vy: 2
        },
        {
          dx: this.props.width,
          x: this.props.width + 300,
          dy: 300,
          y: 200,
          vx: 5,
          vy: 2
        },
        {
          dx: this.props.width,
          x: this.props.width + 100,
          dy: 500,
          y: 500,
          vx: 5,
          vy: 2
        },
      ]
    };
  }

  star = {
    x: 150,
    y: 150,
    r: 2,
    vr: 0.01,
    alpha: 0,
    draw: function (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r + .5, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = 'rgba(37,177,217,.3)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = `rgba(37,177,217,${this.alpha}) `;
      ctx.fill();
    }
  };

  siteOption = [];

  draw(ctx) {
    let me = this;
    let index = me.state.num;
    for (let i = 0; i < index; i++) {
      let temp = { vr: 0.01 };
      me.star.x = me.width * Math.random();
      me.star.y = me.height * Math.random();
      me.star.r = 1.5 * Math.random();
      me.star.alpha = .5 * Math.random();
      temp.x = me.star.x;
      temp.y = me.star.y;
      temp.r = me.star.r;
      temp.dr = me.star.r;
      temp.alpha = me.star.alpha;
      me.siteOption.push(temp);
      me.star.draw(ctx);
    }
  }

  twinkle(ctx) {
    let me = this;

    me.siteOption.forEach((s, i) => {
      me.star.x = s.x;
      me.star.y = s.y;
      me.star.alpha = s.alpha;
      if (s.r + s.vr > 2.5 || s.r + s.vr < s.dr) {
        s.vr = -s.vr;
      }
      me.star.r = s.r + s.vr;
      s.r = me.star.r;
      me.star.draw(ctx);
    });

    window.requestAnimationFrame(me.twinkle.bind(me, ctx))
  }

  meteor(x, y, ctx) {
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = colorBg;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y - 20);
    ctx.closePath();
    ctx.strokeStyle = colorBg;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  move(ctx) {
    const me = this;
    const star = me.star;

    ctx.save();
    ctx.globalCompositeOperation = "destination-in";
    ctx.fillStyle = 'rgba(0,0,0,.8)';
    ctx.fillRect(0, 0, me.width, me.height);
    ctx.restore();

    me.state.data.forEach((s, i) => {
      if (s.x - s.vx < 0 || s.y + s.vy > me.height) {
        s.x = s.dx;
        s.y = s.dy;
      }
      s.x -= s.vx;
      s.y += s.vy;
      me.meteor(s.x, s.y, ctx);
    });

    window.requestAnimationFrame(me.move.bind(me, ctx));
  }

  componentDidMount() {
    const me = this;
    me.width = me.props.width;
    me.height = me.props.height;
    const ctx = me.refs.canvasRef.getContext('2d');
    me.ctx = ctx;

    me.move(ctx);
    me.draw(ctx);
    me.twinkle(ctx);
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
