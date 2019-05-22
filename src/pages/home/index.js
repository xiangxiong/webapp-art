import React,{PureComponent} from 'react';
import {TabBar} from 'antd-mobile';
import './index.scss';
import Main from './home/index';
import Shop from './../shop/index';
import Master from './../master/index';
import Cart from './../cart/index';
import User from './../user/index';
import {getUrlParam} from './../../utils/common';
import {connect} from 'react-redux';
import {getWxLoginInfo} from './store/actionCreators';

class Home extends PureComponent{
   constructor(props){
        super(props);
        this.state = {
            selectedTab: 'yellowTab',
            hidden: false,
            fullScreen: true,
        };
   }
   
   renderFactory(pageText){
       switch(pageText){
          case "MAIN":
            return (<Main/>);
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
        return (
            <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
                {
                    this.renderFactory(pageText)
                }
            </div>
        );
  }

  componentDidMount(){
     console.log('getUrlParam',getUrlParam('code'));
     this.props.getAuthInfo(getUrlParam('code'));
  }

  render(){
       return (
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#888888"
          tintColor="#E87908"
          barTintColor="white"
          hidden={this.state.hidden}
          tabBarPosition="bottom"
        >
          <TabBar.Item
            title="首页"
            key="Home"
            icon={{ uri: 'http://res.laoliwuyou.com/icon/svg/Page 1.svg' }}
            selectedIcon={{ uri: 'http://res.laoliwuyou.com/icon/svg/Page 1.svg' }}
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
            selectedIcon={{ uri: 'http://res.laoliwuyou.com/icon/svg/28.svg' }}
            title="艺商城"
            key="shop"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'redTab',
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
            selectedIcon={{ uri:'http://res.laoliwuyou.com/icon/svg/16.svg' }}
            title="我的"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
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
  console.log('authInfo',state.home.authInfo);
  return {
     authInfo:state.home.authInfo
  }
}

const mapDispatchToProps = dispatch => ({
   getAuthInfo:(code)=>{
     dispatch(getWxLoginInfo({code:code}))
   }
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);
