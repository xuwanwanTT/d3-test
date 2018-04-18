import React, { Component } from 'react';
import FirstThree from '../../components/3d-first/first-3d';

class Three extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    let me = this;
  }

  render() {
    let me = this;
    return (
      <div>
        <FirstThree />
      </div>
    )
  }
};

export default Three;
