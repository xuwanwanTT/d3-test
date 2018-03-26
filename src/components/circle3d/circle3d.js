import React, { Component } from "react";
import * as d3 from "d3";
import "./circle3d.css";

class Circle3d extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let me = this;
    let x = me.props.width;
    let y = me.props.height;
    let colorArr = ["red", "blue", "yellow", "green", "pink", "black"];
    let circle = d3.select(".circle-3d")
      .attr("width", x)
      .attr("height", y);

    circle.append("div")
      .attr("class", "circle-img-stage")
      .append("div")
      .attr("class", "circle-img-wrap")
      .selectAll("div")
      .data(colorArr)
      .enter()
      .append("div")
      .attr("class", "circle-img-3d")
      .style("width", "200px")
      .style("height", "100px")
      .style("background-color", function (d) { return d })
  }

  render() {
    let me = this;
    return (
      <div className={"circle-3d"} style={{ width: me.props.width, height: me.props.height, position: "absolute", left: me.props.left, top: me.props.top }}></div>
    )
  }
};

export default Circle3d;
