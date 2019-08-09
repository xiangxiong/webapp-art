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

export const getUrlParam = (paraName) => {
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
};

export const formatDate = (date, format) => {

    if (!format) format = "yyyy-MM-dd HH:mm:ss";

    date = new Date(parseInt(date));

    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "S": ("" + (date.getMilliseconds() + 1000)).substr(1),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };

    return format.replace(/(y+|M+|d+|H+|s+|m+|S)/g,

        function (a) {

            return dict[a];

        });

};