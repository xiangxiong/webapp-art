import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    CustomerDetail,
    CreateIntertionalPartener,
    Dict,
    AddressList,
    AddressAdd,
    AddressUpdate,
    AddressDelete,
    AddressSetDefault
} from "../../../utils/servicekey";
import history from '@/utils/history';

export const userCarouselAdList = (DataList) => ({
    type: constants.USER_CUSTOMER_DETAIL,
    value: DataList
});

export const userDictAdList = (DictValueList) => ({
    type: constants.USER_DICT_LIST,
    value: DictValueList
});

export const userAddressList = (DataList) => ({
    type: constants.USER_ADDRESS_LIST,
    value: DataList
});

export const getCustomerDetail = (params) => {
    return (dispatch) => {
        return post(CustomerDetail, params)
            .then((response) => {
                dispatch(userCarouselAdList(response.Entity));
            });
    }
};

export const getCreateIntertionalPartener = (params) => {
    return (dispatch) => {
        return post(CreateIntertionalPartener, params)
            .then((response) => {
                if (response) {
                    history.push('/pend');
                }
            });
    }
};

export const getDict = (params) => {
    return (dispatch) => {
        return post(Dict, params)
            .then((response) => {
                dispatch(userDictAdList(response.DictValueList));
            });
    }
};

export const getAddressList = (params) => {
    return (dispatch) => {
        return post(AddressList, params)
            .then((response) => {
                dispatch(userAddressList(response.DataList));
            });
    }
};

export const getAddressAdd = (params) => {
    return (dispatch) => {
        return post(AddressAdd, params)
            .then((response) => {
                if (response) {
                    history.push('');
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
                if (response) {
                    history.push('/pend');
                }
            });
    }
};

export const getAddressSetDefault = (params) => {
    return (dispatch) => {
        return post(AddressSetDefault, params)
            .then((response) => {
                if (response) {
                    history.push('');
                }
            });
    }
};

