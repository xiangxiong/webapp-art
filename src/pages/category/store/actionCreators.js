import * as constants from './constants';
import {post} from './../../../utils/request';
import {ART_CATEGORY_API,PUBLISH_USER_TYPE,ProductCommend,GuessUserLikeProducts} from './../../../utils/servicekey';

export const dispatchCategoryList = (params) => {
    return async (dispatch)=>{
        const result = await post(ART_CATEGORY_API,params);
        return result.Data.DataList;
    }
}

export const dispatchShopCategoryList = (params) => {
    return async (dispatch) => {
        const result = await post(PUBLISH_USER_TYPE,params);
        return result.Data.DataList;
    }
}

export const dispatchProductList = (params) => {
    return async (dispatch) =>{
        const result = await post(GuessUserLikeProducts,params);
        return result.Data.DataList;
    }
}

