import {DEFAULT_ADDRESS, ORDER_LIST, ORDER_DETAIL, PORDER_INFO} from './constants';

const defaultState = {
    defaultAddress: {},
    orderList: [],
    orderDetail: {},
    pPOrderInfo: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case DEFAULT_ADDRESS:
            return {
                ...state,
                defaultAddress: action.value
            };
        case ORDER_LIST:
            return {
                ...state,
                orderList: action.value
            };
        case ORDER_DETAIL:
            return {
                ...state,
                orderDetail: action.value
            };
        case PORDER_INFO:
            return {
                ...state,
                pPOrderInfo: action.value
            };
        default:
            return state;
    }
}