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
    return async (dispatch) => {
        return await post(QUERY_CAR_LIST, params);
    }
};

export const getModifyCart = (params) => {
    return async (dispatch) => {
        return await post(MODIFY_CART, params);
    }
};

export const getBatchDelCart = (params) => {
    return async (dispatch) => {
        return await post(BATCH_DEL_CART, params);
    }
};













