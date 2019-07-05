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
import BScroll from 'better-scroll';
import 'react-bscroll/lib/react-scroll.css'
import eventProxy from 'react-eventproxy';
import { IMGURL } from '../../utils/api';

const Data = [];
for (let i = 0; i < 10; i++) {
  Data.push(i)
}
var countCurrentPage = 2;

class Home extends PureComponent{

  constructor(props){
        super(props);
        this.state = {
            selectedTab: 'greenTab',
            hidden: false,
            fullScreen: true,
            isSelected:false,
            listData: Data,
            childData: 666,
            currentPage:1,
            calcHeight:760,
            totalRecords:0
        };
        
        eventProxy.on("targetHome",(object)=>{
           this.setState({
              selectedTab:"yellowTab"
           });
        });
  }

  async loadMoreData(props){
      let storage = Storage.Base.getInstance().get("userInfo");
      let data = {
          CustomerId: storage ==null? 0: storage.CustomerId,
          Position: 1,
          CurrentPage: countCurrentPage,
          PageSize:10
      };
      let userLikes = await this.props.getUserLikeList(data);
      this.setState({
        totalRecords:userLikes.Data.TotalRecords
      });
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
            <div ref="wrapperScroll" className="container">
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
                    isPullUpTipHide={ false }>
                    {
                          this.renderFactory(pageText)
                    }
                  </Scroll>
              </div>
           )
        }
      if(pageText==="MASTER"){
      
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
          )
      }
      if(pageText==="CART"){
          return (
              <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                  {
                      this.renderFactory(pageText)
                  }
              </div>
          );
      }
  }

  async initLikeList(){
    let storage = Storage.Base.getInstance().get("userInfo");
    let data = {
      CustomerId: storage == null ? 0 : storage.CustomerId ,
      Position: 1,
      CurrentPage:1,
      PageSize:10
    };
    let userLikes = await this.props.getUserLikeList(data);
    eventProxy.trigger('recomandItem',userLikes.Data);
  }

  init(){
    Storage.Base.getInstance().set("userInfo",{"Token":1318493861476309,"Register":true,"Type":2,"CustomerId":128,"UserName":"向雄","NickName":"向雄","Phone":15618925212,"BaiChuanUserId":"","BaiChuanUserPasssword":"","IMUserSigExpire":0});
  }

  componentDidMount(){
     this.init();
     this.initLikeList();
     console.log('getUrlParam()',getUrlParam('tab'));
     this.setState({
      selectedTab:'blueTab'
   });
     if(getUrlParam('tab') === "User"){
        this.setState({
          selectedTab:'yellowTab'
       });
     }
     if(getUrlParam('tab') === "Cart"){
      this.setState({
        selectedTab:'greenTab'
      });
     }
     if(getUrlParam('tab') === "Art"){
      this.setState({
        selectedTab:'artTab'
      });
     }
     else if(getUrlParam('tab') === "Shop"){
      this.setState({
        selectedTab:'redTab'
      });
     }
     
     eventProxy.on('selectedTab',(item)=>{
        this.setState({
          selectedTab:item
       });
     });
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
            icon={{ uri: `${IMGURL}/icon/home.svg` }}
            selectedIcon={{ uri: `${IMGURL}/icon/home_active.svg` }}
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'blueTab',
              });
              history.push('/home?tab=Home');
              eventProxy.trigger("showcart",'hidden');
            }}
            data-seed="logId"
          >
            {this.renderContent('MAIN')}
          </TabBar.Item>

          <TabBar.Item
            icon={{ uri: `${IMGURL}/icon/13.svg` }}
            selectedIcon={{ uri: `${IMGURL}/icon/28.svg` }}
            title="艺商城"
            key="shop"
            selected={ this.state.selectedTab === 'redTab'}
            onPress={() => {
              console.log('this.state.selectedTab');
              this.setState({
                selectedTab: 'redTab'
              });
              history.push('/home?tab=Shop');
              eventProxy.trigger("showcart",'hidden');
            }}
            data-seed="logId1"
          >
            {this.renderContent('ARTSHOP')}
          </TabBar.Item>

           <TabBar.Item
            icon={{ uri: `${IMGURL}/icon/14.svg` }}
            selectedIcon={{ uri: `${IMGURL}/icon/29.svg` }}
            title="艺术大家"
            key="art"
            selected={this.state.selectedTab === 'artTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'artTab',
              });
              history.push('/home?tab=Art');
              eventProxy.trigger("showcart",'hidden');
            }}
            data-seed="logId1"
          >
            {this.renderContent('MASTER')}
          </TabBar.Item>

          <TabBar.Item
            icon={{ uri:`${IMGURL}/icon/15.svg` }}
            selectedIcon={{ uri:`${IMGURL}/icon/30.svg` }}
            title="购物车"
            key="cart"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'greenTab',
              });
              history.push('/home?tab=Cart');
              eventProxy.trigger("showcart",'visible');
            }}
          >
            {this.renderContent('CART')}
          </TabBar.Item>
          
          <TabBar.Item
            icon={{ uri:`${IMGURL}/icon/16.svg` }}
            selectedIcon={{ uri:`${IMGURL}/icon/29.svg` }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                  isSelected:true
                });
                history.push('/home?tab=User');
                eventProxy.trigger("showcart",'hidden');
            }}>
            {this.renderContent('USER')}
          </TabBar.Item>
        </TabBar>
      </div>
     )
   }
}

const mapStateToProps = (state) => {
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