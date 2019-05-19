import {
    USER_CUSTOMER_DETAIL,
    USER_ADDRESS_LIST,
    USER_DICT_LIST,
    USER_QUERY_CATEGORY_LIST,
    USER_QUERY_INTERTIONAL_PARTENER
} from './constants';

const defaultState = {
    customerDetail: {},
    userCategoryList: [],
    userAddressList: [],
    userDictList: [],
    userIntertionalPartener: {},
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
        case USER_QUERY_CATEGORY_LIST:
            return {
                ...state,
                userCategoryList: action.value
            };
        case USER_QUERY_INTERTIONAL_PARTENER:
            return {
                ...state,
                userIntertionalPartener: action.value
            };
        default:
            return state;
    }
}