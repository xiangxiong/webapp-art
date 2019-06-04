import * as constants from './constants';
import {post} from "../../../utils/request";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';
import {
    QUERY_CAR_LIST,
    MODIFY_CART,
    BATCH_DEL_CART
} from "../../../utils/servicekey";

const queryCarList = (response) => ({
    type: constants.QUERY_CAR_LIST,
    value: response
});

export const getQueryCarList = (params) => {
    return (dispatch) => {
        return post(QUERY_CAR_LIST, params)
            .then((response) => {
                dispatch(queryCarList(response.Data.DataList))
            })
    }
};

export const getModifyCart = (params) => {
    return (dispatch) => {
        return post(MODIFY_CART, params)
            .then((response) => {
                if (response && response.Data && response.Data.Status==200) {
                    Toast.info('操作成功');
                } else {
                    Toast.info('网络异常');
                }
            });
    }
};

export const getBatchDelCart = (params) => {
    return (dispatch) => {
        return post(BATCH_DEL_CART, params)
            .then((response) => {
                if (response && response.Data && response.Data.Data) {
                    Toast.info('操作成功');
                } else {
                    Toast.info('网络异常');
                }
            });
    }
};













