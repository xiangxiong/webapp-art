import {post} from './../../../utils/request';
import * as serverKey from './../../../utils/servicekey';
import * as constants from './constants';

export const dispatchGroupList = (params) =>{
    return async (dispatch) =>{
        const result = await post(serverKey.ART_COMMUNITY_GROUP_API,params);
        return result;
    }
}

export const dispatchGroupDetail = (params) => {
    return async (dispatch) =>{
        const result = await post(serverKey.ART_COMMUNITY_GROUP_DETAIL_API,params);
        return result;
    }
}

export const dispatchGoodsDetail = (params) => {
    return async (dispatch) => {
        console.log('params',params);
        const result = await post(serverKey.WorthGoodsDetail, params);
        return result;
    }
};