import * as constants from './constants';

const defaultState = {
    carouselAdList: [],
    commonAdList: []
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.CAROUSEL_AD_LIST:
            return {...state, carouselAdList: action.value};
        case constants.COMMON_AD_LIST:
            return {...state, commonAdList: action.value};
        default:
            return state;
    }
}