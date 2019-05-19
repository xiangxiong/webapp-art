import * as constants from './constants';
import {post} from "../../../utils/request";
import {AddressList, CreateOrder, QueryCustomerOrderList, GetOrderDetail, POrderInfo} from "../../../utils/servicekey";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';

export const defaultAddress = (addressObj) => ({
    type: constants.DEFAULT_ADDRESS,
    value: addressObj
});

export const queryCustomerOrderList = (DataList) => ({
    type: constants.ORDER_LIST,
    value: DataList
});

export const orderDetail = (data) => ({
    type: constants.ORDER_DETAIL,
    value: data
});

export const pOrderInfo = (OrderInfo) => ({
    type: constants.PORDER_INFO,
    value: OrderInfo
});

export const getDefaultAddress = (params) => {
    return (dispatch) => {
        return post(AddressList, params)
            .then((response) => {
                let DataList = response.Data.DataList;
                DataList.map(data => {
                    if (data.IsDefault == 0) {
                        dispatch(defaultAddress(data));
                    }
                });
            });
    }
};

export const getCreateOrder = (params) => {
    return (dispatch) => {
        return post(CreateOrder, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.push('./payorder');
                } else {
                    Toast.info(response.Message);
                }
            });
    }
};

export const getQueryCustomerOrderList = (params) => {
    return (dispatch) => {
        return post(QueryCustomerOrderList, params)
            .then((response) => {
                dispatch(queryCustomerOrderList(response.Data.DataList));
            });
    }
};

export const getGetOrderDetail = (params) => {
    return (dispatch) => {
        return post(GetOrderDetail, params)
            .then((response) => {
                dispatch(orderDetail(response.Data.data));
            });
    }
};

export const getPOrderInfo = (params) => {
    return (dispatch) => {
        return post(POrderInfo, params)
            .then((response) => {
                dispatch(pOrderInfo(response.Data.OrderInfo));
            });
    }
};