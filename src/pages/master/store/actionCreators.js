import * as constants from './constants';
import {post} from "../../../utils/request";
import {GET_RECOMMEND_AUTHOR_LIST,ART_MASTER_DETAIL_API,ART_MASTER_GET_PRODUCT_API} from "../../../utils/servicekey";

export const masterCarouselAdList = (DataList) => ({
    type: constants.MASTER_CAROUSEL_AD_LIST,
    value: DataList
});

export const masterCommonAdList = (DataList) => ({
    type: constants.MASTER_COMMON_AD_LIST,
    value: DataList
});

export const masterNewsPagerList = (NewList) => ({
    type: constants.MASTER_NEWS_PAGER_LIST,
    value: NewList
});

export const masterProductCommendList = (NewList) => ({
    type: constants.MASTER_PRODUCT_COMMEND_LIST,
    value: NewList
});

export const masterLikeProductsList = (NewList) => ({
    type: constants.MASTER_LIKE_PRODUCTS_LIST,
    value: NewList
});

export const getRecommendAuthorList = (params) => {
    return (dispatch) => {
        return post(GET_RECOMMEND_AUTHOR_LIST, params)
            .then((response) => {
                if (!params) {
                    return
                }
                if (params.IsHot === 1) {
                    dispatch(masterProductCommendList(response.Data.DataList));
                } else {
                    dispatch(masterLikeProductsList(response.Data.DataList));
                }
            });
    }
};

export const dispatchMasterDetail = (params) => {
    return async (dispatch) => {
        const result = await post(ART_MASTER_DETAIL_API,params);
        return result.Data;
    }
}

export const dispatchMasterGetProduct = (params) => {
    return async (dispatch) => {
        const result = await post(ART_MASTER_GET_PRODUCT_API,params);
        return result.Data;
    }
}