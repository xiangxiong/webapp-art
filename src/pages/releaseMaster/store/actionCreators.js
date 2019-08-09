import * as constants from './constants';
import {post} from '../../../utils/request';
import {PUBLISH_TOPIC_INFO} from '../../../utils/servicekey';
import {Toast} from 'antd-mobile';
import history from '../../../utils/history';
import {setWork} from '../../user/store/actionCreators';

export const getPublishTopicInfo = (params) => {
    return (dispatch) => {
        return post(PUBLISH_TOPIC_INFO, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    dispatch(setWork({}));
                    history.goBack();
                } else {
                    Toast.info(response.Message);
                }
            });
    }
};

export const setValue = (value) => ({
    type: constants.RELEASEMASTER_SET_VALUE,
    value: value
});