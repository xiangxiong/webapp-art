import {
    USER_CUSTOMER_DETAIL,
    USER_ADDRESS_LIST,
    USER_DICT_LIST,
    USER_ORDER_LIST,
    USER_ORDER_DETAIL,
    USER_PORDER_INFO,
    USER_QUERY_CATEGORY_LIST
} from './constants';

const defaultState = {
    customerDetail: {},
    userCategoryList: [],
    userAddressList: [],
    userDictList: [],
    userOrderList: [],
    userOrderDetail: {},
    userPOrderInfo: {}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_CUSTOMER_DETAIL:
            return {
                ...state,
                customerDetail: action.value
            };
        case USER_ADDRESS_LIST:
            return {
                ...state,
                userAddressList: action.value
            };
        case USER_DICT_LIST:
            return {
                ...state,
                userDictList: action.value
            };
        case USER_ORDER_LIST:
            return {
                ...state,
                userOrderList: action.value
            };
        case USER_ORDER_DETAIL:
            return {
                ...state,
                userOrderDetail: action.value
            };
        case USER_PORDER_INFO:
            return {
                ...state,
                userPOrderInfo: action.value
            };
        case USER_QUERY_CATEGORY_LIST:
            return {
                ...state,
                userCategoryList: action.value
            };
        default:
            return state;
    }
}