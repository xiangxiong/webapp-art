import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    AddressList,
    AddressAdd,
    AddressUpdate,
    AddressDelete,
    AddressSetDefault,
} from "../../../utils/servicekey";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';

export const addressList = (DataList) => ({
    type: constants.ADDRESS_LIST,
    value: DataList
});

export const getAddressList = (params) => {
    return (dispatch) => {
        return post(AddressList, params)
            .then((response) => {
                dispatch(addressList(response.Data.DataList));
            });
    }
};

export const getAddressAdd = (params) => {
    return (dispatch) => {
        return post(AddressAdd, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Data.ResponseMessage);
                }
            });
    }
};

export const getAddressUpdate = (params) => {
    return (dispatch) => {
        return post(AddressUpdate, params)
            .then((response) => {
                if (response) {
                    history.push('');
                }
            });
    }
};

export const getAddressDelete = (params) => {
    return (dispatch) => {
        return post(AddressDelete, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    getAddressList();
                } else {
                    Toast.info(response.Message);
                }
            });
    }
};

export const getAddressSetDefault = (params) => {
    return (dispatch) => {
        return post(AddressSetDefault, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    getAddressList();
                } else {
                    Toast.info(response.Message);
                }
            });
    }
};