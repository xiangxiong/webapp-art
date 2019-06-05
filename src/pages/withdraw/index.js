import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../utils/history';
import PublicHeader from './../../components/header';
import {InputItem} from 'antd-mobile';
import {Toast} from 'antd-mobile';
import _ from 'lodash';

class Withdraw extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            withdrawMoney: 0,
        }
    }

    nextStep = (Money) => {
        const {withdrawMoney} = this.state;

        if (_.isEmpty(withdrawMoney)) {
            Toast.info('请输入提现额度');
            return;
        }

        if (withdrawMoney < 10) {
            Toast.info('最低提现额度10元');
            return;
        }

        if (withdrawMoney > Money) {
            Toast.info(`超过最高额度${Money}`);
            return;
        }
        history.push('./bankList', {withdrawMoney});
    };

    render() {

        const {customerDetail = {}} = this.props.location.state;

        return (
            <Fragment>
                <PublicHeader
                    jump="User" title="提现"
                    rightContent={
                        <div onClick={() => {
                            history.push('./WithdrawList');
                        }}>
                            提现明细</div>}/>

                <div className="art-withdraw__maximum">
                    <h2>{`￥${customerDetail.Money}`}</h2>
                    <h3>可提现余额，最低提现额度10元</h3>
                </div>

                <div className="art-withdraw__import">
                    <InputItem
                        type="number"
                        placeholder="请输入提现金额"
                        ref={el => this.inputRef = el}
                        onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                        clear
                        onChange={(v) => {
                            this.setState({withdrawMoney: v})
                        }}
                    />

                </div>

                <div className="art-withdraw__bottom"
                     onClick={() => {
                         this.nextStep(customerDetail.Money);
                     }}>
                    <span>下一步</span>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
    }
}

export default Withdraw;
