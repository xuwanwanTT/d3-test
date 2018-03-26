import React, { Component } from 'react';
import * as api from "../../api/test"

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

  _clearTokens() {
    console.log(this._tokens[0])
    // this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  };

  componentWillUnmount() {
    this._clearTokens();
  }

  render() {
    return (
      <div>
        <h1>Hello world !</h1>
      </div >
    );
  }
};

export default Introduce;
