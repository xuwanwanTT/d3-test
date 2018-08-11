import { createElementNS, SVG_NS, UiComponent } from '@jusfoun-vis/common';
import * as d3 from 'd3';
import uuid from 'uuid';

const colorArr = [
  ['rgba(255,255,255,0)', 'rgba(255,255,255,.3)'],
  ['rgba(255,255,255,0)', 'rgba(255,255,255,.6)']
];
const PI = Math.PI;
const data1 = [{ name: '1月', value: 31 }, { name: '2月', value: 62 }, { name: '3月', value: 33 }, { name: '4月', value: 63 }, { name: '5月', value: 33 }, { name: '6月', value: 63 }, { name: '7月', value: 33 }, { name: '8月', value: 61 }, { name: '9月', value: 33 }, { name: '10月', value: 61 }, { name: '11月', value: 34 }, { name: '12月', value: 62 }];
const data2 = [{ name: '1月', value: 61 }, { name: '2月', value: 32 }, { name: '3月', value: 63 }, { name: '4月', value: 33 }, { name: '5月', value: 63 }, { name: '6月', value: 33 }, { name: '7月', value: 63 }, { name: '8月', value: 31 }, { name: '9月', value: 63 }, { name: '10月', value: 31 }, { name: '11月', value: 64 }, { name: '12月', value: 32 }];

class chart extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._domElement = createElementNS(SVG_NS, 'svg');
    me._svg = d3.select(me._domElement);
    me._data = [];
    me.barWidth = 16;
    me.bezier = 7;
    me.tooltipW = 130;
    me.tooltipH = 50;
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

  set data(value) {
    this._data = value;
    let max = 0;
    let min = value[0].value;
    let dataX = [];
    value.forEach(s => {
      if (max < s.value) { max = s.value; }
      if (min > s.value) { min = s.value; }
      dataX.push(s.name);
    });
    this.dataY = [Math.floor(min), Math.ceil(max)];
    this.dataX = dataX;
    this.updateData();
  }

  get data() {
    return this._data;
  }

  set gride(value) {
    this._gride = value;
    this.updateSize();
  }
  get gride() {
    return this._gride;
  }

  set textSize(value) {
    this._textSize = value;
    this.updateSize();
  }

  get textSize() {
    return this._textSize;
  }

  isUpdateSize = false;
  isUpdateData = false;

  updateData() {
    this.isUpdateData = true;
    this.invalidateProperties();
  }

  updateSize() {
    this.isUpdateSize = true;
    this.invalidateProperties();
  }

  commitProperties() {
    const me = this;
    if (me.isUpdateSize) {
      me.isUpdateSize = false;
      me.changeSize();
    }
    if (me.isUpdateData) {
      me.draw();
    }
  }

  changeSize(s) {
    const me = this;
    const svg = me.svg;
    const domElement = me.domElement;
    const style = domElement.style;
    const scale = s || 1;
    me._width *= scale;
    me._height *= scale;
    svg.width = me._width;
    svg.height = me._height;
    style.width = me._width;
    style.height = me._height;

    me.barWidth = 16 * scale;
    me.bezier = 6 * scale;
  }

  draw() {
    const me = this;
    let colorId = me.setColor(me._svg, colorArr);
    let legendColor = me.colorX(me._svg, ['rgba(255,255,255,1)', 'rgba(255,255,255,0)'])
    let scale = me.drawAxis(me._svg, me._width, me._height, me._gride ? me._gride : []);
    let xScale = scale.x;
    let yScale = scale.y;
    let dx = scale.dx;
    let dy = scale.dy;
    me.line = d3.line()
      .x(function (d) { return xScale(d.name) + me.xStep / 2; })
      .y(function (d) { return -(me._height - 2 * dy - yScale(d.value)); })
      .curve(d3.curveCatmullRom.alpha(0.5));
    let g1 = me.drawLine(me._svg, data1, xScale, yScale, dx, dy, me._width, me._height, 'red');
    let g2 = me.drawLine(me._svg, data2, xScale, yScale, dx, dy, me._width, me._height, 'blue');
    me.createLegend(me._svg, me._width, me._height, dx, dy, legendColor, ['美国', '中国'], ['red', 'blue']);
    me.createTooltip(me._svg, me._width, me._height, xScale, dx);
    me.createUnit(me._svg);
    setInterval(() => {
      me.ani(g1, g2);
    }, 30)
  }

  // 坐标轴
  drawAxis(svg, width, height, gride) {
    let dy = gride.y || 40;
    let dx = gride.x || 60;
    let dataY = this.dataY;
    let dataX = this.dataX;

    // x 轴
    let axis = svg.append('g');
    let xScale = d3.scaleBand()
      .domain(dataX)
      .range([0, width - dx]);
    this.xStep = xScale.step();
    let xAxis = d3.axisBottom()
      .scale(xScale)
      // .tickFormat(function (d) { return d + '%'; })
      .tickSize(0)
      .tickPadding(12);
    let x = axis.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`)
      .call(xAxis);
    x.selectAll('text').attr('font-size', this._textSize).attr('fill', this._colorText || '#fff');
    x.select('.domain').attr('stroke', 'rgba(255,255,255,.5)')

    // y 轴
    let yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([height - 2 * dy, 0]);

    let yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(6)
      .tickSize(0)
      .tickFormat(function (d) { return d + '%'; })
      .tickPadding(12);
    let y = axis.append('g')
      .attr('transform', `translate(${dx} ${dy})`)
      .call(yAxis);
    y.selectAll('text').attr('font-size', this._textSize).attr('fill', this._colorText || '#fff');
    y.select('.domain').attr('stroke', 'rgba(255,255,255,.5)');

    return {
      x: xScale,
      y: yScale,
      dx,
      dy
    };
  }

  // 折线
  drawLine(svg, data, x, y, dx, dy, width, height, color) {
    const me = this;
    let lineData = me.line(data);

    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);

    let line = g
      .selectAll('g')
      .data(data)
      .enter()
      .append('g');

    line.attr('transform', function (d, i) {
      return `translate(${1.5 * i} ${-2 * i})`
    })
    line.append('path')
      .attr('fill', function (d, i) {
        return `none`
      })
      .attr('stroke-width', '1')
      .attr('stroke', function (d, i) {
        return color || '#fff';
      })
      .style('opacity', function (d, i) {
        return 1 - i / 12;
      })
      .style('cursor', 'pointer')
      .attr('d', function () {
        return lineData;
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {

      });

    // let lastDom = document.createElementNS(SVG_NS, 'path');
    // d3.select(lastDom).attr('d', me.line(dataLast))
    // me.lastLength = lastDom.getTotalLength();

    // line.select('path').attr('getWidth', function () {
    //   me.totalWidth = this.getTotalLength();
    // })
    //   .attr('stroke-dasharray', function () {
    //     let o = me.totalWidth - me.lastLength;
    //     let e = me.lastLength;
    //     let end = '';
    //     for (let i = 0; i < 50; i++) {
    //       end += ',' + e / 50
    //     }
    //     return o + end
    //   });

    // 背景线
    line.append('path')
      .attr('stroke-width', '1')
      .attr('stroke', 'rgba(255,255,255,.2)')
      .attr('d', function (d, i) {
        if (i > 4) { return }
        let h = height - 2 * dy - y(20 * (i + 1));
        return `M${0.5 - 1.5 * i},-${h - 0.5 - 2 * i} H${width - dx}`;
      });

    // 指示线
    me._AxiosLine = line.append('path');
    me._AxiosLine.style('cursor', 'pointer')
      .attr('stroke-width', '1')
      .attr('stroke', 'rgba(255,255,255,0)')
      .attr('d', function (d, i) {
        let h = height - 2 * dy - y(d.value);
        let l = x(d.name) + me.xStep / 2;
        return `M${l + 0.5 - 1.5 * i},${2 * i} V-${height - 2 * dy - 2 * i}`;
      });
    return g;
  }

  // 渐变
  setColor(svg, arr) {
    const me = this;
    return arr.map(s => { return me.colorY(svg, s) });
  }

  colorY(svg, color) {
    let id = uuid.v1();
    let linear = svg.append('defs').append("linearGradient")
      .attr("id", id)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    for (let i = 0; i < color.length; i++) {
      let rate = i == 0 ? 40 : 100;
      linear.append('stop')
        .attr("offset", rate + '%')
        .style("stop-color", color[i]);
    }
    return id;
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
      let rate = i == 0 ? 0 : 100;
      linear.append('stop')
        .attr("offset", rate + '%')
        .style("stop-color", color[i]);
    }
    return id;
  }

  // legend
  createLegend(svg, width, height, dx, dy, id, text, color) {
    let legend = svg.append('g');
    legend.append('path')
      .attr('stroke-width', 3)
      .attr('stroke', color[0])
      .attr('d', function () {
        let o = width - 145;
        let e = dy / 2 - 4;
        let h = 6;
        let l = 30;
        return `M${o}, ${e} H${o + l}`;
      });

    legend.append('text')
      .attr('x', width - 110)
      .attr('y', dy / 2)
      .style('fill', '#fff')
      .text(text[0])

    legend.append('path')
      .attr('stroke-width', 3)
      .attr('stroke', color[1])
      .attr('d', function () {
        let o = width - 60;
        let e = dy / 2 - 4;
        let h = 6;
        let l = 30;
        return `M${o}, ${e} H${o + l} `;
      });

    legend.append('text')
      .attr('x', width - 25)
      .attr('y', dy / 2)
      .style('fill', '#fff')
      .text(text[1]);
  }

  // unit
  createUnit(svg, text) {
    const me = this;
    let unit = svg.append('g');
    unit.append('text')
      .style('fill', '#fff')
      .style('font-size', 14)
      .attr('x', me._gride.x)
      .attr('y', me._gride.y / 2)
      .style('text-anchor', 'middle')
      .text(text)
  }

  // tooltip
  createTooltip(svg, width, height, x, dx) {
    const me = this;
    let data = me.dataX;
    let dom = me._AxiosLine._groups;
    let len = data.length;
    let tooltip = svg.append('g').style('opacity', 0)
    tooltip.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', me.tooltipW || 130)
      .attr('height', me.tooltipH || 50)
      .attr('fill', 'rgba(255,255,255,.2)')
      .attr('stroke', 'rgba(255,255,255,1)')
      .attr('stroke-width', 2);
    tooltip.append('text')
      .attr('x', 10)
      .attr('y', 20);
    tooltip.append('text')
      .attr('x', 10)
      .attr('y', 40);
    tooltip.selectAll('text').style('fill', '#fff')
      .style('font-size', 14)


    me._domElement.onmousemove = e => {
      // let startPos = getLocalPosition(e, me._svg);
      let xSite = e.offsetX;
      let ySite = e.offsetY;
      me._AxiosLine.attr('stroke', function (d, i) {
        return 'rgba(255,255,255,0)'
      });
      // console.log(e.x, max, min)
      for (let i = 0; i < len; i++) {
        let max = x(data[i]) + me.xStep + dx;
        let min = x(data[i]) + dx;
        if (xSite < max && xSite > min) {
          d3.select(dom[0][i]).attr('stroke', 'rgba(255,255,255,.6)');
          tooltip.selectAll('text').text(function (d, j) {
            if (j == 0) {
              return data1[i].name;
            } else {
              return '价格：' + data1[i].value + ' 元/公斤';
            }
          });
          let moveX = xSite + 30;
          let moveY = ySite + 30;
          if (moveX > width - me.tooltipW) { moveX = xSite - me.tooltipW - 30 }
          if (moveY > height - me.tooltipH - 10) { moveY = ySite - me.tooltipH - 30 }
          tooltip.attr('transform', `translate(${moveX} ${moveY})`)
            .style('opacity', 1);
          return;
        }
      }

    };
    me._domElement.onmouseleave = e => {
      me._AxiosLine.attr('stroke', function (d, i) {
        return 'rgba(255,255,255,0)'
      });
      tooltip.style('opacity', 0)
    };
  }

  // animation
  angle = 0;
  angleTemp = 0.07;
  aniK = 3;
  ani(g1, g2) {
    const me = this;
    me.angle -= me.angleTemp;

    g1.selectAll('g').select('path').attr('d', function (d, i) {
      let dist = [];
      if (i == 0) { return me.line(data1) }
      let diff = me.aniK * Math.cos(me.angle + PI * i / 22);

      data1.forEach((s, i) => {
        if (i !== 0 && i !== 11) {
          let temp = { ...s };
          temp.value += diff;
          dist.push(temp);
        } else {
          dist.push(s)
        }
      });
      return me.line(dist)
    });
    g2.selectAll('g').select('path').attr('d', function (d, i) {
      let dist = [];
      if (i == 0) { return me.line(data2) }
      let diff = 3.5 * Math.cos(me.angle + PI * i / 11);

      data2.forEach((s, i) => {
        if (i !== 0 && i !== 11) {
          let temp = { ...s };
          temp.value += diff;
          dist.push(temp);
        } else {
          dist.push(s)
        }
      });
      return me.line(dist)
    });
  }

  resize(scale) {
    this._svg.selectAll('*').remove();
    this.changeSize(scale);
    this.draw();
  }
};

export default chart;
