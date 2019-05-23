import React,{Fragment,useEffect,useState} from 'react';
import _ from 'lodash';
import {getUrlParam} from './../../../utils/common';
import './index.scss';

const Oauth = () =>{
    const [code,setCode] = useState('') 

    const retry = () =>{
        console.log('retry');
    }

    const init = () => {
        if((!_.isEmpty(code))){
            console.log('getUrlParam',getUrlParam('code'));
        }
        else
        {
            let wechat = 'wxd78e408c5668f65f',
                redirectUrl ='http://art.laoliwuyou.com';
            const oauthUri = {
                wechat: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wechat}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=vueapp#wechat_redirect`
            };
            window.top.location.href = oauthUri.wechat;
        }
        console.log('init');
    }

    useEffect(()=>{
        setCode(getUrlParam("code"))
        init();
    });

    return (
        <Fragment>
             正在加载 ...
        </Fragment>
    )
}

export default Oauth;