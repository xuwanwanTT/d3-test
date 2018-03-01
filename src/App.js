import React, {Component} from 'react';
import {HashRouter, Route} from 'react-router-dom';
import './App.css';
/* tree */
import Tree from './pages/tree/tree';
/* line */
import Line from './pages/line/line';

/* 模块 */
const pages = [Tree, Line];

/* 导航名称 */
const navNames = ['tree', 'line'];

/* paths */
const paths = ['/', '/tree', '/line'];

class App extends Component {
  constructor() {
    super();
    let me = this;
    me.state = {
      active:0
    };
  }

  render() {
    let me = this;
    let active = me.state.active;
    return (
      <HashRouter ref={ref => me.hashRef = ref}>
        <div className="app">
          <div className={'header'}>
            <ul className={'nav-box'}>
              {
                navNames.map((t, i) => {
                  return (
                    <li
                      className={active === i ? 'active' : ''}
                      key={`nav-name-item-${i}`}
                      onClick={me.navClick.bind(this, i)}
                    >
                      <span>{t}</span>
                    </li>
                  )
                })
              }
            </ul>
            <div className={'user'}></div>
          </div>
          {
            paths.map((t, i) => {
              let page = pages[i];
              if (i === 0)
                return (
                  <Route key={`route-item-${i}`} exact path={t} component={page}/>
                );
              else
                return (
                  <Route key={`route-item-${i}`} path={t} component={page}/>
                )
            })
          }
        </div>
      </HashRouter>
    );
  }

  upRoute() {
    let me = this;
    let active = me.state.active;
    let path = paths[active];
    me.hashRef.history.replace(path);
  }

  componentDidMount() {
    // let href = window.location.href.split('/');
    // let len = href.length - 1;
    // let path = href[len];
    // let active = paths.indexOf('/' + path);
    // if (!active) active = 0;
    // let storage = window.sessionStorage;
    // storage.setItem('historyId', active);
    // console.log(this.hashRef.history);
    // console.log(href);
    let storage = window.sessionStorage;
    let active = Number(storage.getItem('historyId') || 0);
    this.setState({
      active
    });
  }

  componentDidUpdate() {
    this.upRoute();
  }

  navClick(index) {
    let me = this;
    let active = me.state.active;
    let flag = active === index;
    if (!flag) {
      let storage = window.sessionStorage;
      storage.setItem('historyId', index);
      me.setState({
        active: index
      })
    }
  }
}

export default App;