/**
 * 树图
 * xf
 */

import React, { Component } from 'react';
// import * as d3 from 'd3';
import { hierarchy, select, tree } from 'd3';
// import "./treechart.css";

class TreeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: '',
        children: [{ name: "一二三四五六七八九十", }, { name: 111, }, { name: 111, }, { name: 111, }]
      }
    };
    this._flag = false;
    this.isLeft = true;
  };
  _setData(d) {
    this._flag = true;
    this.setState({ data: d })
  };

  render() {
    let me = this;
    return (
      <div style={me.props.style} className="tree-chart-wrap">
        <div className="tree-chart"></div>
      </div>
    )
  };

  //绘制svg
  draw() {
    let me = this;
  };

  componentDidMount() {
    let me = this;
    //创建svg画布
    me.width = me.props.style.width;
    me.height = me.props.style.height;
    let _x = me.height;
    let _y = me.width;
    me._svg = select(`.tree-chart`)
      .append('svg')
      .attr('width', me.width)
      .attr('height', me.height);

    /* 生成节点 */
    let root = hierarchy(me.state.data);
    let rootNew = hierarchy(me.state.data);

    /* 创建树状布局 */
    me.tree = tree()
      .size([_x, _y]);

    me.tree(root);

    me.treeNew = tree()
      .size([_x - 100, _y]);

    me.treeNew(rootNew);

    let rootArr = rootNew.descendants().slice(1);

    let g = me._svg.append('g')
      .attr("transform", "translate(0,0)")

    /* link */
    g.selectAll('.link')
      .data(root.descendants().slice(1))
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('fill', 'none')
      .style('stroke', function (d) {
        return '#12ffff';
      })
      .style('stroke-width', function (d) {
        return 1
      })
      .style('stroke-opacity', function (d) {
        if (d.depth === 1) {
          return 0.3;
        } else {
          return 0.2;
        }
      })
      .attr("d", function (d,i) {
        let dd = rootArr[i];
        let parent = d.parent;
        let x = _y - dd.y + 200;
        let y = _x - dd.x - 50;
        // if (d.depth == 0) y = _y;
        let px = parent.y;
        let py = parent.x;
        if (parent.depth == 0) py = _x;
        if (parent.depth == 0) px = _y;
        return "M" + x + "," + y
          + " C" + (px) + "," + y
          + " " + (px) + "," + py
          + " " + px + "," + py;
      });

    /* 文字和标记 */
    let node = g.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
      .attr("class", function (d) {
        return "node" + (d.children ? " node--internal" : " node--leaf");
      })
      .attr("transform", function (d,i) {
        // let x = d.y;
        // let y = d.x;
        if (d.depth == 1) {d = rootArr[i-1];}
        let x = _y - d.y + 200;
        let y = _x - d.x - 50;
        if (d.depth == 0) y = me.height / 2;
        return "translate(" + x + "," + y + ")";
      });

    node.append("circle")
      .attr("r", function (d) {
        if (d.depth === 0) return 6;
        else return 5;
      })
      .style('fill', '#12ffff');

    node.append("text")
      .attr("dy", '0.35em')
      .attr("x", function () {
        if (me.isLeft) {
          return -15;
        } else {
          return 15
        }
      })
      .text(function (d) {
        let str = '';
        let t = d.data.name;
        // if (t.length > 6) {
        //   str = t.substring(0, 6) + '...'
        // } else {
          str = t;
        // }
        return str;
      })
      .style("text-anchor", `${me.isLeft ? 'end' : 'start'}`)
      .style("transform", `${!me.isLeft ? 'rotateY(180deg)' : 'rotateY(0deg)'}`)
      .style("font-size", 14 * me.scale)
      .style("fill", '#fff');
  };

  componentDidUpdate() {
    let me = this;
    if (!me._flag) { return };
    me._flag = false;
    me.draw();
  };
}
export default TreeChart;
