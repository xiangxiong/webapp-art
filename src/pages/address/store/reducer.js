import {ADDRESS_LIST} from './constants';

const defaultState = {
    addressList: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ADDRESS_LIST:
            return {
                ...state,
                addressList: action.value
            };
        default:
            return state;
    }
}