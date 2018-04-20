import React from 'react';
import './dialog.css';
import btn from './image/btn.png';
import title from './image/title-bg.png';
import bgt from './image/dialog-bgt.png';
import bgb from './image/dialog-bgb.png';

/*
*
* author  xf
*
* name  模态窗口封装
*
* usemethod：
*
* import Dialog 后
*
* <Dialog title={"标题内容"} width={"800"} height={"600"} ref='回调函数名称'></Dialog>
*
* 回调函数里调用open()
*
* */

class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'none'
    };
  }

  open() {
    this.setState({
      display: 'block'
    });
  }

  close() {
    this.setState({
      display: 'none'
    });
  }

  render() {
    let me = this;
    return (
      <div style={{
        width: 1920,
        height: 991,
        position: 'absolute',
        top: 0,
        zIndex: 233,
        background: 'rgba(0,0,0,0.5)',
        display: me.state.display
      }}>
        <div style={{
          width: me.props.width,
          height: me.props.height,
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%,-50%)',
          borderRight: '1px solid rgba(1,208,213,.8)',
          backgroundImage: `url(${bgt})`,
          backgroundSize: `100% calc(100% - 25px)`
        }} className={'dialog-common-wrap'}>
          <div className={'dialog-commom-borderl'}></div>
          <div className={'dialog-commom-borderb'}></div>
          <div className={'dialog-commom-bordert'}></div>
          <h1 style={{
            color: '#fff',
            fontSize: '20px',
            fontWeight: 900,
            width: '100%',
            height: '50px',
            lineHeight: '50px',
            position: 'absolute',
            fontWeight: 600,
            textAlign: 'center',
            backgroundImage: `url(${title})`,
            backgroundSize: '100% 100%'
          }}>{me.props.title}</h1>
          <span className={'dialog-close-btn'} onClick={this.close.bind(this)} style={{
            width: '30px',
            height: '30px',
            position: 'absolute',
            right: 10,
            top: 10,
            cursor: 'pointer',
            background: `url(${btn}) center center no-repeat`
          }}></span>
          <div style={{
            width: '100%',
            height: 'calc(100% - 50px)',
            marginTop: 50
          }}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
};

export default Dialog;
