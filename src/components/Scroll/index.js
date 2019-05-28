import React from 'react';
import ReactDOM from 'react-dom';
import {PropTypes} from 'prop-types'
import styles from './index.scss';
import BScroll from 'better-scroll';

class Scroll extends React.Component{
  constructor (props){
    super(props);
  }
  static defaultProps = {
    click: true, //页面是否可以点击,
    tap: true,
    refresh: false, // 刷新Scroll
    onScroll: null, // scroll 回调事件,
    scrollTo: null, // 滚动到固定位置
    initScrollTop:null, //滚动到固定位置之后，回调重置scrollTop
    pullingDown: null, // 下拉刷新 回调
    pullingUp: null, // 上拉加载 回调函数
    scrollToEle: null,
  }
  componentDidUpdate(){
    if(this.bScroll && this.props.refresh === true){
      this.bScroll.refresh()
    }
    if(this.bScroll && this.props.scrollTo === 0 && this.bScroll.y !== 0){
      this.bScroll.scrollTo(0,this.props.scrollTo)
      this.props.initScrollTop()
    }
    if(this.bScroll && this.props.scrollToEle){
      this.bScroll.scrollToElement(this.props.scrollToEle,200)
      this.props.initScrollTop()
    }
  }
  componentDidMount(){
    this.scrollView = ReactDOM.findDOMNode(this.refs.scrollView);
    if(!this.bScroll){
      console.log(this.props.pullDownRefresh,this.props.pullUpLoad);
      this.bScroll = new BScroll(this.scrollView,{
        probeType:3,
        click: this.props.click ? this.iScrollClick(): false,
        taps: this.props.tap
      })
      // 滑动时间
      if(this.props.onScroll){
        this.bScroll.on("scroll", (scroll) => {
          this.props.onScroll(scroll)
        })
      }
      // 下拉刷新
      if(this.props.pullingDown){
        this.bScroll.on("touchEnd", (pos) => {
          if(pos.y > 200){
            this.props.pullingDown()
          }
        })
      }
      // 上拉加载
      if(this.props.pullingUp){
        this.bScroll.on("scrollEnd", () => {
          if(this.bScroll.y <= (this.bScroll.maxScrollY + 50)){
            this.props.pullingUp()
          }
        })
      }
    }
  }
  /**
   * 解决ios上需要点击两次才能触发点击事件
   *  */
  iScrollClick(){
    if (/iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)) return false;
    if (/Chrome/i.test(navigator.userAgent)) return (/Android/i.test(navigator.userAgent));
    if (/Silk/i.test(navigator.userAgent)) return false;
    if (/Android/i.test(navigator.userAgent)) {
       var s=navigator.userAgent.substr(navigator.userAgent.indexOf('Android')+8,3);
       return parseFloat(s[0]+s[3]) < 44 ? false : true
    }
  }
  componentWillUnmount(){
    this.bScroll.off('scroll');
    this.bScroll = null;
  }
  // 捕获错误
  componentDidCatch(error,info){
    console.log(`componentDidCatch:${error}+${info}`);
  }
  render(){
    return (
      <div className={styles.scrollView} ref="scrollView">
        {this.props.children}
      </div>
    )
  }
}
Scroll.propTypes = {
  click: PropTypes.bool,
  refresh: PropTypes.bool,
  pullingDown:PropTypes.func,
  initScrollTop:PropTypes.func,
  pullingUp:PropTypes.func,
  onScroll: PropTypes.func
}
export default Scroll;