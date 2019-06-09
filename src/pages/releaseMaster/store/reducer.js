import {
    RELEASEMASTER_SET_VALUE,
} from './constants';
import _ from 'lodash';

const defaultState = {
    releaseMasterInfo: {}//填写大师印象的输入信息
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case RELEASEMASTER_SET_VALUE:
            let newReleaseMasterInfo = _.assign({}, state.releaseMasterInfo, action.value);
            return {
                ...state,
                releaseMasterInfo: newReleaseMasterInfo
            };
            break;
        default:
            return state;
    }
}