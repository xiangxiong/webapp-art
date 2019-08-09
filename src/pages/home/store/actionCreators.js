import * as constants from './constants';
import {post,testRequest} from '../../../utils/request';
import {AppAdCommon, NewsPager, GuessUserLikeProducts,GET_WECHAT_API,WX_PARENTER_LOGIN} from '../../../utils/servicekey';
import {
    shopCarouselAdList,
    shopCommonAdList,
    shopNewsPagerList,
    showUserLikeProducts
} from '../../shop/store/actionCreators';

import {
    masterCarouselAdList,
    masterCommonAdList,
    masterNewsPagerList
} from '../../master/store/actionCreators';

const carouselAdList = (DataList) => ({
    type: constants.CAROUSEL_AD_LIST,
    value: DataList
});

const commonAdList = (DataList) => ({
    type: constants.COMMON_AD_LIST,
    value: DataList
});

const newsPagerList = (NewList) => ({
    type: constants.NEWS_PAGER_LIST,
    value: NewList
});

const userLikeProducts = (Data, CurrentPage) => ({
    type: constants.USER_LIKE_PRODUCTS_LIST,
    value: Data,
    CurrentPage
});

export const clearUserLikeProducts = (Data) => ({
    type: constants.CLEAR_USER_LIKE_PRODUCTS_LIST,
    value: {},
});

export const getAdvertList = (AppAdType) => {
    return (dispatch) => {
        return post(AppAdCommon, {AppAdType})
            .then((response) => {
                if (AppAdType === 1) {
                    dispatch(carouselAdList(response.Data.DataList));
                } else if (AppAdType === 11) {
                    dispatch(commonAdList(response.Data.DataList));
                } else if (AppAdType === 2) {
                    dispatch(shopCarouselAdList(response.Data.DataList));
                } else if (AppAdType === 21) {
                    dispatch(shopCommonAdList(response.Data.DataList));
                } else if (AppAdType === 3) {
                    dispatch(masterCarouselAdList(response.Data.DataList));
                } else if (AppAdType === 31) {
                    dispatch(masterCommonAdList(response.Data.DataList));
                } else if (AppAdType === 4) {
                } else if (AppAdType === 41) {
                } else if (AppAdType === 5) {
                }
            });
    }
};

export const getNewsPagerList = (params) => {
    return (dispatch) => {
        return post(NewsPager, params)
            .then((response) => {
                if (!params || !params.CategoryId) {
                    return
                }
                if (params.CategoryId == 3) {
                    dispatch(newsPagerList(response.Data.NewList));
                } else if (params.CategoryId == 4) {
                    dispatch(shopNewsPagerList(response.Data.NewList));
                } else if (params.CategoryId == 5) {
                    dispatch(masterNewsPagerList(response.Data.NewList));
                }
            });
    }
};

export const getUserLikeProducts = (params) => {
    return (dispatch) => {
        return post(GuessUserLikeProducts, params)
            .then((response) => {
                if (!params || !params.Position) {
                    return
                }
                if (params.Position === 1) {
                    dispatch(userLikeProducts(response.Data, params.CurrentPage));
                } else if (params.Position === 2) {
                    dispatch(showUserLikeProducts(response.Data.DataList));
                }
            });
    }
};

const wxLoginInfo = (data) => ({
    type:constants.WEIXIN_LOGIN,
    value:data
});

export const getOauthInfo = (params) =>{
    return async () => {
        const result = await post(GET_WECHAT_API,params);
        return result;
    }
}

export const wxLogin = (params) =>{
    return async () => {
        const result = await post(WX_PARENTER_LOGIN,params);
        return result;
    }
}

export const getUserLikeList = (params) => {
    return async () => {
        const result = await post(GuessUserLikeProducts,params);
        return result;
    }
}

