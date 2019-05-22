import * as constants from './constants';
import {post} from './../../../utils/request';
import {GET_WECHAT_API} from './../../../utils/servicekey';

const weixinLogin = (params) => ({
    type:constants.WEIXIN_LOGIN,
    value: params
})

export const wxLogin = (params) => {
    return (dispatch) => {
        return post(GET_WECHAT_API,params).then((response)=>{
            console.log('response',response);
            dispatch(weixinLogin(response));
        })
    }
}