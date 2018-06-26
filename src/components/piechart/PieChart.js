import React from 'react';
import * as d3 from 'd3';

const color = ['red', 'blue', 'pink', 'yellow', 'green'];

class Chart extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {
      data: [
        {
          name: 'pie-one',
          value: 100
        },
        {
          name: 'pie-two',
          value: 200
        },
        {
          name: 'pie-three',
          value: 80
        },
        {
          name: 'pie-four',
          value: 130
        },
        {
          name: 'pie-five',
          value: 150
        }
      ]
    };
    me.r = 50;
    me.R = 80;
    me.cR = 90;
    me.tR = 120;
  }

  componentDidMount() {
    const me = this;
    const width = me.props.style.width;
    const height = me.props.style.height;
    let svg = d3.select(me.refs.chartRef)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    let gPath = svg.append('g')
      .attr('transform', `translate(${width / 2} ${height / 2})`);
    let gText = svg.append('g')
      .attr('transform', `translate(${width / 2} ${height / 2})`);
    let arc = d3.arc();
    let pie = d3.pie()
      .value(function (d) { return d.value })
      .sort(function (a, b) { return null });
    let data = pie(me.state.data);

    me.drawPath(gPath, arc, data);
    me.drawText(gText, data);
  }

  drawPath(svg, arc, data) {
    const me = this;
    svg.selectAll('g').data(data)
      .enter()
      .append('g')
      .append('path')
      .attr('d', function (d) {
        return me.createArc(arc, me.r, me.R, d.startAngle, d.endAngle)
      })
      .attr('fill', function (d, i) {
        return color[i];
      })
      .style('cursor', 'pointer')
      .on('mouseover', function (d) {
        d3.select(this)
          .transition()
          .duration(100)
          .ease(d3.easeBounceOut)
          .on('end', function (d) {
            console.log(this)
          })
          .attrTween('d', function (d) {
            var i = d3.interpolate(me.R, me.cR);
            return function (t) {
              let temp = i(t);
              return me.createArc(arc, me.r, temp, d.startAngle, d.endAngle);
            }
          })
      })
      .on('mouseout', function (d, i) {
        d3.select(this)
          .transition()
          .duration(100)
          .ease(d3.easeBounceOut)
          .attrTween('d', function (d) {
            var i = d3.interpolate(me.cR, me.R);
            return function (t) {
              let temp = i(t);
              return me.createArc(arc, me.r, temp, d.startAngle, d.endAngle);
            }
          })
      })
  }

  drawText(svg, data) {
    const me = this;
    svg.selectAll('g').data(data)
      .enter()
      .append('g')
      .append('text')
      .attr('x', function (d) {
        console.log(d)
        let angle = d.endAngle - ((d.endAngle - d.startAngle) / 2);
        return Math.sin(angle) * me.tR;
      })
      .attr('dx', function (d) {
        let angle = d.endAngle - ((d.endAngle - d.startAngle) / 2);
        if (angle > Math.PI) {
          return -50;
        }
      })
      .attr('y', function (d) {
        let angle = d.endAngle - ((d.endAngle - d.startAngle) / 2);
        return -Math.cos(angle) * me.tR;
      })
      .text(function (d) { return d.data.name });
  }

  //生成圆弧
  createArc(arc, r, R, start, end) {
    let path = arc.innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end);
    return path();
  };

  render() {
    const me = this;
    return (
      <div ref={'chartRef'} style={me.props.style}></div>
    );
  }
};

export default Chart;
