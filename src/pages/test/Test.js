import React, { Component } from 'react';
import CanvasTest from '../../components/canvas/CanvasTest';
import StartBg from '../../components/canvas/StartBg';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let me = this;
    return (
      <div>
        <CanvasTest width={400} height={300} />
        <StartBg />
      </div>
    )
  }
};

export default Page;
