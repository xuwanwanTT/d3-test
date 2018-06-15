import React, { Component } from 'react';
import CanvasTest from '../../components/canvas/CanvasTest';
import StartBg from '../../components/canvas/StartBg';
import Test from '../../components/canvas/Test';
import Twinkle from '../../components/canvas/Twinkle';

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let me = this;
    return (
      <div>
        {/* <CanvasTest width={400} height={300} /> */}
        {/* <StartBg width={400} height={300} left={400} /> */}
        {/* <Test /> */}
        <Twinkle width={1920} height={1080} />
      </div>
    )
  }
};

export default Page;
