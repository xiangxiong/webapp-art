import * as constants from './constants';
import {post} from "../../../utils/request";
import {ACCOUNT_LIST, CARD_ADD, CARD_DELETE} from "../../../utils/servicekey";
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
                if (response && response.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Data.ResponseMessage);
                }
            });
    }
};

export const getCardDelete = (params) => {
    return (dispatch) => {
        return post(CARD_DELETE, params)
            .then((response) => {
                if (response && response.Status == 200) {
                    let storage = Storage.Base.getInstance();
                    let CustomerId = storage.get('userInfo').CustomerId;
                    let Token = storage.get('userInfo').Token;
                    dispatch(getAccountList({CustomerId, Token}));
                } else {
                    Toast.info(response.Data.ResponseMessage);
                }
            });
    }
};