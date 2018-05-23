import React, { Component } from "react";
import * as d3 from "d3";

const pi = 2 * Math.PI;
const sin = Math.sin;
const cos = Math.cos;

class Page extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let me = this;
    let x = me.props.width;
    let y = me.props.height;
    //生成svg,创建画布
    let svg = d3.select(me.refs.pageRef).append("svg")
      .attr("width", x)
      .attr("height", y);

    //普通坐标轴--连续
    let yScale = d3.scaleLinear()
      .domain([0, 100]) //最大值
      .range([250, 0]);  //画布最大值
    let xScale = d3.scaleLinear()
      .domain([0, 10])
      .range([0, 200]);
    let xAxis = d3.axisBottom().scale(xScale);
    let yAxis = d3.axisLeft().scale(yScale);
    let axisA = svg.append('g');
    axisA.append('g')
      .attr('transform', 'translate(100 300)')
      .call(xAxis);
    axisA.append('g')
      .attr('transform', 'translate(100 50)')
      .call(yAxis);

    //x轴留白--非连续
    let xScaleB = d3.scaleBand()
      .domain(['小明', '小红', '小刚'])
      .range([0, 200]);
    let xAxisB = d3.axisBottom().scale(xScaleB);
    let axisB = svg.append('g');
    axisB.append('g')
      .attr('transform', 'translate(350 300)')
      .call(xAxisB);
    axisB.append('g')
      .attr('transform', 'translate(350 50)')
      .call(yAxis);
  }

  render() {
    let me = this;
    return (
      <div ref={'pageRef'} style={{
        width: me.props.width,
        height: me.props.height,
        position: "absolute",
        left: me.props.left,
        top: me.props.top,
        background: 'rebeccapurple'
      }}></div>
    )
  }
};

export default Page;
