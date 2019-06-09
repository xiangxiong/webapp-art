import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    ProductCommend,
    WorthGoodsDetail,
    ProductComment,
    COLLECTIN,
    GET_PROVIDER_INFO,
    ART_MASTER_GET_PRODUCT_API
} from "../../../utils/servicekey";
import {Toast} from 'antd-mobile';

export const providerInfo = (Entity) => ({
    type: constants.SHOP_PROVIDER_INFO,
    value: Entity
});

export const masterGetProduct = (DataList) => ({
    type: constants.SHOP_MASTER_GET_PRODUCT,
    value: DataList
});

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

export const worthGoodsDetail = (Entity) => ({
    type: constants.SHOP_WORTH_GOODS_DETAIL,
    value: Entity
});

export const getWorthGoodsDetail = (params) => {
    return (dispatch) => {
        return post(WorthGoodsDetail, params)
            .then((response) => {
               return dispatch(worthGoodsDetail(response.Data.Entity));
            });
    }
};

export const getProductDetail = (params) => {
    return async (dispatch) => {
        const result = await post(WorthGoodsDetail, params);
        return result;
    }
};


export const productComment = (Data) => ({
    type: constants.SHOP_PRODUCT_COMMENT,
    value: Data
});
export const getProductCommend = (params) => {
    return (dispatch) => {
        return post(ProductCommend, params)
            .then((response) => {
                dispatch(shopProductCommendList(response.Data.DataList));
            });
    }
};

export const getProductComment = (params) => {
    return (dispatch) => {
        return post(ProductComment, params)
            .then((response) => {
                dispatch(productComment(response.Data));
            });
    }
};

export const getCollectin = (params) => {
    return (dispatch) => {
        return post(COLLECTIN, params)
            .then((response) => {
                if (response && response.Data && response.Data.Status == 200) {
                    Toast.info('操作成功');
                } else {
                    Toast.info('网络异常');
                }
            });
    }
};

export const getProviderInfo = (params) => {
    return (dispatch) => {
        return post(GET_PROVIDER_INFO, params)
            .then((response) => {
                dispatch(providerInfo(response.Data.Entity));
            });
    }
};

export const dispatchMasterGetProduct = (params) => {
    return (dispatch) => {
        return post(ART_MASTER_GET_PRODUCT_API, params)
            .then((response) => {
                dispatch(masterGetProduct(response.Data.DataList));
            });
    }
};