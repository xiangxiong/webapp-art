import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {List} from 'antd-mobile';
import {formatDate} from '../../../utils/common';

const Item = List.Item;

class WithdrawDetails extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {withdraw = {}} = this.props.location.state;
        const {Money, Status, OpretionTime} = withdraw;

        return (
            <Fragment>
                <PublicHeader title="提现详情"/>
                <div className="art-withdrawDetails__money">
                    <h4>提现金额</h4>
                    <h2>{`￥${-Money}`}</h2>
                </div>

                <List>
                    <Item extra={Status}>当前状态</Item>
                    <Item extra={formatDate(OpretionTime, 'MM月dd日 HH:mm')}>申请提现时间</Item>
                    {/* <Item extra={'E1234567895469'}>流水号</Item>*/}
                    {/*<Item extra={''}>提现</Item>*/}
                </List>

            </Fragment>
        )
    }

    componentDidMount() {
    }
}

export default WithdrawDetails;
