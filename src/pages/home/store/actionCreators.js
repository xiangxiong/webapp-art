import * as constants from './constants';
import {post} from '../../../utils/request';
import {AppAdCommon} from '../../../utils/servicekey';

const advertList = () => ({
    type: constants.CHANGE_LOGIN,
    value: true
});

export const getAdvertList = (AppAdType) => {
    return (dispatch) => {
        return post(AppAdCommon, {AppAdType})
            .then((response) => {
                console.log('response', response);
                dispatch(advertList(response));
            });
    }
};