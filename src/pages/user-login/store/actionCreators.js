import * as constants from './constants';
import {post} from './../../../utils/request';
import {GET_WECHAT_API,WX_BINDPHONE,WX_PARENTER_LOGIN,WX_SENDMESSAGE_API,BIND_WECHAT_USERNAME} from './../../../utils/servicekey';


export const wxLogin = (params) =>{
    return async () => {
        const result = await post(WX_PARENTER_LOGIN,params);
        return result;
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

export const getOauthInfo = (params) =>{
    return async () => {
        const result = await post(GET_WECHAT_API,params);
        return result;
    }
}