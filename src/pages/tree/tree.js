import React, { Component } from 'react';
import TreeChart from '../../components/treeChart/treechart';
import Basetree from '../../components/treeChart/basetree';

class Tree extends Component {
  constructor() {
    super()
  };

  treeChart = {
    width: 300,
    height: 230,
    top: 25,
    left: 80,
  }

  render() {
    let me = this;
    return (
      <div>
        <TreeChart style={me.treeChart} ref="treeChartRef" />
        <Basetree />
      </div>
    )
  };

  componentDidMount() { };
};

export default Tree;
