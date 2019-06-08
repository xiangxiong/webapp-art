import * as constants from './constants';

const defaultState = {
    shopCarouselAdList: [],
    shopCommonAdList: [],
    shopNewsPagerList: [],
    shopProductCommendList: [],
    shopUserLikeProducts: [],
    shopWorthGoodsDetail: {},
    showProductComment: [],
    shopProviderInfo:{}
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SHOP_CAROUSEL_AD_LIST:
            return {...state, shopCarouselAdList: action.value};
        case constants.SHOP_COMMON_AD_LIST:
            return {...state, shopCommonAdList: action.value};
        case constants.SHOP_NEWS_PAGER_LIST:
            return {...state, shopNewsPagerList: action.value};
        case constants.SHOP_PRODUCT_COMMEND_LIST:
            return {...state, shopProductCommendList: action.value};
        case constants.SHOP_LIKE_PRODUCTS_LIST:
            return {...state, shopUserLikeProducts: action.value};
        case constants.SHOP_WORTH_GOODS_DETAIL:
            return {...state, shopWorthGoodsDetail: action.value};
        case constants.SHOP_PRODUCT_COMMENT:
            return {...state, showProductComment: action.value};
        case constants.SHOP_PROVIDER_INFO:
            return {...state, shopProviderInfo: action.value};
        default:
            return state;
    }
}