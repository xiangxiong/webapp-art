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