import React, { Component } from 'react';
// import PieArea from '../../components/piechart/pie-area';
// import PieChart from '../../components/piechart/PieChart';
import CirclePie from '../../components/piechart/CirclePie';

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
        {/* <PieArea /> */}
        {/* <PieChart style={me.pieChart} /> */}
        <div ref={'circlePieRef'} ></div>
      </div>
    )
  }

  componentDidMount() {
    const me = this;
    const ref = me.refs;
    let circlePie = new CirclePie();
    circlePie.width = 500;
    circlePie.height = 300;
    ref.circlePieRef.appendChild(circlePie.domElement);
  }
};

export default Pie;
