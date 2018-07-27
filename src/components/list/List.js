import React from 'react';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'apple', value: '100', date: '07-04', price: '5元' },
        { name: 'banana', value: '100', date: '07-04', price: '5元' },
        { name: 'orange', value: '100', date: '07-04', price: '5元' },
        { name: 'grape', value: '100', date: '07-04', price: '5元' },
        { name: 'pear', value: '100', date: '07-04', price: '5元' },
      ]
    };
  }

  createList() {

  }

  render() {
    const me = this;
    return (
      <div>{me.createList()}</div>
    );
  }
};

export default Page;
