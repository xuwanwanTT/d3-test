import React, { Component } from 'react';
import * as api from "../../api/test"

class Introduce extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    api.test.send({
      name: "xxx",
      test: "ooo"
    }).then(res => {
      console.log(res);
    })
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
