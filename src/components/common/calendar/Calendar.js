import React from 'react';
import { Common } from '../common';
import './calendar.css';

/**
 * 日历组件
 * xf
 * 方法：
 * <Calendar style={} defaultDate={'yyyy-mm-dd'} getRes={this.getDate.bind(this)} />
 * defaulte 设置默认显示时间,必填
 * getRes 获取选择的时间
*/

class Select extends React.Component {
  isRealUpdate = false;

  constructor(props) {
    super(props);
    let me = this;
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    me._id = Common.randomID(12);

    me.nowYear = year;
    me.state = {
      show: false,
      showDate: me.props.defaultDate || [year, '-', month].join(''),
      defaultYear: undefined,
      monthActive: undefined
    };

    me._eventFunction = me._addEventListener.bind(me);
  }

  _addEventListener(e) {
    let me = this;
    me.isRealUpdate = true;
    let flag = Common.hasClass(e.target, me._id) ||
      Common.hasClass(e.target.parentNode, me._id) ||
      Common.hasClass(e.target, 'time-select-year-prev') ||
      Common.hasClass(e.target, 'time-select-year-content') ||
      Common.hasClass(e.target, 'time-select-year-next') ||
      Common.hasClass(e.target, 'active') ||
      Common.hasClass(e.target, 'time-select-text-month') ||
      Common.hasClass(e.target, 'time-select-text-day') ||
      Common.hasClass(e.target, 'time-select-box') ||
      Common.hasClass(e.target, 'time-select-scroll-wrap') ||
      Common.hasClass(e.target, 'time-select-textday');

    if (!flag) {
      me.setState({
        show: false,
      })
    }
  }

  _setShowDate(d) {
    this.setState({
      showDate: d
    })
  }

  render() {
    let me = this;
    let props = me.props;
    return (
      <div className={'hubei-select'} style={props.style}>
        <div
          className={`hubei-select-changed ${me._id}`}
          style={{
            lineHeight: props.style.height + 'px'
          }}
          onClick={me.selectChangedClick.bind(this)}
        >
          {
            me.state.showDate
          }
          <span className={me.state.show ? 'select-changed-up' : 'select-changed-down'}></span>
        </div>
        {
          me.createSelectDom()
        }
      </div>
    )
  }

  /* 显示隐藏下拉内容 */
  selectChangedClick() {
    let flag = !this.state.show;
    this.setState({
      show: flag,
    });
  }

  /* 上一年 */
  yearPrev() {
    let me = this;
    let defaultYear = --me.state.defaultYear;
    // let monthActive = undefined;
    me.setState({
      defaultYear,
      // monthActive
    })
  }

  /* 下一年 */
  yearNext() {
    let me = this;
    let nowYear = me.nowYear;
    let defaultYear = ++me.state.defaultYear;
    if (defaultYear > nowYear) {
      defaultYear = nowYear;
    }
    // let monthActive = undefined;
    me.setState({
      defaultYear,
      // monthActive
    })
  }

  /*
  * 处理props的日期
  * 返回 {defaultYear, monthActive}
  * */
  handleDate(n) {
    let me = this;
    let state = me.state;
    let defaultDate = me.props.defaultDate;
    let dates = defaultDate.split('-');

    let defaultYear = state.defaultYear;
    let monthActive = state.monthActive;
    let dayActive = state.dayActive;

    if (!defaultYear) {
      defaultYear = dates[0] || me.nowYear;
    }
    if (!monthActive) {
      monthActive = Number(dates[1]);
    }
    if (!dayActive && dayActive !== 0) {
      dayActive = Number(dates[2]);
    }

    let res = {
      defaultYear,
      monthActive,
      dayActive
    };

    Object.assign(state, res);

    return res;
  }

  /*
  * 生成下拉内容
  * */
  createSelectDom() {
    let me = this;
    let height = me.props.style.width;

    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let dayNow = time.getDate();
    let day = new Date(year, month, 0).getDate();
    if (!me.state.day) {
      me.state.day = day;
    }

    if (day * 24 > height) {
      me.isScrollD = true;
    }
    if (12 * 24 > height) {
      me.isScrollM = true;
    }

    let items = me.createArr(12);
    let date = me.handleDate();
    return (
      <div className={`time-select-box ${me.state.show ? 'time-select-box-show' : 'time-select-box-hide'}`} style={{
        zIndex: me.props.style.zIndex,
        height: me.props.style.width,
        width: '100%'
      }} >
        <div className={'time-select-year'}>
          <span className={'time-select-year-prev'} onClick={me.yearPrev.bind(this)}></span>
          <span className={'time-select-year-content'}>{date.defaultYear}</span>
          <span className={'time-select-year-next'} onClick={me.yearNext.bind(this)}></span>
        </div>
        <p className={'time-select-text-month'}>月</p>
        <p className={'time-select-text-day'}>日</p>
        <div className={'time-select-scroll-wrap'} >
          <div className={'time-select-scroll'} style={{
            width: me.isScrollM ? '100%' : 'calc(100% - 17px)',
            marginLeft: me.isScrollM ? 17 : 0
          }} ref={'setMonthScrollRef'}>
            <ul className={'time-select-month'} >
              {me.createMonth(month)}
            </ul>
          </div>
        </div>
        <div className={'time-select-scroll-wrap'} style={{
          left: '75%',
        }}>
          <div className={'time-select-scroll'} style={{
            width: me.isScrollD ? '100%' : 'calc(100% - 17px)',
            marginLeft: me.isScrollD ? 17 : 0
          }} ref={'setDayScrollRef'}>
            <ul className={'time-select-day'} >
              {me.createDay(me.state.day)}
            </ul>
          </div>
        </div>
      </div >
    )
  }

  getDay(year, month) {
    let me = this;
    let day = new Date(year, month, 0).getDate();
    return day;
  }

  createMonth(month) {
    let me = this;
    let list = me.createArr(12);
    return list.map((s, i) => {
      return <li className={me.state.monthActive == i + 1 ? 'active' : ''} onClick={me.selectMonth.bind(this, i + 1)}>{i + 1}</li>
    });
  }

  createDay(day) {
    let me = this;
    me.day = day;
    let list = me.createArr(day);
    return list.map((s, i) => {
      return <li className={me.state.dayActive == i + 1 ? 'active' : ''} onClick={me.selectDay.bind(this, i + 1, day)}>{i + 1}</li>
    });
  }

  selectMonth(index) {
    let me = this;
    me.state.monthActive = index;
    let day = me.getDay(me.state.defaultYear, index);
    me.setMonthScroll();
    me.setState({
      monthActive: index,
      dayActive: 0,
      day
    });
  }

  selectDay(index, day) {
    let me = this;
    me.state.dayActive = index;
    me.setDayScroll(day);

    let showDate = [
      me.state.defaultYear,
      '-',
      me.state.monthActive < 10 ? '0' + me.state.monthActive : me.state.monthActive,
      '-',
      index < 10 ? '0' + index : index
    ].join('');

    me.setState({
      showDate,
      show: false
    })

    let getRes = me.props.getRes;
    if (getRes && typeof getRes == 'function') {
      getRes(showDate);
    }
  }

  setMonthScroll() {
    let me = this;
    let index = me.state.monthActive;
    if (index < 3) { index = 0 }
    let height = (index - 3) * 24 + 4;
    me.refs.setMonthScrollRef.scrollTop = height;
  }

  setDayScroll(day) {
    let me = this;
    let index = me.state.dayActive;
    if (index < 3) { index = 0 }
    let height = (index - 3) * 24 + 4;
    me.refs.setDayScrollRef.scrollTop = height;
  }

  /*
  * 生成指定个数的数组
  * 数组可以被map、forEach
  *  */
  createArr(n) {
    let arr = new Array(n);
    for (let i = 0; i < n; i++) {
      arr[i] = '';
    }
    return arr;
  }

  componentDidMount() {
    let me = this;
    me.setMonthScroll();
    me.setDayScroll(me.day);
  }

  componentDidUpdate() {
    let me = this;
    let flag = me.state.show;
    if (!flag) {
      window.removeEventListener('click', me._eventFunction, false);
    } else {
      window.addEventListener('click', me._eventFunction, false);
    }
    me.setMonthScroll();
    me.setDayScroll(me.day);
  }

  componentWillUnmount() {
    let me = this;
    me.setState({
      show: false,
      show2: false
    });
    window.removeEventListener('click', me._eventFunction, false);
  }
}

export default Select;
