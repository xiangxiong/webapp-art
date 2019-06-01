import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {List} from 'antd-mobile';

const Item = List.Item;

class WithdrawDetails extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <PublicHeader title="提现详情"/>
                <div className="art-withdrawDetails__money">
                    <h4>提现金额</h4>
                    <h2>￥500.00</h2>
                </div>

                <List>
                    <Item extra={'提现已到账'}>当前状态</Item>
                    <Item extra={'提现方式'}>申请提现时间</Item>
                    <Item extra={'E1234567895469'}>流水号</Item>
                    <Item extra={'微信'}>提现方式</Item>
                </List>

            </Fragment>
        )
    }

    componentDidMount() {
    }
}

export default WithdrawDetails;
