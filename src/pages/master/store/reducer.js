import * as constants from './constants';

const defaultState = {
    masterCarouselAdList: [],
    masterCommonAdList: [],
    masterNewsPagerList: [],
    masterProductCommendList: [],
    masterUserLikeProductsList: [],
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.MASTER_CAROUSEL_AD_LIST:
            return {...state, masterCarouselAdList: action.value};
        case constants.MASTER_COMMON_AD_LIST:
            return {...state, masterCommonAdList: action.value};
        case constants.MASTER_NEWS_PAGER_LIST:
            return {...state, masterNewsPagerList: action.value};
        case constants.MASTER_PRODUCT_COMMEND_LIST:
            return {...state, masterProductCommendList: action.value};
        case constants.MASTER_LIKE_PRODUCTS_LIST:
            return {...state, masterUserLikeProductsList: action.value};

        default:
            return state;
    }
}