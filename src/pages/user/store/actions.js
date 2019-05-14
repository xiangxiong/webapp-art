import axios from 'axios';
import {CHANGE_LIST} from './contants';
import {APIURL} from './../../../api';

const changeList = (list)=> ({
    type:CHANGE_LIST,
    list
});

export const getHomeList = () => {
    return (dispatch) => {
       return axios.get('http://yapi.demo.qunar.com/mock/65279/api/v1/product/owner')
        .then((response)=>{
            console.log('response',response);
            const list = response.data.content;
            dispatch(changeList(list))
        })
    }
}