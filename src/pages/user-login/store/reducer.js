import * as constants from './constants';
import {fromJS} from 'immutable';

const defaultState = fromJS({
    loginInfo:{},
    bindPhone:{}
});

export default (state = defaultState.loginInfo,action) => {
    switch(action.type){
        case constants.WEIXIN_LOGIN:
            return {
                ...state,
                loginInfo:action.value
            }
        case constants.LOGIN_SEND_CODE:
            return {
                ...state,
                bindPhone:action.value
            }
        default:
            return state;
    }
}