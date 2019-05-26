import React,{PureComponent} from 'react';
import {TabBar, Toast} from 'antd-mobile';
import './index.scss';
import Main from './home/index';
import Shop from './../shop/index';
import Master from './../master/index';
import Cart from './../cart/index';
import User from './../user/index';
import {getUrlParam} from './../../utils/common';
import {connect} from 'react-redux';
import {getOauthInfo,wxLogin,getUserLikeProducts,getUserLikeList} from './store/actionCreators';
import './../../utils/storage';
import _ from 'lodash';
import history from './../../utils/history';
import Scroll from 'react-bscroll'
import 'react-bscroll/lib/react-scroll.css'
import eventProxy from 'react-eventproxy';
const Data = [];
let NEWDATAINDEX = 1
for (let i = 0; i < 10; i++) {
  Data.push(i)
}
var countCurrentPage = 2;

class Home extends PureComponent{

  constructor(props){
        super(props);
        this.state = {
            selectedTab: 'blueTab',
            hidden: false,
            fullScreen: true,
            isSelected:false,
            listData: Data,
            childData: 666,
            currentPage:1
        };

        eventProxy.on("targetHome",(object)=>{
          console.log('objecteeee',object);
           this.setState({
              selectedTab:"yellowTab"
           });
          //  this.forceUpdate();
        });
  }

  async loadMoreData(props) {
    let storage = Storage.Base.getInstance().get("userInfo");
    let data = {
        CustomerId: storage.CustomerId ==null? 0: storage.CustomerId,
        Position: 1,
        CurrentPage: countCurrentPage,
        PageSize:2
    };
    let userLikes = await this.props.getUserLikeList(data);
    eventProxy.trigger('recomandItem',userLikes.Data);
    countCurrentPage ++;
  }

  renderFactory(pageText){
       switch(pageText){
          case "MAIN":
            return (<Main likeProducts={this.props.userLikeProducts}/>);
          case "ARTSHOP":
            return (<Shop/>);
          case "MASTER":
            return (<Master/>);     
          case "CART":
            return (<Cart/>);     
          case "USER":
            return (<User/>);     
         default:
            return (<Main/>);
       }
  }

  renderContent(pageText){
        console.log('this.props',this.props.getUserLikeList);

        if(pageText==="USER"){
          return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                  {
                         this.renderFactory(pageText)
                  }
            </div>
          );
        }

        if(pageText==="MAIN"){
          return (
            <div className="container">
              <Scroll
              click={true}
              pullUpLoad
              pullUpLoadMoreData={this.loadMoreData.bind(this,this.props.getUserLikeList)}
              isPullUpTipHide={ false }>
              {
                      this.renderFactory(pageText)
              }
              </Scroll>
            </div>
          );
        }

        if(pageText==="ARTSHOP"){
           return (
              <div className="container">
                <Scroll
                  click={true}
                  pullUpLoad
                  pullUpLoadMoreData={this.loadMoreData.bind(this,this.props.getUserLikeList)}
                  isPullUpTipHide={ false }
                >
                        {
                              this.renderFactory(pageText)
                        }
                </Scroll>
              </div>
           )
        }
  }

  async initLikeList(){
    let storage = Storage.Base.getInstance().get("userInfo");
    let data = {
      CustomerId: storage.CustomerId == null ? 0 : storage.CustomerId ,
      Position: 1,
      CurrentPage:1,
      PageSize:10
    };
    let userLikes = await this.props.getUserLikeList(data);
    eventProxy.trigger('recomandItem',userLikes.Data);
    console.log('userLikes',userLikes.Data.DataList);
  }

  componentDidMount(){
     this.initLogin();
     this.initLikeList();
     this.setState({
      selectedTab:getUrlParam('tab')=== "User" ? 'yellowTab':'blueTab'
    });
  }

  async initLogin(){
    let storage = Storage.Base.getInstance();
    storage.set("code",getUrlParam('code'));
    // storage.set("oauthInfo",{
    //   "OpenId":'232432'
    // });
    // storage.set("userInfo",{
    //   "Token": 2390648179516024,
    //   "Register": true,
    //   "Type": 2,
    //   "CustomerId": 11,
    //   "UserName": "156****5212",
    //   "NickName": "156****5212",
    //   "Phone": 15618925212,
    //   "BaiChuanUserId": "",
    //   "BaiChuanUserPasssword": "",
    //   "IMUserSigExpire": 0
    // });
    if(storage.get("code") === ""){
        history.push('/oauth');
    }
    else{
      const result = await this.props.getAuthInfo({code:storage.get("code")});
      console.log('oauthInfo',result);
      storage.set("oauthInfo",result.Data);
      console.log('oauthInfo',result.Data);
      console.log('storage.get("code")',storage.get("code"));
      var openId = result.Data.OpenId;

      if(!_.isEmpty(openId)){
          const userInfo  = await this.props.handleWxLogin({Type:'2',OpenId:openId});
          storage.set("userInfo",userInfo.Data);
          console.log('userInfo.Data',userInfo.Data);
          if(!userInfo.Data.Register){
              history.push('/bind');
              console.log('去绑定手机');
          }else{
              console.log('登录成功');
          }
      }
    }
  }

  render(){
     return (
      <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#888888"
          tintColor="#E87908"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom">
          <TabBar.Item
            title="首页"
            key="Home"
            icon={{ uri: 'http://art.laoliwuyou.com/icon/home.svg' }}
            selectedIcon={{ uri: 'http://art.laoliwuyou.com/icon/home_active.svg' }}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
            data-seed="logId"
          >
            {this.renderContent('MAIN')}
          </TabBar.Item>

          <TabBar.Item
            icon={{ uri: 'http://res.laoliwuyou.com/icon/svg/13.svg' }}
            selectedIcon={{ uri: 'http://art.laoliwuyou.com/icon/28.svg' }}
            title="艺商城"
            key="shop"
            selected={ this.state.selectedTab === 'redTab'}
            onPress={() => {
              console.log('this.state.selectedTab');
              this.setState({
                selectedTab: 'redTab'
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('ARTSHOP')}
          </TabBar.Item>
          
          {/* <TabBar.Item
            icon={{ uri: 'http://res.laoliwuyou.com/icon/svg/14.svg' }}
            selectedIcon={{ uri: 'http://res.laoliwuyou.com/icon/svg/29.svg' }}
            title="艺术大家"
            key="art"
            selected={this.state.selectedTab === 'artTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'artTab',
              });
            }}
            data-seed="logId1"
          >
            {this.renderContent('MASTER')}
          </TabBar.Item>

          <TabBar.Item
            icon={{ uri:'http://res.laoliwuyou.com/icon/svg/15.svg' }}
            selectedIcon={{ uri:'http://res.laoliwuyou.com/icon/svg/15.svg' }}
            title="购物车"
            key="cart"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
            {this.renderContent('CART')}
          </TabBar.Item> */}

          <TabBar.Item
            icon={{ uri:'http://res.laoliwuyou.com/icon/svg/16.svg' }}
            selectedIcon={{ uri:'http://art.laoliwuyou.com/icon/29.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                  isSelected:true
                });
            }}>
            {this.renderContent('USER')}
          </TabBar.Item>
        </TabBar>
      </div>
     )
   }
}

const mapStateToProps = (state) => {
  console.log('state',state);
  return {
     authInfo:state.home.authInfo,
     userLikeProducts: state.home.userLikeProducts,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthInfo:(params)=>{
      return dispatch(getOauthInfo(params))
    },
    handleWxLogin:(params)=>{
      return dispatch(wxLogin(params))
    },
    getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) => {
      return  dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    },
    getUserLikeList: (data) => {
      return  dispatch(getUserLikeList(data))
    }
 }
};

export default connect(mapStateToProps,mapDispatchToProps)(Home);