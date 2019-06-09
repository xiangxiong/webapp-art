import * as constants from './constants';
import {post} from "../../../utils/request";
import {
    CustomerDetail,
    CreateIntertionalPartener,
    Dict,
    QueryCategoryList,
    QueryIntertionalPartener,
    PUBLISH_PRODUCT_API,
    PUBLISH_USER_TYPE,
    GET_MERCHANT_PRODUCT_LIST,
    DIC_ITEM_API,
    VIDEO_UPLOADER_API,
    SHOP_STORE_OFFLINE_API,
    GET_WECHAT_OAUTH_API,
    BIND_WECHAT_USERNAME,
    UPDATE_PARTENER_DEPOSIT,
    CUSTOMER_UPDATE,
    ART_MASTER_DETAIL_API,
} from "../../../utils/servicekey";
import history from '../../../utils/history';
import {Toast} from 'antd-mobile';

export const setWork = (Data) => ({
    type: constants.USER_SET_WORK,
    value: Data
});

export const masterDetail = (DataList) => ({
    type: constants.USER_MASTERDETAIL,
    value: DataList
});

export const queryDictList = (DataList) => ({
    type: constants.USER_MODIFY_DICT_LIST,
    value: DataList
});

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
export const publishProduct = (response) => ({
    type: constants.USER_WORKS_ADD,
    value: response
});
export const publishProductType = (response) => ({
    type: constants.USER_WORKS_PRODUCT_TYPE,
    value: response
});

// 作品库
export const getUserWorkAction = (response) => ({
    type: constants.USER_WORKS_LIST,
    value: response
});

export const getUserWorkActionDispatch = (params) => {
    return (dispatch) => {
        return post(GET_MERCHANT_PRODUCT_LIST, params)
            .then((response) => {
                dispatch(getUserWorkAction(response.Data.DataList))
            });
    }
};

// 商品下架

const getDicItemAction = (response) => ({
    type: constants.USER_DIC_ITEM,
    value: response
});

export const getDicItem = (params) => {
    return (dispatch) => {
        return post(DIC_ITEM_API, params)
            .then((response) => {
                dispatch(getDicItemAction(response.Data.DataList));
            })
    }
};

export const getCustomerDetail = (params) => {
    return (dispatch) => {
        return post(CustomerDetail, params)
            .then((response) => {
                dispatch(userCustomerDetail(response.Data.Entity));
            });
    }
};

//  上传视频
const getVideoActionFile = (response) => ({
    type: constants.USER_UPLOAD_VIDEO,
    value: response
});

export const getUploadVideoFile = (params) => {
    return (dispatch) => {
        return post(VIDEO_UPLOADER_API, params)
            .then((response) => {
                dispatch(getVideoActionFile(response.Data))
            })
    }
};

export const getCreateIntertionalPartener = (params) => {
    return (dispatch) => {
        return post(CreateIntertionalPartener, params)
            .then((response) => {
                if (response && response.Data && response.Data.Data) {
                    history.push('./pend');
                } else {
                    Toast.info('网络异常');
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

export const getUpdatePartenerDeposit = (params) => {
    return (dispatch) => {
        return post(UPDATE_PARTENER_DEPOSIT, params)
            .then((response) => {
                if (response && response.Status == 200) {
                    let storage = Storage.Base.getInstance();
                    let Token = storage.get('userInfo').Token;
                    let CustomerId = storage.get('userInfo').CustomerId;
                    dispatch(getQueryIntertionalPartener({Token, CustomerId}));
                } else {
                    Toast.info('网络异常');
                }
            });
    }
};

export const createProduct = (params) => {
    return async (dispatch) => {
        const result = await post(PUBLISH_PRODUCT_API, params);
        return result.Data;
    }
};

export const getProductType = (params) => {
    return async (dispatch) => {
        const result = await post(PUBLISH_USER_TYPE, params);
        return result.Data.DataList;
    }
};

// 商品库下架
export const offLineProduct = (params) => {
    return async (dispatch) => {
        const result = await post(SHOP_STORE_OFFLINE_API, params);
        return result.Data.DataList;
    }
};

export const getWeChatOauth = (params) => {
    return async (dispatch) => {
        const result = await post(GET_WECHAT_OAUTH_API, params);
        console.log('getWeChatOauth result',result);
        return result.Data.DataList;
    }
};

// 绑定微信用户信息
export const bindWeChatOauth = (params) => {
    return async (dispatch) => {
        const result = await post(BIND_WECHAT_USERNAME, params);
        return result.Data.DataList;
    }
};

export const getCustomerUpdate = (params) => {
    return (dispatch) => {
        return post(CUSTOMER_UPDATE, params)
            .then((response) => {
                if (response && response.Status == 200) {
                    history.push('/home?tab=User');
                } else {
                    Toast.info('网络异常');
                }
            });
    }
};

export const getDictList = (params) => {
    return (dispatch) => {
        return post(Dict, params)
            .then((response) => {
                if (response && response.Data && response.Data.DataList && response.Data.DataList.AuthorType) {
                    dispatch(queryDictList(response.Data.DataList.AuthorType));
                }
            });
    }
};

export const dispatchMasterDetail = (params) => {
    return (dispatch) => {
        return post(ART_MASTER_DETAIL_API, params)
            .then((response) => {
                if (response && response.Data) {
                    dispatch(masterDetail(response.Data));
                }
            });
    }
};