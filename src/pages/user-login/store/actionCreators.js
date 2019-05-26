import * as constants from './constants';
import {post} from './../../../utils/request';
import {GET_WECHAT_API,WX_BINDPHONE,WX_SENDMESSAGE_API,BIND_WECHAT_USERNAME} from './../../../utils/servicekey';

const weixinLogin = (params) => ({
    type:constants.WEIXIN_LOGIN,
    value: params
})

const bindPhoneAction = (data) => ({
    type:constants.LOGIN_PHONE_LOGIN,
    value:data
});

export const wxLogin = (params) => {
    return (dispatch) => {
        return post(GET_WECHAT_API,params).then((response)=>{
            dispatch(weixinLogin(response));
        });
    }
}

export const sendMessageActionResult = (params) => {
    return async (dispatch) => {
        const result = await post(WX_SENDMESSAGE_API,params);
        return result;
    }
}

export const bindPhoneActionResult = (params) => {
    return async (dispatch) => {
        const result = await post(WX_BINDPHONE,params);
        return result;
    }
}

// 绑定微信用户信息
export const bindWeChatOauth = (params) =>{
    return async (dispatch) =>{
        const result = await post(BIND_WECHAT_USERNAME,params);
        return result.Data.DataList;
    }
}