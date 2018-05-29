import React from 'react';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let me = this;
    const ctx = me.refs.canvasRef.getContext('2d');
    me.ctx = ctx;

    ctx.beginPath();
    ctx.arc(150, 150, 4, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  render() {
    let me = this;
    return (
      <div style={{
        width: 300,
        height: 300,
        position: 'absolute',
        left: 400,
        background: 'radial-gradient(at top left, #0c275f 5%, #090e3c)'
      }}>
        <canvas ref={'canvasRef'} width={300} height={300}></canvas>
      </div>
    );
  }
};

export default Page;
