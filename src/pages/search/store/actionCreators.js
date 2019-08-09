import * as constants from './constants';
import {post} from "../../../utils/request";
import {Search_All} from "../../../utils/servicekey";

export const searchAll = (DataList) => ({
    type: constants.SEARCH_SEARCH_ALL,
    value: DataList
});

export const getSearchAll = (params) => {
    return (dispatch) => {
        return post(Search_All, params)
            .then((response) => {
                dispatch(searchAll(response.Data.ProductDataList));
            });
    }
};