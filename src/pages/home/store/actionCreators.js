import * as constants from './constants';
import {post} from '../../../utils/request';
import {AppAdCommon, NewsPager, GuessUserLikeProducts} from '../../../utils/servicekey';
import {
    shopCarouselAdList,
    shopCommonAdList,
    shopNewsPagerList,
    showUserLikeProducts
} from '../../shop/store/actionCreators';

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

const userLikeProducts = (DataList) => ({
    type: constants.USER_LIKE_PRODUCTS_LIST,
    value: DataList
});

export const getAdvertList = (AppAdType) => {
    return (dispatch) => {
        return post(AppAdCommon, {AppAdType})
            .then((response) => {
                if (AppAdType === 1) {
                    dispatch(carouselAdList(response.DataList));
                } else if (AppAdType === 11) {
                    dispatch(commonAdList(response.DataList));
                } else if (AppAdType === 2) {
                    dispatch(shopCarouselAdList(response.DataList));
                } else if (AppAdType === 21) {
                    dispatch(shopCommonAdList(response.DataList));
                } else if (AppAdType === 3) {
                } else if (AppAdType === 31) {
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
                    dispatch(newsPagerList(response.NewList));
                } else if (params.CategoryId == 4) {
                    dispatch(shopNewsPagerList(response.NewList));
                } else if (params.CategoryId == 5) {
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
                    dispatch(userLikeProducts(response.DataList));
                } else if (params.Position === 2) {
                    dispatch(showUserLikeProducts(response.DataList));
                }
            });
    }
};