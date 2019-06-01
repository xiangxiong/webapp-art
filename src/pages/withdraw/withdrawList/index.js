import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import PublicHeader from './../../../components/header';

class WithdrawList extends PureComponent {

    constructor(props) {
        super(props);
    }

    showWithdrawItem = (withdraw, index) => {
        const {} = withdraw;
        return (
            <div key={index.toString()} className="art-withdrawList__item">
                <h2>2016年9月</h2>

                <div className="art-withdrawList__item-content">
                    <div style={{
                        //background: `url(${''}) 0% 0% / cover`,
                    }}/>

                    <div>
                        <div>
                            <h4>提现-到支付宝</h4>
                            <h5>500.00</h5>
                        </div>

                        <div>
                            <h4>09月10日 11:45</h4>
                            <h5>流水号：w2568412592412</h5>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {withdrawList = ['1']} = this.props;

        return (
            <Fragment>
                <PublicHeader title="提现明细"/>

                <div className="art-withdrawList">
                    {withdrawList.map((withdraw, index) => {
                        return this.showWithdrawItem(withdraw, index);
                    })}
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
    }
}

export default WithdrawList;
