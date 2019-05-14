import axios from 'axios';
import {CHANGE_LIST} from './contants';
import {APIURL} from '../../../utils/api';
import {post} from '../../../utils/request';

const changeList = (list)=> ({
    type:CHANGE_LIST,
    list
});

export const getHomeList = () => {
    return (dispatch) => {
          return post('http://yapi.demo.qunar.com/mock/65279/api/v1/product/owner')
          .then((response)=>{
                console.log('response',response);
                dispatch(changeList(response));
          });
    }
}