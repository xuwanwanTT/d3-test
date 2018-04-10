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

  //生成圆弧
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

  //生成渐变色
  createColor() {
    let me = this;
    let e = d3.rgb(0, 213, 144);
    let d = d3.rgb(0, 246, 255);
    let c = d3.rgb(70, 161, 255);
    let b = d3.rgb(255, 234, 0);
    let a = d3.rgb(242, 97, 0);
    let defs = me._svg.append('defs');
    let linearGradient = defs.append("linearGradient")
      .attr("id", "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    let stop1 = linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", a.toString());

    let stop2 = linearGradient.append("stop")
      .attr("offset", "20%")
      .style("stop-color", b.toString());

    let stop3 = linearGradient.append("stop")
      .attr("offset", "60%")
      .style("stop-color", c.toString());

    let stop4 = linearGradient.append("stop")
      .attr("offset", "80%")
      .style("stop-color", d.toString());

    let stop5 = linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", e.toString());
    return linearGradient;
  };

  componentDidMount() {
    let me = this;
    let width = me.props.width || 300;
    let height = me.props.height || 300;
    let data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s, i) => {
      let start = -2 * PI / 3 + i * 2 * PI / 15;
      let end = start + 2 * PI / 15 - PI / 180;
      return {
        start,
        end
      }
    });
    let R = (width - 80) / 2;
    let r = R - 40;
    let tR = R + 20;
    let scaleT = 10;

    let svg = d3.select('.pie-area').append('svg')
      .attr('width', width)
      .attr('height', height);

    let g = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('class', function (d) { if (d == 1) { return 'g-2ed' } })
      .attr('transform', `translate(${width / 2},${height / 2})`);

    me._svg = svg;

    g.append('path')
      .attr('d', function (d, i) {
        if (i > 9) { return }
        console.log(d)
        let start = -2 * PI / 3 + d * 2 * PI / 15;
        let end = start + 2 * PI / 15 - PI / 180;
        let path = me.createArc(r, R, d.start, d.end);
        return path
      })
      .attr('fill', function (d) {
        let color = me.createColor();
        return `url(#${color.attr("id")})`
      });

    // g.append('path')
    //   .attr('d', function (d) {
    //     if (d > 9) { return }
    //     let start = -2 * PI / 3 + d * 2 * PI / 15;
    //     let end = start + 2 * PI / 15 - PI / 180;
    //     let path = me.createArc(r, r + 10, start, end);
    //     return path
    //   })
    //   .attr('fill', 'rgba(255,255,255,.5)');

    g.append('path')
      .attr('d', function (d, i) {
        if (i > 9) { return }
        let start = -2 * PI / 3 + d * 2 * PI / 15 + 2 * PI / (15 * 4);
        let end = start + 2 * PI / 15 - 2 * 2 * PI / (15 * 4);
        let path = me.createArc(tR - 1, tR, d.start + PI / 30, d.end - PI / 30);
        return path
      })
      .attr('fill', '#fff');

    //此处文字可单独写一个path，完美填充到空位
    // g.append('path')
    //   .attr('id', function (d) {
    //     return `myPath${d}`
    //   })
    //   .attr('d', function (d, i) {
    //     if (i == 0) {
    //       let start = -2 * PI / 3;
    //       let end = start + 2 * PI / (15 * 4);
    //       let path = me.createArc(tR - 1, tR, d.start, d.end);
    //       return path
    //     }
    //     let start = -2 * PI / 3 + (d - 1) * 2 * PI / 15 + 2 * 3 * PI / (15 * 4);
    //     let end = start + 2 * PI / 15 - 2 * 2 * PI / (15 * 4);
    //     let path = me.createArc(tR - 1, tR, start, end);
    //     return path
    //   })
    //   .attr('fill', 'transparent');
    g.append('text')
      // .attr('dy', '5')
      // .attr('dx', function (d) {
      //   if (d == 0) { return '-1' }
      //   if ((d * scaleT).toString().length == 2) { return '5' }
      // })
      .attr('fill', '#fff')
      .attr('x', function (d, i) {
        return tR * Math.sin(d.start)
      })
      .attr('y', function (d, i) {
        return -tR * Math.cos(d.start)
      })
      // .append('textPath')
      // .attr('xlink:href', function (d) {
      //   return `#myPath${d}`
      // })
      .text(function (d, i) {
        return i
      });
  }
};

export default Pie;
