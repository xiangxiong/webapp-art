import * as constants from './constants';

const defaultState = {
    loginInfo:{}
};

export default (state = defaultState.loginInfo,action) => {
    switch(action.type){
        case constants.WEIXIN_LOGIN:
            return {
                ...state,
                loginInfo:action.value
            }
        default:
            return state;
    }
}