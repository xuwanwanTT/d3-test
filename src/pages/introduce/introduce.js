import React, { Component } from 'react';
import * as api from "../../api/test"
import Dialog from '../../components/common/dialog/Dialog';

class Introduce extends Component {
  constructor() {
    super();
    this._tokens = [];
  }

  componentDidMount() {
    let me = this;
    me._tokens.push(api.test.send({
      name: "xxx",
      test: "ooo"
    }).then(res => {
      console.log(res);
    }));
  }

  ajax() {
    var xhr = new XMLHttpRequest()
    xhr.open('get', '', true)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(JSON.parse(xhr.responseText))
      }
    }
  }

  _clearTokens() {
    console.log(this._tokens[0])
    // this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }

  componentWillUnmount() {
    this._clearTokens();
  }

  show() {
    this.refs.dialogRef.open();
  }

  render() {
    let me = this;
    return (
      <div>
        <h1 onClick={this.show.bind(this)}>Hello world !</h1>
        <Dialog width={1200} height={800} title={'这是标题'} ref={'dialogRef'}>
        <h1>hello world</h1>
        </Dialog>
      </div >
    );
  }
};

export default Introduce;
