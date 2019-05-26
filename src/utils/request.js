import axios from 'axios';
import {APIURL} from './api';

// todo: 增加请求拦截器.
// https://segmentfault.com/a/1190000016474460#articleHeader4.

// todo: APIURL 需要发生变化.

const testRequest = function (params,APIURL){
    
    return new Promise((resolve, reject) => {
        axios({
            method:'post',
            url: APIURL,
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            timeout: 3000
        }).then(response =>{
            if (response.status === 200) {
                if (response.data && response.data.code === 200) {
                    resolve(response.data.DataObject)
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

const request = function (servicekey, jsonobjparam, method){
    let params = {
        ParamList: [
            {
                servicekey,
                jsonobjparam: JSON.stringify(jsonobjparam)
            }
        ]
    };

    return new Promise((resolve, reject) => {
        axios({
            method,
            url: APIURL,
            data: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            timeout: 20000
        }).then(response =>{
            if (response.status === 200) {
                if (response.data && response.data.code === 200) {
                    resolve(response.data.DataObject)
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

export {post, get,testRequest}

  