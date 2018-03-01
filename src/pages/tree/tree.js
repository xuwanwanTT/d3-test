import React, {Component} from 'react';
import TreeChart from '../../components/treeChart/treechart';

class Tree extends Component {
  constructor(){
    super()
  };

  treeChart = {
    width: 300,
    height: 230,
    top: 25,
    left: 80,
  }

  render(){
    let me = this;
    return (
      <div>
        <TreeChart style={me.treeChart} ref="treeChartRef" />
      </div>
    )
  };

  componentDidMount(){};
};

export default Tree;