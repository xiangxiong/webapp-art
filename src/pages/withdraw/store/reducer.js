import {RECORD_LIST} from './constants';

const defaultState = {
    recordList: [],
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case RECORD_LIST:
            return {
                ...state,
                recordList: action.value
            };
        default:
            return state;
    }
}