import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    list:[],
    detail:{}
});

export default (state = defaultState, action) => {
    switch(action.type){
        case constants.COMMUNITY_LIST:
            return state.merge({
                list:action.value
            });
        case constants.COMMUNITY_DETAIL:
            return state.set('detail',action.value)
        default:
            return state;
    }
}