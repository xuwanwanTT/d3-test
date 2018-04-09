import React, { Component } from 'react';
import * as d3 from 'd3';
const PI = Math.PI;

class Pie extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div className={'pie-area'}></div>
    )
  }

  createArc(r, R, start, end) {
    // let r = 60;
    // let R = 100;
    let arc = d3.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end);
    return arc();
  };

  componentDidMount() {
    let me = this;
    let width = me.props.width || 300;
    let height = me.props.height || 300;
    let data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    let svg = d3.select('.pie-area').append('svg')
      .attr('width', width)
      .attr('height', height);

    let g = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', 'translate(150,150)');

    g.append('path')
      .attr('d', function (d) {
        let start = -2 * PI / 3 + d * 2 * PI / 15;
        let end = start + 2 * PI / 15 - PI / 180;
        let path = me.createArc(60, 100, start, end);
        return path
      })
      .attr('fill', 'red');

    g.append('path')
      .attr('d', function (d) {
        let start = -2 * PI / 3 + d * 2 * PI / 15;
        let end = start + 2 * PI / 15 - PI / 180;
        let path = me.createArc(60, 70, start, end);
        return path
      })
      .attr('fill', '#fff');

    g.append('path')
      .attr('id', function (d) {
        return `myPath${d}`
      })
      .attr('d', function (d) {
        let start = -2 * PI / 3 + d * 2 * PI / 15 + 2 * PI / (15 * 4);
        let end = start + 2 * PI / 15 - 2 * 2 * PI / (15 * 4);
        let path = me.createArc(119, 120, start, end);
        return path
      })
      .attr('fill', '#fff');

    //此处文字可单独写一个path，完美填充到空位
    g.append('text')
      .style('transform', 'rotate(12deg)')
      .attr('fill', '#fff')
      .append('textPath')
      .attr('xlink:href', function (d) {
        return `#myPath${d}`
      })
      .text(function (d) {
        return (d + 1) * 50
      });
  }
};

export default Pie;
