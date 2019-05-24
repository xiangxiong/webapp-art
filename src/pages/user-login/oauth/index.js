import React,{Fragment,useEffect,useState} from 'react';
import _ from 'lodash';
import {getUrlParam} from './../../../utils/common';
import './index.scss';

const Oauth = () =>{

    const [code] = useState('') 
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
            let storage = Storage.Base.getInstance();
            storage.set('oauthLogin',"oauthLogin")
            window.top.location.href = oauthUri.wechat;
        }
    }

    useEffect(()=>{
        init();
    });

    return (
        <Fragment>

        </Fragment>
    )

}

export default Oauth;