import React, { Component } from 'react';
import PieArea from '../../components/piechart/pie-area';

class Pie extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div>
        <PieArea />
      </div>
    )
  }

  componentDidMount() { }
};

export default Pie;
