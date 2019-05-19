import * as constants from './constants';
import {post} from "../../../utils/request";
import {CreateOrder, QueryCustomerOrderList, GetOrderDetail, POrderInfo} from "../../../utils/servicekey";
import history from '../../../utils/history';

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

export const getCreateOrder = (params) => {
    return (dispatch) => {
        return post(CreateOrder, params)
            .then((response) => {
                if (response) {
                    //history.push('');
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