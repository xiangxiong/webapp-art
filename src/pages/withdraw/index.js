import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../utils/history';
import PublicHeader from './../../components/header';
import {InputItem} from 'antd-mobile';

class Withdraw extends PureComponent {

    constructor(props) {
        super(props);
    }

    nextStep = () => {
        history.push('./');
    };

    render() {

        return (
            <Fragment>
                <PublicHeader jump="User" title="提现"/>

                <div className="art-withdraw__maximum">
                    <h2>￥228</h2>
                    <h3>可提现余额，最低提现额度1元</h3>
                </div>

                <div className="art-withdraw__import">
                    <InputItem
                        type="number"
                        placeholder="请输入提现金额"
                        ref={el => this.inputRef = el}
                        onVirtualKeyboardConfirm={v => console.log('onVirtualKeyboardConfirm:', v)}
                        clear
                    />

                </div>

                <div className="art-withdraw__bottom"
                     onClick={() => {
                         this.nextStep();
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
