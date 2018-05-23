import React, { Component } from 'react';
import echarts from "echarts";

class ShapeBar extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const me = this;
    let data = [30, 260, 150, 500, 80];
    let echart = echarts.init(me.refs.shapeBarRef);
    let option = {
      xAxis: {
        type: 'category',
        data: [1, 2, 3, 4, 5],
        axisLabel: {
          textStyle: {
            color: '#fff'
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#999'
          }
        }
      },
      series: {
        name: "xxx",
        type: 'pictorialBar',
        // symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',

        symbol: 'path://M111.554,265h-0.127A196.181,196.181,0,0,1,86,357h50.989A196.185,196.185,0,0,1,111.554,265Z',


        data: [{
          value: 130, label: {
            emphasis: {
              show: true,
              position: "top"
            }
          },
        }, 260, 150, 500, 80],
      }
    }
    echart.setOption(option)
  }

  componentDidUpdate() { }

  render() {
    const me = this;
    return (
      <div>
        <div style={{ width: 300, height: 300 }} className={"shape-bar"} ref={"shapeBarRef"}></div>
      </div>
    )
  }
}

export default ShapeBar;
