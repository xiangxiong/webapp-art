import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import PublicHeader from './../../../components/header';
import {Checkbox} from 'antd-mobile';
const AgreeItem = Checkbox.AgreeItem;

class BankLlist extends PureComponent {

    constructor(props) {
        super(props);
    }

    showBankItem = (bank, index) => {
        const {} = bank;
        return (
            <div key={index.toString()} className="art-bankList__item">
                <div style={{
                    //background: `url(${''}) 0% 0% / cover`,
                }}/>

                <div>
                    <h4>招商银行</h4>
                    <h5>4324******4355</h5>
                </div>

                <AgreeItem
                    checked={false}
                    data-seed="logId"
                    onChange={e => {
                    }}>
                </AgreeItem>
            </div>
        );
    };

    nextStep = () => {
        history.push('./');
    };

    render() {
        const {bankList = ['1']} = this.props;

        return (
            <Fragment>
                <PublicHeader jump="User" title="选择银行卡方式"/>

                <div className="art-bankList">
                    {bankList.map((bank, index) => {
                        return this.showBankItem(bank, index);
                    })}
                </div>

                <div className="art-bankList__bottom"
                     onClick={() => {
                         this.nextStep();
                     }}>
                    <span>提现</span>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
    }
}

export default BankLlist;
