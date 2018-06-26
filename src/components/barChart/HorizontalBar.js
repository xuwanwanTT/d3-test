import { createElementNS, SVG_NS, UiComponent } from '@jusfoun-vis/common';
import * as d3 from 'd3';

const colorId = [
  { name: 'svg-bar-h-xf-0', value: ['#ffff3b', '#fec710'] },
  { name: 'svg-bar-h-xf-1', value: ['#00ffae', '#52fff1'] },
  { name: 'svg-bar-h-xf-2', value: ['#0eb8ff', '#178aff'] },
  { name: 'svg-bar-h-xf', value: ['#0acdfa', '#62d8ff'] },
];
const textColor = '#c5fdff';
const lineColor = 'rgba(0,255,238,1)';

class HorizontalBar extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._domElement = createElementNS(SVG_NS, 'svg');
    me._svg = d3.select(me._domElement);
    me.data = [];
  }

  get svg() {
    return this._svg;
  }

  get domElement() {
    return this._domElement;
  }

  set width(value) {
    this._width = value;
    this.updateSize();
  }

  get width() {
    return this._width;
  }

  set height(value) {
    this._height = value;
    this.updateSize();
  }

  get height() {
    return this._height;
  }

  set gride(value) {
    this._gride = value;
    this.updateSize();
  }

  get gride() {
    return this._gride;
  }

  isUpdateSize = false;

  updateSize() {
    this.isUpdateSize = true;
    this.invalidateProperties();
  }

  changeSize() {
    const me = this;
    const svg = me.svg;
    const domElement = me.domElement;
    const style = domElement.style;
    svg.width = me._width;
    svg.height = me._height;
    style.width = me._width;
    style.height = me._height;
  }

  commitProperties() {
    const me = this;
    if (me.isUpdateSize) {
      me.isUpdateSize = false;
      me.changeSize();
      me.draw();
    }
  }

  set data(d) {
    this.lock = true;
    let dataY = [];
    let countArr = [];
    const len = d.length;
    for (let i = 0; i < len; i++) {
      dataY.push(d[i].name);
      countArr.push(Number(d[i].value));
    }
    let max = Math.max.apply(null, countArr) + '';
    let maxLen = max.length - 1;
    if (maxLen == 0) { maxLen = 1; }
    let dataX = [0, Number(max[0]) * Math.pow(10, maxLen)];
    this._data = {
      dataY,
      dataX,
      data: d
    };
  }

  get data() {
    return this._data;
  }

  draw() {
    const me = this;
    me.setColor(me._svg, colorId);
    let scale = me.drawAxis(me._svg, me._width, me._height, me._gride ? me._gride : []);
    let xScale = scale.x;
    let yScale = scale.y;
    let dx = scale.dx;
    let dy = scale.dy;
    me.drawBar(me._svg, xScale, yScale, dx, dy, me._width, me._height);
    me.tooltip = me.tooltip(me._svg, dx, dy, me._height);
  }

  // 坐标轴
  drawAxis(svg, width, height, gride) {
    let dy = gride.y || 40;
    let dx = gride.x || 230;
    let dataY = this.data.dataY;
    let dataX = this.data.dataX;
    // 箭头
    svg.append('defs').append('marker')
      .attr('id', 'svg-arrow')
      .attr('markerWidth', 12)
      .attr('markerHeight', 12)
      .attr('orient', 'auto')
      .attr('viewBox', '-4, -3, 12, 12')
      .append('path')
      .attr('d', 'M0 -4 L10 0 L0 4 L 3 0')
      .attr('transform', 'rotate(90) translate(-3 .5)')
      .style('fill', lineColor)
      .style('stroke-width', 0);

    // x 轴
    let axis = svg.append('g');
    let xScale = d3.scaleLinear()
      .domain(dataX)
      .range([0, width - dx - 30]);
    let xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(9)
      // .tickFormat(function (d) { return d + '%'; })
      .tickSize(0)
      .tickPadding(12);
    let x = axis.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`)
      .call(xAxis);
    x.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', lineColor);
    x.selectAll('text').attr('font-size', 24).attr('fill', textColor);

    // y 轴
    let yScale = d3.scaleBand()
      .domain(dataY)
      .range([height - 2 * dy, 0]);
    let yAxis = d3.axisLeft().scale(yScale)
      .tickSize(0)
      .tickPadding(12);
    let y = axis.append('g')
      .attr('transform', `translate(${dx} ${dy})`)
      .call(yAxis);
    y.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', lineColor);
    y.selectAll('text').attr('font-size', 24).attr('fill', textColor);

    return {
      x: xScale,
      y: yScale,
      dx,
      dy
    };
  }

  // 柱子
  drawBar(svg, x, y, dx, dy, width, height) {
    const me = this;
    let data = me.data.data;
    let len = data.length - 1;
    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);
    let bar = g.selectAll('g').data(data).enter()
      .append('g');

    // bar2 bg
    bar.append('path')
      .attr('d', function (d, i) {
        let h = y(d.name) - (height - 3 * dy);
        let l = x(90)
        return `M1,${h} H${l} V${h - 20} H1`
      })
      .style('fill', 'rgba(36,169,224,.3)');

    // bar1
    bar.append('path')
      .style('fill', function (d, i) {
        let index = len - i;
        return `url(#${index > 2 ? colorId[3].name : colorId[index].name})`
      })
      .style('cursor', 'pointer')
      .on('mouseover', function (d, i) {
        let h = y(d.name) + dy - 5;
        let l = x(d.value) + dx;
        me.tooltip.transition()
          .duration(400)
          .attr('opacity', 1)
          .attr('transform', `translate(${l - 70},${h})`);
        me.tooltip.select('text').text(`${d.value}人`)
      })
      .on('mouseout', function (d, i) {
        me.tooltip.transition()
          .duration(400)
          .attr('opacity', 0);
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        let h = y(d.name) - (height - 3 * dy);
        let l = x(d.value) - 10;
        let i = d3.interpolate(0, l);
        return function (t) {
          return `M1,${h} H${i(t)} A10,10 0 1,0 ${i(t)},${h - 20} H1`;
        }
      });
  }

  // 渐变
  setColor(svg, arr) {
    const me = this;
    arr.forEach((s, i) => {
      me.colorX(svg, s.name, s.value);
    });
  }

  colorX(svg, id, color) {
    let linear = svg.append('defs').append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%");
    for (let i = 0; i < color.length; i++) {
      linear.append('stop')
        .attr("offset", 100 * i + '%')
        .style("stop-color", color[i]);
    }
  }

  showTooltip(type) {
    this.tooltip.transition()
      .duration(400)
      .attr('opacity', type ? 1 : 0);
  }

  tooltip(svg, dx, dy, height) {
    const me = this;
    let h = 40;
    let l = 70;
    let tooltip = svg.append('g')
      .attr('opacity', 0)
      .attr('transform', `translate(0,-100)`);
    tooltip.append('path')
      .attr('d', `M0,0 H${l} V${h} H0 Z`)
      .attr('stroke-width', 3)
      .attr('stroke', lineColor)
      .attr('fill', 'rgba(29,32,136,.7)');
    tooltip.append('text')
      .attr('x', 10)
      .attr('y', 30)
      .attr('font-size', 24)
      .attr('fill', '#fff')
      .text('666');
    tooltip.on('mouseover', () => { me.showTooltip(1) })
      .on('mouseout', () => { me.showTooltip(0) });
    return tooltip;
  }
};

export default HorizontalBar;
