import * as constants from './constants';
import {post} from "../../../utils/request";
import {CustomerDetail, CreateIntertionalPartener} from "../../../utils/servicekey";
import history from '@/utils/history';

export const userCarouselAdList = (DataList) => ({
    type: constants.USER_CUSTOMER_DETAIL,
    value: DataList
});

export const getCustomerDetail = (params) => {
    return (dispatch) => {
        return post(CustomerDetail, params)
            .then((response) => {
                dispatch(userCarouselAdList(response.Entity));
            });
    }
};

export const getCreateIntertionalPartener = (params) => {
    return (dispatch) => {
        return post(CreateIntertionalPartener, params)
            .then((response) => {
                if(response){
                    history.push('/pend');
                }
            });
    }
};
