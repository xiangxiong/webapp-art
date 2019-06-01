import * as constants from './constants';
import {post} from './../../../utils/request';
import {ART_CATEGORY_API} from './../../../utils/servicekey';

export const dispatchCategoryList = (params) => {
    return async (dispatch)=>{
        const result = await post(ART_CATEGORY_API,params);
        console.log('result',result);
        return result.Data.DataList;
    }
}
