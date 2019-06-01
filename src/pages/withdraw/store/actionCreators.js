import * as constants from './constants';
import {post} from "../../../utils/request";
import {DESPOSITS, DESPOSITS_RECORD} from "../../../utils/servicekey";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';

export const DespositsRecord = (DataList) => ({
    type: constants.RECORD_LIST,
    value: DataList
});

export const getDespositsRecord = (params) => {
    return (dispatch) => {
        return post(DESPOSITS_RECORD, params)
            .then((response) => {
                dispatch(DespositsRecord(response.Data.DataList));
            });
    }
};

export const getDesposits = (params) => {
    return (dispatch) => {
        return post(DESPOSITS, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Data.ResponseMessage);
                }
            });
    }
};