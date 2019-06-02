import {QUERY_CAR_LIST} from './constants';

const defaultState = {
    carList: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case QUERY_CAR_LIST:
            return {...state, carList: action.value};
        default:
            return state;
    }
}