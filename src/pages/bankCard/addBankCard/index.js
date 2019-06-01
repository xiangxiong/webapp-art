import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {List, InputItem, Toast} from 'antd-mobile';
import _ from 'lodash';

const Item = List.Item;

class AddBankCard extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {}
    }

    onSubmit = () => {

    };

    render() {

        return (
            <Fragment>
                <PublicHeader jump="User" title="添加银行卡"/>
                <List>
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                        }}>
                        银行
                    </Item>
                    <InputItem
                        clear
                        moneyKeyboardAlign="left"
                        placeholder="请输入"
                        onChange={(v) => {
                        }}>
                        开户行网点名称
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                        }}>
                        开户行网点名称
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                        }}>
                        储蓄卡号
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                        }}>
                        开户行姓名
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                        }}>
                        开户行手机号
                    </InputItem>
                </List>

                <div className="art-addBankCard__bottom"
                     onClick={() => {
                         this.onSubmit()
                     }}>
                    <span>绑定</span>
                </div>

            </Fragment>
        )
    }
}

export default AddBankCard;
