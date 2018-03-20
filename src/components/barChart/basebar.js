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
    let data = [30, 260, 150, 500, 80];

    /* div柱图 */

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
    let _x = 400;
    let _y = 300;

    //创建画布
    let _svg = d3.select(".base-bar").append("svg")
      .attr("width", _x)
      .attr("height", _y);

    let barWidth = _x / data.length;

    //刻度，防止超出画布
    let yScale = d3.scaleLinear()
      .domain([0, 550]) //最大值
      .range([0, _y]);  //画布最大值

    let xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0, _x - 20])

    let xAxis = d3.axisBottom().scale(xScale);
    console.log(xAxis)

    let bar = _svg.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return `translate(${i * barWidth},0)`
      });

    //画图
    bar.append('rect')
      .attr("x", 10)
      .attr("y", function (s, i) {
        return _y - yScale(data[i]);  //设置画笔起点，默认左上
      })
      .attr("width", barWidth - 20)
      .attr("height", function (d, i) {
        return `${yScale(data[i])}`
      })
      .attr("fill", "red");

    //添加文字
    bar.append("text")
      .attr("x", barWidth / 2 - 25)
      .attr("y", function (s, i) {
        return _y - yScale(data[i]);
      })
      .attr("dy", "1.2em")
      .text(function (d) { return `${d} 单位` });

    _svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${_y})`)
      .call(xAxis);
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
