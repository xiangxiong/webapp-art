import * as constants from './constants';
import {post} from "../../../utils/api";
import {ART_COMMUNITY_LIST_API} from "../../../utils/servicekey";

export const actionCommunityList = (list) => ({
    type:constants.ART_COMMUNITY_LIST_API,
    value:list
})

export const dispatchCommunityList = (params) =>{
    return async (dispatch) => {
        const result = post(ART_COMMUNITY_LIST_API,params);
        dispatch(actionCommunityList(result))
        return result;
    }
}