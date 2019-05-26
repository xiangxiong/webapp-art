import {
    USER_CUSTOMER_DETAIL,
    USER_DICT_LIST,
    USER_QUERY_CATEGORY_LIST,
    USER_QUERY_INTERTIONAL_PARTENER,
    USER_WORKS_ADD,
    USER_WORKS_PRODUCT_TYPE,
    USER_WORKS_LIST,
    USER_DIC_ITEM,
    USER_UPLOAD_VIDEO
} from './constants';

const defaultState = {
    customerDetail: {},
    userCategoryList: [],
    userDictList: [],
    userIntertionalPartener: {},
    publishReponse:{},
    userProductTypes:[],
    workList:[],
    userDicItem:[],
    fileItem:[]
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case USER_CUSTOMER_DETAIL:
            return {
                ...state,
                customerDetail: action.value
            };
        case USER_DICT_LIST:
            return {
                ...state,
                userDictList: action.value
            };
        case USER_DIC_ITEM:
            return {
                ...state,
                userDicItem:action.value
            };
        case USER_QUERY_CATEGORY_LIST:
            return {
                ...state,
                userCategoryList: action.value
            };
        case USER_QUERY_INTERTIONAL_PARTENER:
            return {
                ...state,
                userIntertionalPartener: action.value
            };
        case USER_WORKS_ADD:
            return {
                ...state,
                publishReponse:action.value
            }
        case USER_WORKS_PRODUCT_TYPE:
            return {
                ...state,
                userProductTypes:action.value
            }
        case USER_WORKS_LIST:
            console.log('action.value',action.value);
            return {
                ...state,
                workList:action.value
            }
        case USER_UPLOAD_VIDEO:
            return {
                ...state,
                fileItem:action.value
            }
        default:
            return state;
    }
}