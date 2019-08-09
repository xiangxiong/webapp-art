import * as constants from './constants';

const defaultState = {
    searchResultsList: [],
};
export default (state = defaultState, action) => {
    switch (action.type) {
        case constants.SEARCH_SEARCH_ALL:
            return {...state, searchResultsList: action.value};
        default:
            return state;
    }
}