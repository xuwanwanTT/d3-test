import React, { Component } from 'react';
import BaseBar from "../../components/barChart/basebar";
import ShapeBar from "../../components/barChart/shapebar";

  class Bar extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div>
        <BaseBar />
        <ShapeBar/>
      </div>
    )
  }

  componentDidMount() { }
};

export default Bar;
