import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { mapStateToProps } from '@u';
import { openService } from 'public/regMessageTypeHandler';

import homeActions from 'store/root/home/actions';
import rootActions from 'store/root/actions';

import { ElementsWrapper } from 'components/scrollNav';
import HomeFolderDialog from 'containers/homeFolderDialog';
import WidgeList from 'containers/homeWidgetList';
import HeaderPage from './headerPage';
import HomeMark from './mark';
import { pageHome } from './style.css';

const { getWorkList, getApplicationList, clearApplicationTips } = homeActions;
const { requestStart, requestSuccess, requestError } = rootActions;

@withRouter
@connect(
  mapStateToProps(
    'workList',
    'userInfo',
    {
      namespace: 'home',
    },
  ),
  {
    requestStart,
    requestSuccess,
    requestError,
    getWorkList,
    getApplicationList,
    clearApplicationTips
  },
)
class Home extends Component {
  static propTypes = {
    requestStart: PropTypes.func,
    requestSuccess: PropTypes.func,
    requestError: PropTypes.func,
    getWorkList: PropTypes.func,
    workList: PropTypes.arrayOf(PropTypes.object),
    getApplicationList: PropTypes.func,
    userInfo: PropTypes.shape({}),
  };
  static defaultProps = {
    requestStart: () => { },
    requestSuccess: () => { },
    requestError: () => { },
    getWorkList: () => { },
    getApplicationList: () => { },
    workList: [],
    userInfo: {
      admin: false,
    },
  };
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        top: 0,
        height: 0,
      },
      lazyLoadNum: -1,
      homemark: false,
      newAppNum: 0,// 判断应用开通时间在7天(含)之内
      willExpiredNum: 0,// 即将过期应用个数
      expiredNum: 0,//过期应用个数 
      applications: [],
    };
    this.updateViewport = this.updateViewport.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateViewport, false);
    window.addEventListener('resize', this.updateViewport, false);
    this.updateViewport();
    // 请求列表
    this.getWorkList();
    // 判断是否到期应用，包含多少个到期应用
    this.getApplicationList();
  }

  componentDidUpdate() {
    let total = 0;
    this.props.workList.forEach((v) => {
      total += v.children.length;
    });
    if (this.state.lazyLoadNum === total) {
      window.removeEventListener('scroll', this.updateViewport);
      window.removeEventListener('resize', this.updateViewport);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateViewport);
    window.removeEventListener('resize', this.updateViewport);
  }

  getWorkList = () => {
    const {
      requestStart, requestSuccess, requestError, getWorkList,
    } = this.props;
    requestStart();
    const param = {
      componentCode: 'yonyoucloud',
      viewCode: 'home',
      deviceType: 'PC',
      lang: 'US',
    };
    // 请求磁贴
    getWorkList(param).then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      requestSuccess();
    });
  }
  
  getApplicationList = () => {
    // 请求应用   判断是否有过期应用功能
    const {
      getApplicationList,
      userInfo: {
        admin,
      },
    } = this.props;
    const timeType = this.totalTime();
    if (admin && timeType) {
      const time = new Date().format("yyyy-MM-dd");
      localStorage.setItem('time', time);
      getApplicationList().then(({ error, payload }) => {
        if (error) {
          requestError(payload);
          return false;
        }
        this.setState({
          applications: payload.expiTip.applications,
        });
        let { willExpiredNum, expiredNum } = this.forTime(payload.expiTip.applications)
        if (willExpiredNum || expiredNum || payload.addTip) {
          this.setState({
            homemark: true,
            newAppNum: payload.addTip || 0,
            willExpiredNum,
            expiredNum
          })
        }
        requestSuccess();
      });
    }
  }

  totalTime = () => {
    const localTime = localStorage.getItem('time');
    if (!localTime) return true;

    let day1 = new Date();
    day1.setDate(day1.getDate() - 1);
    const s1 = day1.format("yyyy-MM-dd");
    if (s1 == localTime || s1 > localTime) {
      return true;
    }
    return false;
  }

  forTime = (applications) => {
    let type = false;
    let willExpiredNum = 0;
    let expiredNum = 0;
    for (var i = 0; i < applications.length; i++) {
      const time = applications[i].expired;
      if (!time) {
        type = false;
        continue;
      }
      const currTime = new Date().getTime();
      const timeDiff = (time - currTime) / 1000 / 60 / 60 / 24;
      if (time > currTime && timeDiff <= 30) {
        type = true;
        ++willExpiredNum;
        // break;
      } else if (currTime > time) {
        type = true;
        ++expiredNum;
        // break;
      }
    };
    // return type;
    return { willExpiredNum, expiredNum };
  }

  updateViewport = () => {
    const self = this;
    // if (this.refs.home.offsetHeight <= window.pageYOffset + window.innerHeight){}
    self.setState({
      viewport: {
        top: window.pageYOffset,
        height: window.innerHeight,
      },
    });
  }

  loadOk = (() => {
    const self = this;
    let count = 0;
    return () => {
      count += 1;
      self.setState({
        lazyLoadNum: count,
      });
    };
  })()

  linkTo = () => {
    const { clearApplicationTips } = this.props;
    clearApplicationTips().then(({ error, payload }) => {
      if (error) {
        requestError(payload);
        return false;
      }
      this.closeHomeMark();
      requestSuccess();
      openService('GZTSYS010');
    });

  }

  closeHomeMark = () => {
    this.setState({
      homemark: false
    });
  }

  render() {
    const {
      workList,
    } = this.props;
    const list = [];
    const conts = [];
    workList.forEach((da, i) => {
      const {
        widgetId: id,
        widgetName: name,
      } = da;
      const props = {
        key: `nav${id}`,
        data: da,
        noTitle: !i,
      };
      list.push({
        label: name,
        target: `nav${id}`,
      });
      conts.push(<WidgeList
        {...props}
        viewport={this.state.viewport}
        loadOk={this.loadOk}
        lastIndex={i === workList.length - 1 ? true : false}
      />);
    });
    return (
      <div ref='home' className={`${pageHome} home`}>
        <HeaderPage list={list} />
        <ElementsWrapper items={list} offset={-55}>
          {conts}
        </ElementsWrapper>
        <HomeFolderDialog />
        {
          this.state.homemark ? <HomeMark
            linkTo={this.linkTo}
            homemark={this.state.homemark}
            newAppNum={this.state.newAppNum}
            willExpiredNum={this.state.willExpiredNum}
            expiredNum={this.state.expiredNum}
            closeHomeMark={this.closeHomeMark}
          /> : null
        }
      </div>
    );
  }
}
export default Home;

