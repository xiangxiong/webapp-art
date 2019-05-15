import * as constants from './constants';

const defaultState = {
    carouselAdList: [],
    commonAdList: [],
    newsPagerList: [],
    userLikeProducts: []
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CAROUSEL_AD_LIST:
            return {...state, carouselAdList: action.value};
        case constants.COMMON_AD_LIST:
            return {...state, commonAdList: action.value};
        case constants.NEWS_PAGER_LIST:
            return {...state, newsPagerList: action.value};
        case constants.USER_LIKE_PRODUCTS_LIST:
            return {...state, userLikeProducts: action.value};

        default:
            return state;
    }
}