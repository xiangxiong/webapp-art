import * as constants from './constants';
import {post} from "../../../utils/request";
import {ACCOUNT_LIST, CARD_ADD} from "../../../utils/servicekey";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';

export const accountList = (DataList) => ({
    type: constants.BANK_CARD_LIST,
    value: DataList
});

export const getAccountList = (params) => {
    return (dispatch) => {
        return post(ACCOUNT_LIST, params)
            .then((response) => {
                dispatch(accountList(response.Data.DataList));
            });
    }
};

export const getCardAdd = (params) => {
    return (dispatch) => {
        return post(CARD_ADD, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Data.ResponseMessage);
                }
            });
    }
};