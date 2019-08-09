import {CATEGORY_LIST} from './constants';

const defaultState = {
    categoryList:[]
}

export default (state = defaultState,action) => {
    switch(action.type){
        case CATEGORY_LIST:
                return {
                    ...state,
                    categoryList:action.value
                }
        default:
                return state;
    }
}