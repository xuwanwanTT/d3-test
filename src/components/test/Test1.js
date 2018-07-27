import React from 'react';
import './test-1.css';

class Page extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'test-1-circle-wrap'}>
        <div className={'test-1-circle'}></div>
      </div>
    );
  }
};

export default Page;
