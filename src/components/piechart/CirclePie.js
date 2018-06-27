import { createElementNS, SVG_NS, UiComponent } from '@jusfoun-vis/common';
import * as d3 from 'd3';
import uuid from 'uuid';

const color = [
  ['#ffff3b', '#fec710'],
  ['#00ffae', '#52fff1'],
  ['#0eb8ff', '#178aff'],
  ['#0acdfa', '#62d8ff'],
];
const PI = Math.PI;

class CirclePie extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._domElement = createElementNS(SVG_NS, 'svg');
    me._svg = d3.select(me._domElement);
    me.isUpdateSize = false;
    me.arc = d3.arc;
    me._circleColor = ['rgba(94,254,204,1)', 'rgba(98,216,255,1)'];
    me._strokeColor = ['rgba(44,208,251,1)', 'rgba(136,246,255,1)'];
    me.data = 50;
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
    me.drawCircle();
  }

  // 生成圆path
  creatArc(R, r, start, end) {
    let path = this.arc()
      .cornerRadius(50)
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end);
    return path();
  }

  // circle
  drawCircle() {
    const me = this;
    let svg = me._svg;
    let width = me._width;
    let height = me._height;
    let r = width > height ? (height - 10) / 2 : (width - 10) / 2;
    let circle = svg.append('g')
      .attr('transform', `translate(${width / 2} ${height / 2})`);

    // 背景圆环
    circle.append('path')
      .attr('d', function () {
        return me.creatArc(r, r - 30, 0, 2 * PI)
      })
      .attr('fill', 'rgba(0,204,240,.15)');

    // 圆环
    circle.append('path')
      .attr('d', function () {
        return me.creatArc(r, r - 30, 0, 2 * PI * me.data / 100)
      })
      .attr('fill', `url(#${me.colorY(me._circleColor)})`)
      .attr('stroke', `url(#${me.colorY(me._strokeColor)})`)
      .attr('stroke-width', 2);
    // 端点
    circle.append('path')
      .attr('d', function () {
        return me.creatArc(r, r - 30, 0, 2 * PI * me.data / 100)
      })
      .attr('fill', `url(#${me.colorY(me._circleColor)})`)
      .attr('stroke', `url(#${me.colorY(me._strokeColor)})`)
      .attr('stroke-width', 2);
  }

  // 渐变

  colorY(color) {
    let svg = this._svg;
    let id = uuid.v1();
    let linear = svg.append('defs').append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    for (let i = 0; i < color.length; i++) {
      linear.append('stop')
        .attr("offset", 100 * i + '%')
        .style("stop-color", color[i]);
    }
    return id;
  }
};

export default CirclePie;
