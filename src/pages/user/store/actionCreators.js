import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    CustomerDetail,
    CreateIntertionalPartener,
    Dict,
    QueryCategoryList,
    QueryIntertionalPartener
} from "../../../utils/servicekey";
import history from '../../../utils/history';

export const userCustomerDetail = (DataList) => ({
    type: constants.USER_CUSTOMER_DETAIL,
    value: DataList
});

export const userDictAdList = (DictValueList) => ({
    type: constants.USER_DICT_LIST,
    value: DictValueList
});

export const queryCategoryList = (DataList) => ({
    type: constants.USER_QUERY_CATEGORY_LIST,
    value: DataList
});

export const queryIntertionalPartener = (Entity) => ({
    type: constants.USER_QUERY_INTERTIONAL_PARTENER,
    value: Entity
});

export const getCustomerDetail = (params) => {
    return (dispatch) => {
        return post(CustomerDetail, params)
            .then((response) => {
                dispatch(userCustomerDetail(response.Data.Entity));
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

export const getQueryCategoryList = (params) => {
    return (dispatch) => {
        return post(QueryCategoryList, params)
            .then((response) => {
                dispatch(queryCategoryList(response.Data.DataList));
            });
    }
};

export const getQueryIntertionalPartener = (params) => {
    return (dispatch) => {
        return post(QueryIntertionalPartener, params)
            .then((response) => {
                dispatch(queryIntertionalPartener(response.Data.Entity));
            });
    }
};