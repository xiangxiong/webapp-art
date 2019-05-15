import * as constants from './constants';
import {post} from '../../../utils/request';
import {AppAdCommon} from '../../../utils/servicekey';

const carouselAdList = (DataList) => ({
    type: constants.CAROUSEL_AD_LIST,
    value: DataList
});

const commonAdList = (DataList) => ({
    type: constants.COMMON_AD_LIST,
    value: DataList
});

export const getAdvertList = (AppAdType) => {
    return (dispatch) => {
        return post(AppAdCommon, {AppAdType})
            .then((response) => {
                if (AppAdType === 1) {
                    dispatch(carouselAdList(response.DataList));
                } else if (AppAdType === 11) {
                    dispatch(commonAdList(response.DataList));
                }
            });
    }
};