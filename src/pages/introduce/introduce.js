import React, { Component } from 'react';
import * as api from "../../api/test"
import Dialog from '../../components/common/dialog/Dialog';
import TextBox from '../../components/common/textBox/TextBox';
import ListRow from '../../components/common/list/ListRow';
import ListColumn from '../../components/common/list/ListColumn';
import Time from 'rc-calendar';
import Calendar from '../../components/common/calendar/Calendar';

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
        {/* <TextBox title={"hahahaha"} type={1} width={1300} height={400} ref={'textBoxRef'} /> */}

        <ListColumn width={300} top={200} left={20}>
          {[['aa', 'bb', 'cc'], ['dd', 'ee', 'ff'], ['gg', 'hh', 'ii']].map((s, i) => {
            return <ListRow key={i}>
              {s.map((s, i) => {
                return <div key={i}>{s}</div>
              })}
            </ListRow>
          })}
        </ListColumn>

        <Time style={{
          position: 'absolute',
          top: 100,
          left: 100,
          backgroundColor: 'red'
        }} />

        <Calendar style={{
          width: 160,
          height: 35,
          left: 200,
          top: 500,
          zIndex: me.props.zIndex
        }}
          defaultDate={'2018-06-24'} />
      </div >
    );
  }
};

export default Introduce;
