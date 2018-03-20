import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './App.css';

/* introduce */
import Introduce from './pages/introduce/introduce';
/* tree */
import Tree from './pages/tree/tree';
/* line */
import Line from './pages/line/line';
/* bar */
import Bar from './pages/bar/bar';
/* pie */
import Pie from './pages/pie/pie';
/* svg图形 */
import Svg from './pages/svgfirst/svgfirst';

/* 模块 */
const pages = [Introduce, Tree, Line, Bar, Pie, Svg];

/* 导航名称 */
const navNames = ["introduce", "tree", "line", "bar", "pie", "svg"];

/* paths */
const paths = ["/", "/tree", "/line", "/bar", "/pie", "/svg"];

class App extends Component {
  constructor() {
    super();
    let me = this;
    me.state = {
      active: 0
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
                  <Route key={`route-item-${i}`} exact path={t} component={page} />
                );
              else
                return (
                  <Route key={`route-item-${i}`} path={t} component={page} />
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
