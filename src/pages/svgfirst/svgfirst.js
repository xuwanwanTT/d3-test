import React, { Component } from "react";
import SvgBase from "../../components/svgfirst/svgBase";
import SvgGo from "../../components/svgfirst/svggo";
import Circle3d from "../../components/circle3d/circle3d";
import Axis from '../../components/axis/Axis';

class SvgFirst extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div style={{ position: "relative", "width": "100%", height: "100%" }}>
        {/* <SvgBase width={700} height={600} left={10} top={10} /> */}
        {/* <SvgGo width={700} height={600} left={930} top={10} /> */}
        {/* <Circle3d width={1200} height={700} left={10} top={620} /> */}
        <Axis width={1000} height={800} top={0} />
      </div>
    )
  }

  componentDidMount() { }
};

export default SvgFirst;
