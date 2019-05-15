import axios from 'axios';
import {APIURL} from './api';

// todo: 增加请求拦截器.
// https://segmentfault.com/a/1190000016474460#articleHeader4.

const request = function (servicekey, jsonobjparam, method) {

    let params = {
        ParamList: [
            {
                servicekey,
                jsonobjparam
            }
        ]
    };

    return new Promise((resolve, reject) => {
        axios({
            method,
            url: APIURL,
            data: params,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            timeout: 3000
        }).then(response => {
            console.log('servicekey ', servicekey, 'params ', params, ' response ', response);
            if (response.status === 200) {
                if (response.data && response.data.code === 200) {
                    resolve(response.data.data)
                }
            }
        }, err => {
            if (err.Cancel) {
                console.log(err)
            } else {
                reject(err)
            }
        }).catch(err => {
            reject(err)
        })
    })
};

const post = (servicekey, params) => {
    return request(servicekey, params, 'post')
};

const get = (servicekey, params) => {
    return request(servicekey, params, 'get')
};

export {post, get}

  