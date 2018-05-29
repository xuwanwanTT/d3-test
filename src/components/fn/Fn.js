import React from 'react';
import * as d3 from "d3";

/**
 * xf
 * svg 画布
 * width 箭头大小
 * color 箭头颜色
*/
export function arrow(svg, width, color) {
  let len = width;
  if (!len) { len = 12; }
  svg.append('defs').append('marker')
    .attr('id', 'svg-arrow')
    .attr('markerWidth', len)
    .attr('markerHeight', len)
    .attr('orient', 'auto')
    .attr('viewBox', '-4, -3, 12, 12')
    .append('path')
    .attr('d', 'M0 -4 L10 0 L0 4 L 3 0')
    .attr('transform', 'rotate(90) translate(-3 .5)')
    .style('fill', color)
    .style('stroke-width', 0);
};

function colorX(svg, id) {
  let linear = svg.append('defs').append("linearGradient")
    .attr("id", id)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "100%")
    .attr("y2", "0%");
  return linear;
}

function colorY(svg, id) {
  let linear = svg.append('defs').append("linearGradient")
    .attr("id", id)
    .attr("x1", "0%")
    .attr("y1", "0%")
    .attr("x2", "0%")
    .attr("y2", "100%");
  return linear;
}

/**
 * xf
 * svg 画布
 * id 渐变色id
 * color 对象 {type:'x',ratio:[num,num,num],color:[[],[],[]]}
 * color.type 可选 x,表示 left to right; 默认 top to bottom
 * color.ratio 可选 [num,num,num] 指定各颜色的占比
*/
export function color(svg, id, color) {
  let linear = colorY(svg, id);
  if (color.type == 'x') { linear = colorX(svg, id) };
  let colorList = color.color;
  let len = colorList.length;
  let diff = 100 / (len - 1);
  let ratio;
  if (color.ratio) { ratio = color.ratio; }
  for (let i = 0; i < len; i++) {
    let temp = diff * i;
    if (ratio) {
      temp = ratio[i];
    }
    linear.append('stop')
      .attr("offset", `${temp}%`)
      .style("stop-color", color.color[i]);
  }
}
