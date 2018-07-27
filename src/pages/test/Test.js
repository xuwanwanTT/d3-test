import React, { Component } from 'react';
// import CanvasTest from '../../components/canvas/CanvasTest';
// import StartBg from '../../components/canvas/StartBg';
// import Test from '../../components/canvas/Test';
// import Collision from '../../components/canvas/Collision';
// import SvgFirst from '../svgfirst/svgfirst';
// import Test1 from '../../components/test/Test1';
// import Test2 from '../../components/test/Test2';
// import Test3 from '../../components/test/Test3';
import Test4 from '../../components/test/Test4';

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
        {/* <Collision width={800} height={600} /> */}
        {/* <SvgFirst /> */}
        {/* <Test1 /> */}
        {/* <Test2 /> */}
        {/* <Test3 /> */}
        <Test4 />
      </div>
    )
  }
};

export default Page;
