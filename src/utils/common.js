/**
 * Created by huhaibin on 2019/5/17.
 */

import {SERVICEPICTUREURL} from './api'

export const pictureUrl = (url) => {
    if (!url) {
        return ''
    }
    if (url.startsWith('http') || url.startsWith('https')) {
        return url;
    } else {
        return SERVICEPICTUREURL + url
    }
};

export const getUrlParam =(paraName) => {
　　　　var url = document.location.toString();
　　　　var arrObj = url.split("?");

　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;
　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");
　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
}