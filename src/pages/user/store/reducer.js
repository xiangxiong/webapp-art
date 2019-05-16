import {USER_CUSTOMER_DETAIL, USER_ADDRESS_LIST, USER_DICT_LIST} from './constants';

const defaultState = {
    customerDetail: {},
    userAddressList: [],
    userDictList: [],
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
        default:
            return state;
    }
}