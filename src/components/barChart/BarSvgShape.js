import { createElementNS, SVG_NS, UiComponent } from '@jusfoun-vis/common';
import * as d3 from 'd3';
import uuid from 'uuid';

const colorArr = [
  ['rgba(255,255,255,0)', 'rgba(255,255,255,.3)'],
  ['rgba(255,255,255,0)', 'rgba(255,255,255,.6)']
];

class chart extends UiComponent {
  constructor() {
    super();
    const me = this;
    me._domElement = createElementNS(SVG_NS, 'svg');
    me._svg = d3.select(me._domElement);
    me._data = [];
    me.barWidth = 16;
    me.bezier = 7;
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
    this.updateSize();
  }

  get data() {
    return this._data;
  }

  isUpdateSize = false;

  updateSize() {
    this.isUpdateSize = true;
    this.invalidateProperties();
  }

  commitProperties() {
    const me = this;
    if (me.isUpdateSize) {
      me.isUpdateSize = false;
      me.changeSize();
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
    me.drawBar(me._svg, xScale, yScale, dx, dy, me._width, me._height, colorId);
    me.createLegend(me._svg, me._width, me._height, dx, dy, legendColor)
  }

  // 坐标轴
  drawAxis(svg, width, height, gride) {
    let dy = gride.y || 40;
    let dx = gride.x || 60;
    let dataY = this.data.dataY || [0, 60000];
    let dataX = this.data.dataX || ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];

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
      .domain(dataY)
      .range([height - 2 * dy, 0]);

    let yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(6)
      .tickSize(0)
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

  // 柱图
  drawBar(svg, x, y, dx, dy, width, height, id) {
    const me = this;
    let data = me.data.data || [{ name: 2005, value: 48881 }, { name: 2006, value: 41815 }, { name: 2007, value: 43990 }, { name: 2008, value: 48881 }, { name: 2009, value: 48881 }, { name: 2010, value: 48881 }, { name: 2011, value: 48881 }, { name: 2012, value: 48881 }];

    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);
    let bar = g.selectAll('g').data(data).enter()
      .append('g');

    bar.append('path')
      .attr('fill', function (d, i) {
        return `url(#${id[0]})`
      })
      .attr('stroke-width', '1')
      .attr('stroke', 'rgba(255,255,255,.3)')
      .style('cursor', 'pointer')
      .on('mouseover', function (d, i) {
        d3.select(this).attr('fill', `url(#${id[1]})`);
        text.style('fill', function (d, j) {
          if (j == i) {
            return '#fff';
          } else {
            return 'rgba(255,255,255,.8)';
          }
        });
      })
      .on('mouseout', function (d, i) {
        d3.select(this).attr('fill', `url(#${id[0]})`);
        text.style('fill', function () {
          return 'rgba(255,255,255,.8)';
        });
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {
        let h = height - 2 * dy - y(d.value);
        let l = x(d.name) + me.xStep / 2;
        let o = l - me.barWidth / 2;
        let e = l + me.barWidth / 2;

        let i = d3.interpolate(0, h);
        return function (t) {
          return `M${0.5 + o},0 C${0.5 + o + me.bezier},-${i(t) / 8} ${0.5 + o + me.bezier},-${3 * i(t) / 4} ${l},-${i(t)} C${0.5 + e - me.bezier},-${3 * i(t) / 4} ${0.5 + e - me.bezier},-${i(t) / 8} ${0.5 + e},0`;
        }
      });

    // 背景线
    bar.append('path')
      .attr('stroke-width', '1')
      .attr('stroke', 'rgba(255,255,255,.2)')
      .attr('d', function (d) {
        let h = height - 2 * dy - y(d.value);
        let l = x(d.name) + me.xStep;
        return `M${l + 0.5},0 V-${height - 2 * dy}`;
      })

    // 文字
    let text = bar.append('text')
      .attr('x', function (d, i) {
        let l = x(d.name) + me.xStep / 2;
        return l;
      })
      .attr('y', function (d, i) {
        let h = height - 2 * dy - y(d.value) + 10;
        return -h;
      })
      .style('text-anchor', 'middle')
      .style('fill', 'rgba(255,255,255,.8)')
      .style('font-size', 14)
      .text(function (d, i) {
        return d.value
      })
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
  createLegend(svg, width, height, dx, dy, id) {
    let legend = svg.append('g')
    legend.append('path')
      .attr('stroke', '#fff')
      .attr('fill', `url(#${id})`)
      .attr('d', function () {
        let o = width - 115;
        let e = dy / 2 - 1;
        let h = 6;
        let l = 16;
        return `M${o},${e} H${o + l} V${e - h} H${o} V${e}`;
      })

    legend.append('text')
      .attr('x', width - 90)
      .attr('y', dy / 2)
      .style('fill', '#fff')
      .text('生猪存栏：万头')
  }

  resize(scale) {
    this._svg.selectAll('*').remove();
    this.changeSize(scale);
    this.draw();
  }
};

export default chart;
