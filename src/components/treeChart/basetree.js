import React, { Component } from 'react';
import * as d3 from 'd3';
import { hierarchy, select, tree } from 'd3';

class BaseTree extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const me = this;
    const _x = 300;
    const _y = 300;
    //创建画布
    me._svg = d3.select(".base-tree").append("svg")
      .attr("width", 300)
      .attr("height", 300);

    //创建树图布局
    me.tree = tree().size()

  }

  componentDidUpdate() { }

  render() {
    const me = this;
    return (
      <div>
        <h1>BaseTree</h1>
        <div className={"base-tree"}></div>
      </div>
    )
  }
}

export default BaseTree
