import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    AddressList,
    CreateOrder,
    QueryCustomerOrderList,
    GetOrderDetail,
    POrderInfo,
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
                    let {OrderAmount, SONumber} = response.Data;
                    history.push('./payorder', {OrderAmount, SONumber});
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

export const getWebSite = (params) => {
    return (dispatch) => {
        return axios({
            method: 'post',
            url: API_PAY,
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            timeout: 3000
        }).then(response => {
            callBackPay(response.Data);
            console.log("response", response);
        });
    }
};

export const callBackPay = (data) => {
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
        } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', jsApiCall);
            document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
        }
    } else {
        jsApiCall(data);
    }
};

const jsApiCall = (data) => {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            appId: data.appid + '',     //公众号名称，由商户传入
            timeStamp: data.timestamp + '',         //时间戳，自1970年以来的秒数
            nonceStr: data.noncestr + '', //随机串
            package: data.package + '',
            signType: 'MD5',//签名方式
            paySign: data.sign + '' //微信签名
        }, function (res) {
            if (res.err_msg == 'get_brand_wcpay_request:ok') {
                history.push('/orderList');
            } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
                Toast("用户取消支付");
            } else {
                Toast('支付失败');
            }
        }
    );
};