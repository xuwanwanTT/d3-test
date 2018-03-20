import React, {Component} from 'react';
import CircleLine from '../../components/lineChart/circleline';

class Line extends Component {
  constructor(){
    super()
  };

  circleline = {
    position: "absolute",
    width: 500,
    height: 300,
    top: 80,
    left: 50
  };

  render(){
    let me = this;
    return (
      <div>
        <CircleLine style={me.circleline} ref={'circleLineRef'} type={1}/>
      </div>
    )
  };

  componentDidMount(){};
};

export default Line;
