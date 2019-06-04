import * as constants from './constants';
import * as service from "../../../utils/servicekey";
import {post} from "../../../utils/request";

export const actionCommunityList = (list) => ({
    type: constants.COMMUNITY_LIST,
    value:list
})

export const dispatchCommunityList = (params) =>{
    return async (dispatch) => {
        const result = await post(service.ART_COMMUNITY_LIST_API,params);
        console.log('result.Data',result.Data);
        dispatch(actionCommunityList(result.Data));
        return result;
    }
}

export const actionCommunityDetail = (list) => ({
    type:constants.COMMUNITY_DETAIL,
    value:list
})

export const dispatchCommunityDetail = (params) => {
    return async (dispatch) =>{
        const result = await post(service.ART_COMMUNITY_DETAIL_API,params);
        dispatch(actionCommunityDetail(result.Data));
        return result;
    }
}

export const actionCommunityComment = (value) =>({
    type:constants.COMMUNITY_PUBLISH,
    value:value
})

export const dispatchCommunityComment = (params) => {
    return async (dispatch) =>{
        const result = await post(service.ART_COMMUNITY_PUBLISH_API,params);
        return result; 
    }
}

export const dispatchCommunityCollectIn = (params) => {
    return async (dispatch) =>{
        const result = await post(service.ART_COMMUNITY_COLLECTIN_API,params);
        return result; 
    }
}




