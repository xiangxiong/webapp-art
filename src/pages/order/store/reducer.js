import {ORDER_LIST, ORDER_DETAIL, PORDER_INFO} from './constants';

const defaultState = {
    orderList: [],
    orderDetail: {},
    pPOrderInfo: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
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