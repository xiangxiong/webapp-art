import * as constants from './constants';
import {post} from "../../../utils/request";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';
import {
    QUERY_CAR_LIST,
    MODIFY_CART,
    BATCH_DEL_CART,
    API_VIDOE_PALYER
} from "../../../utils/servicekey";

const queryCarList = (response) => ({
    type: constants.QUERY_CAR_LIST,
    value: response
});

export const getQueryCarList = (params) => {
    return async (dispatch) => {
        const result = await post(QUERY_CAR_LIST, params);
        return result;
    }
};

export const getModifyCart = (params) => {
    return async (dispatch) => {
        const result = await post(MODIFY_CART, params);
        return result;
    }
};

export const getBatchDelCart = (params) => {
    return async (dispatch) => {
        const result = await post(BATCH_DEL_CART, params);
        return result;
    }
};


export const dispatchVideoPalyer = (params) =>{
    return async (dispatch) =>{
        const result = await post(API_VIDOE_PALYER,params);
        return result;
    }
}













