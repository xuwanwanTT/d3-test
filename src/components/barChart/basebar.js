import React, { Component } from 'react';
import * as d3 from 'd3';
import { color, arrow } from '../fn/Fn';
import "./basebar.css";

class BaseBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const me = this;
    let data = [30, 260, 150, 500, 80];

    /* svg 柱图 */
    let _x = 400;
    let _y = 300;

    //创建画布
    let _svg = d3.select(".base-bar").append("svg")
      .attr("width", _x)
      .attr("height", _y);

    //渐变色
    let colorIdList = ['svg-color-blue', 'svg-color-red', 'svg-color-yellow', 'svg-color-green', 'svg-color-pink'];
    let colorList = [
      { color: ['blue', 'transparent'] },
      { color: ['red', 'transparent'] },
      { color: ['yellow', 'transparent'] },
      { color: ['green', 'red', 'yellow'] },
      { color: ['pink', 'transparent'] }
    ];
    colorIdList.forEach((s, i) => {
      color(_svg, s, colorList[i]);
    });

    let barWidth = _x / data.length;

    //刻度，防止超出画布
    let yScale = d3.scaleLinear()
      .domain([0, 550]) //最大值
      .range([0, _y]);  //画布最大值

    let xScale = d3.scaleBand()
      .domain(['小蓝', '小红', '小黄', '小绿', '小粉'])
      .range([0, _x]);

    let xAxis = d3.axisBottom().scale(xScale);

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
        return _y - 20;  //设置画笔起点，默认左上
      })
      .attr("width", barWidth - 20)
      .attr("fill", function (s, i) {
        return 'url(#' + colorIdList[i] + ')';
      })
      .attr('transform', 'translate(0 0)')
      .transition()
      .duration(1000)
      .attr("height", function (d, i) {
        return yScale(data[i]);
      })
      .attr('transform', function (d, i) {
        return `translate(0 ${-yScale(data[i])})`
      });

    //添加文字
    bar.append("text")
      .attr("x", barWidth / 2 - 25)
      .attr("y", function (s, i) {
        return _y - 20 - yScale(data[i]);
      })
      .attr("dy", "1.2em")
      .text(function (d) { return `${d} 单位` })
      .style('opacity', 0)
      .transition()
      .duration(1000)
      .delay(300)
      .style('opacity', 1);

    _svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${_y - 20})`)
      .call(xAxis);
  }

  componentDidUpdate() { }

  render() {
    const me = this;
    return (
      <div>
        <div className={"base-bar"}></div>
      </div >
    )
  }
}

export default BaseBar
