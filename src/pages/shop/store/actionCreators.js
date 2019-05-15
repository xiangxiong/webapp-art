import * as constants from './constants';
import {post} from "../../../utils/request";
import {ProductCommend} from "../../../utils/servicekey";

export const shopCarouselAdList = (DataList) => ({
    type: constants.SHOP_CAROUSEL_AD_LIST,
    value: DataList
});

export const shopCommonAdList = (DataList) => ({
    type: constants.SHOP_COMMON_AD_LIST,
    value: DataList
});

export const shopNewsPagerList = (NewList) => ({
    type: constants.SHOP_NEWS_PAGER_LIST,
    value: NewList
});

export const shopProductCommendList = (DataList) => ({
    type: constants.SHOP_PRODUCT_COMMEND_LIST,
    value: DataList
});

export const showUserLikeProducts = (DataList) => ({
    type: constants.SHOP_LIKE_PRODUCTS_LIST,
    value: DataList
});

export const getProductCommend = (params) => {
    return (dispatch) => {
        return post(ProductCommend, params)
            .then((response) => {
                dispatch(shopProductCommendList(response.DataList));
            });
    }
};