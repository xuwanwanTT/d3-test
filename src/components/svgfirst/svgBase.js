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
    let poly = me._svg.append("polygon").attr("class", "poly")
      .attr("points", "100,160 20,230 60,300 140,300 180,230")
      .attr("fill", "green")
      .attr("stroke", "red")
      .attr("stroke-width", 4);

    let polyLen = document.querySelector(".poly").getTotalLength();
    poly.attr("stroke-dasharray", polyLen, polyLen)
      .attr("stroke-dashoffset", 2 * polyLen)

    //添加一个折线段
    me._svg.append("polyline")
      .attr("points", "100,160 20,230 60,300 140,300 180,230")
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 4)
      .attr("transform", "translate(200,0)");

    //添加文字
    let texts = me._svg.append("g").append("text").attr("class", "texts")
      .attr("x", 20)
      .attr("y", 400)
      .text("文")
      .attr("font-size", "72px")
      .attr("fill", "transparent")
      .attr("font-family", "STKaiti")
      .attr("font-weight", "300")
      .attr("stroke", "blue")
      .attr("stroke-width", 3);

    texts.attr("stroke-dasharray", 312)
      .attr("stroke-dashoffset", 312)
      .transition()
      .duration(3000)
      .attr("stroke-dashoffset", 0)
      .attr("fill", "blue");

    //用 path 画直线
    let d1 = "M20,320c22.758,6.207,48.276-2.758,71.724-2.758";
    let lines = me._svg.append("g").append("path").attr("class", "lines")
      // .attr("d", function () {
      //   return `M20,320 L400,400 M40,320 H400 M60,320 V400`
      // })
      .attr("d", d1)
      .attr("stroke", "blue")
      .attr("stroke-width", 4)
      .attr("fill", "transparent");
    let linesLen = document.querySelector(".lines").getTotalLength();
    // console.log(linesLen)
    lines.attr("stroke-dasharray", linesLen)
      .attr("stroke-dashoffset", linesLen)
      .transition()
      .ease(d3.easeLinear)
      .duration(3000)
      .attr("stroke-dashoffset", 0);

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
    fiveG.attr("stroke-dasharray", fiveLen, fiveLen)
      .attr("stroke-dashoffset", 2 * fiveLen)
    // .transition()
    // .ease(d3.easeBounce)
    // .duration(3000)
    // .attr("stroke-dashoffset", 0);

    //曲线
    let curveArr = [
      "M10 10 C 20 20, 40 20, 50 10",
      'M0 0 C 12 30,22 84,24 126 C 28 84,40 30,48 0 H 0 0'
      // "M70 10 C 70 20, 120 20, 120 10",
      // "M130 10 C 120 20, 180 20, 170 10",
      // "M10 60 C 20 80, 40 80, 50 60",
      // "M70 60 C 70 80, 110 80, 110 60",
      // "M130 60 C 120 80, 180 80, 170 60",
      // "M10 110 C 20 140, 40 140, 50 110",
      // "M70 110 C 70 140, 110 140, 110 110",
      // "M130 110 C 120 140, 180 140, 170 110",
      // "M10 210 C 20 230, 40 230, 50 210 S 70 190,90 210"
    ];

    let curve = me._svg.append("g")
      .attr("transform", `translate(500,20)`)
      .selectAll("path")
      .data(curveArr)
      .enter()
      .append("path")
      .attr("d", function (d) { return d })
      .attr("fill", "transparent")
      .attr("stroke", "red")
      .attr("stroke-width", 2);
  }

  render() {
    let me = this;
    return (
      <div className={"base-svg"}></div>
    )
  }
};

export default SvgBase;
