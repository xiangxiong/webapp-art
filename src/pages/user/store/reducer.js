import {USER_CUSTOMER_DETAIL} from './constants';

const defaultState = {
    customerDetail: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_CUSTOMER_DETAIL:
            return {
                ...state,
                customerDetail: action.value
            };
        default:
            return state;
    }
}