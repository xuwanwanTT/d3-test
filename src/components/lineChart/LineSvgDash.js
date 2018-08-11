import { createElementNS, SVG_NS, UiComponent } from '@jusfoun-vis/common';
import * as d3 from 'd3';
import uuid from 'uuid';

const colorArr = [
  ['rgba(255,255,255,0)', 'rgba(255,255,255,.3)'],
  ['rgba(255,255,255,0)', 'rgba(255,255,255,.6)']
];
const PI = Math.PI;

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
    me.line = d3.line()
      .x(function (d) { return xScale(d.name) + me.xStep / 2; })
      .y(function (d) { return -(me._height - 2 * dy - yScale(d.value)); })
      .curve(d3.curveCatmullRom.alpha(0.5));
    me.drawLine(me._svg, xScale, yScale, dx, dy, me._width, me._height, colorId);
    me.createLegend(me._svg, me._width, me._height, dx, dy, legendColor);
    me.createTooltip(me._svg, xScale, dx);
    setInterval(() => {
      me.ani();
    }, 30)
  }

  // 坐标轴
  drawAxis(svg, width, height, gride) {
    let dy = gride.y || 40;
    let dx = gride.x || 60;
    let dataY = this.data.dataY || [5, 7];
    let dataX = this.data.dataX || ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

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

  // 折线
  drawLine(svg, x, y, dx, dy, width, height, id) {
    const me = this;
    let data = me.data.data || [{ name: '1月', value: 5.1 }, { name: '2月', value: 6.2 }, { name: '3月', value: 5.5 }, { name: '4月', value: 6.5 }, { name: '5月', value: 5.3 }, { name: '6月', value: 6.3 }, { name: '7月', value: 5.5 }, { name: '8月', value: 6.1 }, { name: '9月', value: 5.3 }, { name: '10月', value: 6.1 }, { name: '11月', value: 5.4 }, { name: '12月', value: 6.2 }];
    let dataLast = [{ name: '10月', value: 6.1 }, { name: '11月', value: 5.4 }, { name: '12月', value: 6.2 }];

    let lineData = me.line(data);
    me.dataArr = data;

    let g = svg.append('g')
      .attr('transform', `translate(${dx} ${height - dy})`);
    me.lineSvgAll = g;
    let line = g
      .selectAll('g')
      .data(data)
      .enter()
      .append('g');
    me.lineSvg = line;

    line.attr('transform', function (d, i) {
      return `translate(${1.5 * i} ${-2 * i})`
    })
    line.append('path')
      .attr('fill', function (d, i) {
        return `none`
      })
      .attr('stroke-width', '1')
      .attr('stroke', function (d, i) {
        return `rgba(255,255,255,${1 - i / 12})`;
      })
      .style('cursor', 'pointer')
      .attr('d', function () {
        return lineData;
      })
      .transition()
      .duration(1000)
      .attrTween('d', function (d) {

      });

    let lastDom = document.createElementNS(SVG_NS, 'path');
    d3.select(lastDom).attr('d', me.line(dataLast))
    me.lastLength = lastDom.getTotalLength();

    line.select('path').attr('getWidth', function () {
      me.totalWidth = this.getTotalLength();
    })
      .attr('stroke-dasharray', function () {
        let o = me.totalWidth - me.lastLength;
        let e = me.lastLength;
        let end = '';
        for (let i = 0; i < 50; i++) {
          end += ',' + e / 50
        }
        return o + end
      })

    // 背景线
    line.append('path')
      .attr('stroke-width', '1')
      .attr('stroke', 'rgba(255,255,255,.2)')
      .attr('d', function (d, i) {
        if (i > 3) { return }
        let h = height - 2 * dy - y(.5 * (i + 1) + 5);
        // return `M${0.5},-${h - 0.5} H${width - dx}`;
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
        // return `M${l + 0.5},0 V-${height - 2 * dy}`;
      })

    // 文字
    // let text = bar.append('text')
    //   .attr('x', function (d, i) {
    //     let l = x(d.name) + me.xStep / 2;
    //     return l;
    //   })
    //   .attr('y', function (d, i) {
    //     let h = height - 2 * dy - y(d.value) + 10;
    //     return -h;
    //   })
    //   .style('text-anchor', 'middle')
    //   .style('fill', 'rgba(255,255,255,.8)')
    //   .style('font-size', 14)
    //   .text(function (d, i) {
    //     return d.value
    //   })
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
      .attr('fill', `#fff`)
      .attr('d', function () {
        let o = width - 125;
        let e = dy / 2 - 4;
        let h = 6;
        let l = 30;
        return `M${o}, ${e} H${o + l}`;
      });

    legend.append('text')
      .attr('x', width - 90)
      .attr('y', dy / 2)
      .style('fill', '#fff')
      .text('实际')

    legend.append('path')
      .attr('stroke', '#fff')
      .attr('fill', `#fff`)
      .attr('stroke-dasharray', '5,5')
      .attr('d', function () {
        let o = width - 55;
        let e = dy / 2 - 4;
        let h = 6;
        let l = 30;
        return `M${o}, ${e} H${o + l} `;
      });

    legend.append('text')
      .attr('x', width - 25)
      .attr('y', dy / 2)
      .style('fill', '#fff')
      .text('预测');
  }

  resize(scale) {
    this._svg.selectAll('*').remove();
    this.changeSize(scale);
    this.draw();
  }

  // tooltip
  createTooltip(svg, x, dx) {
    const me = this;
    let data = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    let dom = me._AxiosLine._groups;
    let len = data.length;





    me._domElement.onmousemove = e => {
      let xSite = e.x;
      let ySite = e.y;
      me._AxiosLine.attr('stroke', function (d, i) {
        return 'rgba(255,255,255,0)'
      });
      for (let i = 0; i < len; i++) {
        let max = x(data[i]) + me.xStep + dx;
        let min = x(data[i]) + dx;
        if (xSite < max && xSite > min) {
          d3.select(dom[0][i]).attr('stroke', 'rgba(255,255,255,.6)');
        }
      }

    };
    me._domElement.onmouseout = e => {
      me._AxiosLine.attr('stroke', function (d, i) {
        return 'rgba(255,255,255,0)'
      });
    };
  }

  // animation
  angle = 0;
  angleTemp = 0.1;
  ani() {
    const me = this;
    me.angle -= me.angleTemp;

    me.lineSvgAll.selectAll('g').select('path').attr('d', function (d, i) {
      let dist = [];
      if (i == 0) { return me.line(me.dataArr) }
      let diff = .06 * Math.cos(me.angle + PI * i / 11);

      me.dataArr.forEach((s, i) => {
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
};

export default chart;
