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
    AddressSetDefault,
    QueryCustomerOrderList,
    GetOrderDetail,
    POrderInfo,
    CreateOrder,
    QueryCategoryList
} from "../../../utils/servicekey";
import history from '../../../utils/history';

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

export const queryCustomerOrderList = (DataList) => ({
    type: constants.USER_ORDER_LIST,
    value: DataList
});

export const orderDetail = (data) => ({
    type: constants.USER_ORDER_DETAIL,
    value: data
});

export const pOrderInfo = (OrderInfo) => ({
    type: constants.USER_PORDER_INFO,
    value: OrderInfo
});

export const queryCategoryList = (DataList) => ({
    type: constants.USER_QUERY_CATEGORY_LIST,
    value: DataList
});

export const getCustomerDetail = (params) => {
    return (dispatch) => {
        return post(CustomerDetail, params)
            .then((response) => {
                dispatch(userCarouselAdList(response.Data.Entity));
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
                dispatch(userDictAdList(response.Data.DictValueList));
            });
    }
};

export const getAddressList = (params) => {
    return (dispatch) => {
        return post(AddressList, params)
            .then((response) => {
                dispatch(userAddressList(response.Data.DataList));
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

export const getCreateOrder = (params) => {
    return (dispatch) => {
        return post(CreateOrder, params)
            .then((response) => {
                if (response) {
                    history.push('');
                }
            });
    }
};

export const getQueryCategoryList = (params) => {
    return (dispatch) => {
        return post(QueryCategoryList, params)
            .then((response) => {
                console.log("getQueryCategoryList response", response);
                dispatch(queryCategoryList(response.Data.DataList));
            });
    }
};