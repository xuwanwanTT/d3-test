import React, { Component } from 'react';
import CircleLine from '../../components/lineChart/circleline';
import LineSvgDash from '../../components/lineChart/LineSvgDash';
import LineDouble from '../../components/lineChart/LineSvgDouble';
import LineAxisDouble from '../../components/lineChart/LineSvgAxisDouble';

class Line extends Component {
  constructor() {
    super()
  };

  circleline = {
    position: "absolute",
    width: 500,
    height: 300,
    top: 80,
    left: 50
  };

  render() {
    let me = this;
    return (
      <div>
        {/* <CircleLine style={me.circleline} ref={'circleLineRef'} type={1} /> */}
        <div ref={'lineChartRef'}></div>
      </div>
    )
  };

  componentDidMount() {
    const me = this;
    const ref = me.refs;

    // let lineChart = new LineSvgDash();
    // lineChart.width = 450 + 40;
    // lineChart.height = 218;
    // ref.lineChartRef.appendChild(lineChart.domElement);

    // let chart = new LineDouble();
    // chart.width = 845 + 30;
    // chart.height = 130 + 80;
    // chart.gride = { x: 60, y: 40 };
    // chart.textSize = 14;
    // chart.data = [{ name: '1月', value: 5.1 }, { name: '2月', value: 6.2 }, { name: '3月', value: 5.5 }, { name: '4月', value: 6.5 }, { name: '5月', value: 5.3 }, { name: '6月', value: 6.3 }, { name: '7月', value: 5.5 }, { name: '8月', value: 6.1 }, { name: '9月', value: 5.3 }, { name: '10月', value: 6.1 }, { name: '11月', value: 5.4 }, { name: '12月', value: 6.2 }];

    let chart = new LineAxisDouble();
    chart.width = 845 + 30;
    chart.height = 130 + 80;
    chart.gride = { x: 60, y: 40, xL: 50 };
    chart.textSize = 14;
    chart.data = [];
    chart.data1 = [];
    chart.data2 = [];

    ref.lineChartRef.appendChild(chart.domElement);
  };
};

export default Line;
