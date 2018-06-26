import React, { Component } from 'react';
import PieArea from '../../components/piechart/pie-area';
import PieChart from '../../components/piechart/PieChart';

class Pie extends Component {
  constructor() {
    super();
    const me = this;
    me.pieChart = {
      width: 500,
      height: 400,
      position: 'absolute',
      top: 90,
      left: 400
    };
  }

  render() {
    let me = this;
    return (
      <div>
        <PieArea />
        <PieChart style={me.pieChart} />
      </div>
    )
  }

  componentDidMount() { }
};

export default Pie;
