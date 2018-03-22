import React, { Component } from 'react';
import SvgBase from '../../components/svgfirst/svgBase';

class SvgFirst extends Component {
  constructor() {
    super()
  }

  render() {
    let me = this;
    return (
      <div>
        <SvgBase width={1900} height={600} />
      </div>
    )
  }

  componentDidMount() { }
};

export default SvgFirst;
