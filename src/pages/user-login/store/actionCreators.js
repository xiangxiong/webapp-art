import * as constants from './constants';
import {post} from './../../../utils/request';
import {GET_WECHAT_API,WX_BINDPHONE,WX_SENDMESSAGE_API} from './../../../utils/servicekey';

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
