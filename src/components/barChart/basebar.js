import React, { Component } from 'react';
import * as d3 from 'd3';
import "./basebar.css";

class BaseBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const me = this;

    /* div柱图 */
    // let data = [30, 260, 150, 500, 80];

    // let scale = d3.scaleLinear()
    //   .domain([0, 550])
    //   .range([0, 300]);

    // d3.select(".base-bar")
    //   .selectAll("div")
    //   .data(data)
    //   .enter()
    //   .append("div")
    //   .style("width", function (d) {
    //     return `${scale(d)}px`
    //   })
    //   .text(function (d) {
    //     return `${d} 单位`
    //   });

    /* svg 柱图 */

  }

  componentDidUpdate() { }

  render() {
    const me = this;
    return (
      <div>
        <div className={"base-bar"}></div>
      </div>
    )
  }
}

export default BaseBar
