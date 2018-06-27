import { createElementNS, SVG_NS, UiComponent } from '@jusfoun-vis/common';
import * as d3 from 'd3';
import uuid from 'uuid';

const color = [
  ['#ffff3b', '#fec710'],
  ['#00ffae', '#52fff1'],
  ['#0eb8ff', '#178aff'],
  ['#0acdfa', '#62d8ff'],
];

class HorizontalBar extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._domElement = createElementNS(SVG_NS, 'svg');
    me._svg = d3.select(me._domElement);
    me._barH = 20;
    me._tooltipH = 40;
    me._tooltipL = 90;
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

  set barH(value) {
    this._barH = value;
    this.updateSize();
  }

  get barH() {
    return this._barH;
  }

  set unit(value) {
    this._unit = value;
    this.updateSize();
  }

  get unit() {
    return this._unit;
  }

  set colorBg(value) {
    this._colorBg = value;
    this.updateSize();
  }

  get colorBg() {
    return this._colorBg;
  }

  set colorText(value) {
    this._colorText = value;
    this.updateSize();
  }

  get colorText() {
    return this._colorText;
  }

  set colorLine(value) {
    this._colorLine = value;
    this.updateSize();
  }

  get colorLine() {
    return this._colorLine;
  }

  set colorBar(value) {
    this._colorBar = value;
    this.updateSize();
  }

  get colorBar() {
    return this._colorBar;
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

  set tooltopFont(value) {
    this._tooltopFont = value;
    this.updateSize();
  }

  get tooltopFont() {
    return this._tooltopFont;
  }

  set textSize(value) {
    this._textSize = value;
    this.updateSize();
  }

  get textSize() {
    return this._textSize;
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

  draw() {
    const me = this;
    let colorArr = me._colorBar || color
    let colorId = me.setColor(me._svg, colorArr);
    let scale = me.drawAxis(me._svg, me._width, me._height, me._gride ? me._gride : []);
    let xScale = scale.x;
    let yScale = scale.y;
    let dx = scale.dx;
    let dy = scale.dy;
    me.drawBar(me._svg, xScale, yScale, dx, dy, me._width, me._height, colorId);
    me.tooltip = me.tooltip(me._svg);
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
      .style('fill', this._colorLine || 'rgba(0,255,238,1)')
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
    x.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', this._colorLine || 'rgba(0,255,238,1)');
    x.selectAll('text').attr('font-size', this._textSize).attr('fill', this._colorText || '#c5fdff');

    // y 轴
    let yScale = d3.scaleBand()
      .domain(dataY)
      .range([height - 2 * dy, 0]);
    this.yStep = yScale.step();
    let yAxis = d3.axisLeft().scale(yScale)
      .tickSize(0)
      .tickPadding(12);
    let y = axis.append('g')
      .attr('transform', `translate(${dx} ${dy})`)
      .call(yAxis);
    y.select('path').attr('marker-end', 'url(#svg-arrow)').attr('stroke', this._colorLine || 'rgba(0,255,238,1)');
    y.selectAll('text').attr('font-size', this._textSize).attr('fill', this._colorText || '#c5fdff');

    return {
      x: xScale,
      y: yScale,
      dx,
      dy
    };
  }

  // 柱子
  drawBar(svg, x, y, dx, dy, width, height, id) {
    const me = this;
    let data = me.data.data;
    let len = data.length - 1;
    let barh = me._barH;
    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);
    let bar = g.selectAll('g').data(data).enter()
      .append('g');

    // bar2 bg
    bar.append('path')
      .attr('d', function (d, i) {
        let h = height - 2 * dy - (y(d.name) + me.yStep / 2);
        let l = x(me.data.dataX[1])
        return `M1,${-(h - barh / 2)} H${l} V${-(h + barh / 2)} H1`
      })
      .style('fill', me._colorBg || 'rgba(36,169,224,.3)');

    // bar1
    bar.append('path')
      .style('fill', function (d, i) {
        let index = len - i;
        return `url(#${index > (id.length - 2) ? id[id.length - 1] : id[index]})`
      })
      .style('cursor', 'pointer')
      .on('mouseover', function (d, i) {
        let h = y(d.name) + me.yStep / 2;
        let l = x(d.value) + dx;
        me.tooltip.transition()
          .duration(400)
          .attr('opacity', 1)
          .attr('transform', `translate(${l - me._tooltipL},${h + me._tooltipH / 2})`);
        me.tooltip.select('text').text(`${d.value + me._unit}`)
      })
      .on('mouseout', function (d, i) {
        me.tooltip.transition()
          .duration(400)
          .attr('opacity', 0);
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        let h = height - 2 * dy - (y(d.name) + me.yStep / 2);
        let l = x(d.value) - barh / 2;
        let i = d3.interpolate(0, l);
        return function (t) {
          return `M1,${-(h - barh / 2)} H${i(t)} A${barh / 2},${barh / 2} 0 1,0 ${i(t)},${-(h + barh / 2)} H1`;
        }
      });
  }

  // 渐变
  setColor(svg, arr) {
    const me = this;
    return arr.map(s => { return me.colorX(svg, s) });
  }

  colorX(svg, color) {
    let id = uuid.v1();
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
    return id;
  }

  showTooltip(type) {
    this.tooltip.transition()
      .duration(400)
      .attr('opacity', type ? 1 : 0);
  }

  tooltip(svg) {
    const me = this;
    let h = me._tooltipH;
    let l = me._tooltipL;
    let tooltipFont = me._tooltopFont || {
      fontSize: me._textSize,
      color: '#fff'
    };
    let tooltip = svg.append('g')
      .attr('opacity', 0)
      .attr('transform', `translate(0,-100)`);
    tooltip.append('path')
      .attr('d', `M0,0 H${l} V${h} H0 Z`)
      .attr('stroke-width', 3)
      .attr('stroke', me._colorLine || 'rgba(0,255,238,1)')
      .attr('fill', 'rgba(29,32,136,.7)');
    tooltip.append('text')
      .attr('x', 10)
      .attr('y', tooltipFont.fontSize + (h - tooltipFont.fontSize - 3) / 2)
      .attr('font-size', tooltipFont.fontSize)
      .attr('fill', tooltipFont.color)
      .text('666');
    tooltip.on('mouseover', () => { me.showTooltip(1) })
      .on('mouseout', () => { me.showTooltip(0) });
    return tooltip;
  }
};

export default HorizontalBar;
