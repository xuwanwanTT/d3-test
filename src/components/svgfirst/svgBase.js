import React, { Component } from 'react';
import * as d3 from 'd3';
import "./svgbase.css";

class SvgBase extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let me = this;
    let x = me.props.width;
    let y = me.props.height;
    //生成svg,创建画布
    me._svg = d3.select(".base-svg").append("svg")
      .attr("width", x)
      .attr("height", y);

    //添加一个矩形
    me._svg.append("rect")
      .attr("x", 20)
      .attr("y", 20)
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("width", 200)
      .attr("height", 100)
      .attr("fill", "red")
      .attr("stroke", "green")
      .attr("stroke-width", 4);

    //添加一个圆
    me._svg.append("circle")
      .attr("cx", 280)
      .attr("cy", 70)
      .attr("r", 50)
      .attr("fill", "green")
      .attr("stroke", "red")
      .attr("stroke-width", 4);

    //添加一根线
    me._svg.append("line")
      .attr("x1", 0)
      .attr("y1", 140)
      .attr("x2", 400)
      .attr("y2", 140)
      .attr("stroke", "blue")
      .attr("stroke-width", 4);

    // 添加一个多边形
    me._svg.append("polygon")
      .attr("points", "100,160 20,230 60,300 140,300 180,230")
      .attr("fill", "green")
      .attr("stroke", "red")
      .attr("stroke-width", 4);

    //添加一个折线段
    me._svg.append("polyline")
      .attr("points", "100,160 20,230 60,300 140,300 180,230")
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 4)
      .attr("transform", "translate(200,0)");

    //用 path 画直线
    me._svg.append("g").append("path")
      .attr("d", function () {
        return `M20,320 L400,400 M40,320 H400 M60,320 V400`
      })
      .attr("stroke", "blue")
      .attr("stroke-width", 4);

    //画一个五角星
    let starX = 30;
    let starData = [{ x: .2 * starX, y: y }, { x: .8 * starX, y: y - 1.5 * starX }, { x: 1.4 * starX, y: y }, { x: 0, y: y - starX }, { x: 1.6 * starX, y: y - starX }];
    let fiveG = me._svg.append("polygon")
      .attr("class", "five-svg")
      .attr("points", function (s, i) {
        let str = '';
        starData.forEach(s => {
          str += `${s.x},${s.y} `
        })
        return str
      })
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 2);

    let fiveLen = document.querySelector(".five-svg").getTotalLength();
    fiveG.attr("stroke-dasharray", fiveLen)
      .attr("stroke-dashoffset", fiveLen)
      .transition()
      .ease(d3.easeLinear)
      .duration(3000)
      .attr("stroke-dashoffset", 0);
  }

  render() {
    let me = this;
    return (
      <div className={"base-svg"}></div>
    )
  }
};

export default SvgBase;
