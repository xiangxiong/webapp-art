import * as constants from './constants';
import {post} from "../../../utils/request";
import {CustomerDetail} from "../../../utils/servicekey";

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

