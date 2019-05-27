import React,{Fragment} from 'react';
import _ from 'lodash';
import {getUrlParam} from './../../../utils/common';
import './index.scss';
import {PRODUCTURL} from './../../../utils/api';
import {connect} from 'react-redux';
import {getOauthInfo,wxLogin} from './../store/actionCreators';
import history from './../../../utils/history';
import { Toast } from 'antd-mobile';

class Oauth extends React.Component{
    constructor(props){
        super(props);
        this.init();
    }

    init = () => {
        if((!_.isEmpty(getUrlParam('code')))){
            console.log('getUrlParam',getUrlParam('code'));
            this.initLogin(getUrlParam('code'));
        }
        else
        {
            let wechat = 'wxd78e408c5668f65f',
                redirectUrl =`${PRODUCTURL}/oauth`;
            const oauthUri = {
                wechat: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechat}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=vueapp#wechat_redirect`
            };
            window.top.location.href = oauthUri.wechat;
        }
    }

    async initLogin(code){
          let storage = Storage.Base.getInstance();
          storage.set("code",code);
          const result = await this.props.getAuthInfo({code:code});
          storage.set("oauthInfo",result.Data);

          var openId = result.Data.OpenId;

          if(!_.isEmpty(openId)){
              const userInfo  = await this.props.handleWxLogin({Type:'2',OpenId:openId});
              storage.set("userInfo",userInfo.Data);
              if(userInfo && !userInfo.Data.Register){
                  history.push('/bind');
                  console.log('去绑定手机');
              }else{
                  console.log('登录成功');
                  window.location.href = `${PRODUCTURL}`;
              }
          }
    }
    render(){
        return (
            <Fragment>
                
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('state',state);
    return {
       authInfo:state.home.authInfo
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      getAuthInfo:(params)=>{
        return dispatch(getOauthInfo(params))
      },
      handleWxLogin:(params)=>{
        return dispatch(wxLogin(params))
      }
   }
  };
  
export default connect(mapStateToProps,mapDispatchToProps)(Oauth);

// const Oauth = () =>{
//  class Oauth extends React.Component{

//     constructor(props){
//         super(props);
//         this.init();
//     }

//     init = () => {
//         if((!_.isEmpty(code))){
//             console.log('getUrlParam',getUrlParam('code'));
            
//         }
//         else
//         {
//             let wechat = 'wxd78e408c5668f65f',
//                 redirectUrl ='http://art.laoliwuyou.com/oauth';
//             const oauthUri = {
//                 wechat: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechat}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=vueapp#wechat_redirect`
//             };
//             let storage = Storage.Base.getInstance();
//             storage.set('oauthLogin',"oauthLogin")
//             window.top.location.href = oauthUri.wechat;
//         }
//     }

//     render(){

//     }

// }

// export default Oauth
