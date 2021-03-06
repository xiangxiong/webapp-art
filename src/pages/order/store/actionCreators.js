import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    AddressList,
    CreateOrder,
    QueryCustomerOrderList,
    GetOrderDetail,
    POrderInfo,
    SAVE_RMAM_ASTER,
    COMMENT_ADD,
    SHIP_VIA,
    ORDER_SEND,
    ORDER_RECEIVED
} from "../../../utils/servicekey";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';
import axios from 'axios';
import {API_PAY} from '../../../utils/api';

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

export const shipVia = (DataList) => ({
    type: constants.ORDER_SHIP_VIA,
    value: DataList
});

export const getDefaultAddress = (params) => {
    return (dispatch) => {
        return post(AddressList, params)
            .then((response) => {
                let DataList = response.Data.DataList||[];
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
                    let {OrderAmount, SONumber} = response.Data;
                    history.push('./payorder', {OrderAmount, SONumber});
                    Toast.info(response.Data.ResponseMessage);
                } else {
                    Toast.info(response.Data.ResponseMessage);
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
                dispatch(orderDetail(response.Data));
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

export const getPayParams = (params) => {
    return async (dispatch) => {
        const result = await getWechatParams(params);
        return result;
    }
};

const getWechatParams = (params) => {
    return axios({
        method: 'post',
        url: API_PAY,
        data: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        timeout: 3000
    })
        .then(response => {
            return response;
        });
};

export const getSaveRmamAster = (params) => {
    return (dispatch) => {
        return post(SAVE_RMAM_ASTER, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Message);
                }
            });
    }
};

export const getCommentAdd = (params) => {
    return (dispatch) => {
        return post(COMMENT_ADD, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Message);
                }
            });
    }
};

export const getShipVia = (params) => {
    return (dispatch) => {
        return post(SHIP_VIA, params)
            .then((response) => {
                dispatch(shipVia(response.Data.ShipViaList));
            });
    }
};

export const getOrderSend = (params) => {
    return (dispatch) => {
        return post(ORDER_SEND, params)
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    history.goBack();
                } else {
                    Toast.info(response.Data.Message);
                }
            });
    }
};

export const getOrderReceived = (params) => {
    return (dispatch) => {
        const {SONumber, OrderNumber, CustomerId, OrderStatus, ProviderId, type} = params;

        return post(ORDER_RECEIVED, {SONumber, OrderNumber, CustomerId})
            .then((response) => {
                if (response.Data && response.Data.Status == 200) {
                    Toast.info('确认收货成功');
                    if (type === 'sell') {
                        //卖家
                        dispatch(getQueryCustomerOrderList({
                            CustomerId: 0,
                            OrderStatus,
                            CurrentPage: 1,
                            ProviderId,
                            PageSize: 10
                        }));
                    } else {
                        //买家
                        dispatch(getQueryCustomerOrderList({
                            CustomerId,
                            OrderStatus,
                            CurrentPage: 1,
                            ProviderId: 0,
                            PageSize: 10
                        }));
                    }
                } else {
                    Toast.info(response.Data.Message);
                }
            });
    }
};