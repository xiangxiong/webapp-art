import * as constants from './constants';
import {post} from '../../../utils/request';
import {AppAdCommon, NewsPager, GuessUserLikeProducts} from '../../../utils/servicekey';

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
                }
            });
    }
};

export const getNewsPagerList = (params) => {
    return (dispatch) => {
        return post(NewsPager, params)
            .then((response) => {
                dispatch(newsPagerList(response.NewList));
            });
    }
};

export const getUserLikeProducts = (params) => {
    return (dispatch) => {
        return post(GuessUserLikeProducts, params)
            .then((response) => {
                dispatch(userLikeProducts(response.DataList));
            });
    }
};