import React from 'react';
import './textBox.css';

/*
*
* author  xf
*
* name  文字和文字框
*
* usemethod：
*
* import TextBox 后
*
* <TextBox title={"文本"} width={"800"} height={"600"} ref='回调函数名称' />
*
* 回调函数里调用getText()可以得到文本框里面的内容
*
* width 宽度为文字和框总宽度
* 设置height为大框，默认单行不用设置height
*
* */

class TextBox extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  getText() {
    let me = this;
    let dist = {};
    dist[me.props.title] = me.refs.inputRef.value;
    return dist;
  }

  render() {
    let me = this;
    return (
      <div className={'text-input-box'} style={{
        width: me.props.width,
        height: 40,
        lineHeight: '40px'
      }}>
        <h1 style={{ fontSize: 14, minWidth: 100 }}>{me.props.title}</h1>
        <textarea style={{
          height: me.props.height || 32,
          width: me.props.width,
          background: me.props.type ? 'rgba(1,252,252,.1)' : 'transparent'
        }} />
      </div>
    )
  }
};

export default TextBox;
