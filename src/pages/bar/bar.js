import React, { Component } from 'react';
import BaseBar from "../../components/barChart/basebar";
import ShapeBar from "../../components/barChart/shapebar";
import HorizontalBar from '../../components/barChart/HorizontalBar';

class Bar extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div>
        {/* <BaseBar /> */}
        {/* <ShapeBar /> */}
        <div ref={'horizonRef'} style={{}}></div>
      </div>
    )
  }

  componentDidMount() {
    const me = this;
    const ref = me.refs;
    let barChart = new HorizontalBar();
    barChart.width = 600;
    barChart.height = 400;
    barChart.unit = '人';
    barChart.textSize = 24;
    barChart.data = [
      { name: '大索道上部栈道03', value: 10 },
      { name: '高尔夫球场04', value: 20 },
      { name: '云杉坪草坪左2', value: 30 },
      { name: '蓝月谷3号厕所', value: 40 },
      { name: '临时停车场中部', value: 40 },
      { name: '大索道上部栈道01', value: 50 },
      { name: '大索道上部栈道02', value: 60 },
      { name: '蓝月谷3号厕所1', value: 70 },
      { name: '临时停车场中部2', value: 80 },
      { name: '大索道上部栈道013', value: 100 },
    ];
    ref.horizonRef.appendChild(barChart.domElement);
  }
};

export default Bar;
