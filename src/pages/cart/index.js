import React,{PureComponent,Fragment} from 'react';
import { List, InputItem } from 'antd-mobile';
import './index.scss';

export default class Cart extends PureComponent{
    render(){
        return (
            <div>
                购物车
                <InputItem
            type='money'
            defaultValue={100}
            placeholder="start from left"
            clear
            moneyKeyboardAlign="left"
            >光标在左</InputItem>
            </div>
        )
    }
}