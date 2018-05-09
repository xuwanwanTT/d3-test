import React from 'react';

/**
 * List 列表容器
 * column 排列
*/

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  createList(node) {
    let me = this;
    let list = [];
    for (let i = 0; i < node.length; i++) {
      list.push(<li key={i} style={{
        width: me.props.widthList ? me.props.widthList[i] : ''
      }}>{node[i]}</li>);
    }
    return list;
  }

  render() {
    let me = this;
    let doms = me.props.children;
    return (
      <ul style={{
        width: me.props.width,
        position: 'absolute',
        top: me.props.top,
        left: me.props.left,
        display: 'flex',
        flexDirection: 'column',
        color: '#fff',
        fontSize: 14
      }}>
        {me.createList(doms)}
      </ul>
    );
  }
};

export default Page;
