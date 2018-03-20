import React, { Component } from 'react';
import BaseBar from "../../components/barChart/basebar";

class Bar extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div>
        <BaseBar />
      </div>
    )
  }

  componentDidMount() { }
};

export default Bar;
