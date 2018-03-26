import React, { Component } from "react";
import * as d3 from "d3";
import "./svggo.css";

const pi = 2 * Math.PI;
const sin = Math.sin;
const cos = Math.cos;

class SvgGo extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let me = this;
    let x = me.props.width;
    let y = me.props.height;
    //生成svg,创建画布
    let _svg = d3.select(".base-svg").append("svg")
      .attr("width", x)
      .attr("height", y);

    //圆内正五角星并且旋转
    let r = 50;
    let angle = pi / 5;
    let starPointsArr = [];
    let order = [0, 3, 1, 4, 2];
    let starPoints = "";
    let cirX, cirY;

    for (let i = 0; i < 5; i++) {
      let temp = pi / 4 + i * angle;
      cirX = r * sin(temp) + 2 * r;
      cirY = r * cos(temp) + 2 * r;
      starPointsArr.push({ x: cirX, y: cirY });
    }

    order.forEach(s => {
      starPoints += `${starPointsArr[s].x},${starPointsArr[s].y} `
    });

    let circleWrap = _svg.append("g")
      .attr("class", "svg-go-cir-wrap")
      .attr("transform-origin", `${2 * r} ${2 * r}`);

    let circle = circleWrap.append("circle")
      .attr("class", "svg-go-circle")
      .attr("cx", 2 * r)
      .attr("cy", 2 * r)
      .attr("r", r)
      .attr("fill", "transparent")
      .attr("stroke-width", 2)
      .attr("stroke", "red");

    let star = circleWrap.append("polygon")
      .attr("class", "svg-go-star")
      .attr("points", starPoints)
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 2);

    let starLen = me.getLen("svg-go-star");
    let circleLen = me.getLen("svg-go-circle");

    star.attr("stroke-dasharray", starLen, starLen)
      .attr("stroke-dashoffset", 2 * starLen)
    // .transition()
    // .ease(d3.easeLinear)
    // .duration(3000)
    // .attr("stroke-dashoffset", 0);

    circle.attr("stroke-dasharray", circleLen, circleLen)
      .attr("stroke-dashoffset", 2 * circleLen)
      .transition()
      .ease(d3.easeLinear)
      .duration(3000)
      .attr("stroke-dashoffset", 0);

  }

  //获取 svg 路径长度
  getLen(name) {
    return document.querySelector(`.${name}`).getTotalLength()
  }

  render() {
    let me = this;
    return (
      <div className={"svg-go"} style={{ width: me.props.width, height: me.props.height, position: "absolute", left: me.props.left, top: me.props.top }}></div>
    )
  }
};

export default SvgGo;
