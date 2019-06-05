import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import PublicHeader from './../../../components/header';
import {Checkbox} from 'antd-mobile';
import {connect} from 'react-redux';
import {getDesposits} from '../store/actionCreators';
import {getAccountList} from '../../bankCard/store/actionCreators';

const AgreeItem = Checkbox.AgreeItem;

class BankList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selecteId: -1,
        }
    }

    showBankItem = (bank, index) => {
        let {Id, BankName, TailNo} = bank;
        return (
            <div key={index.toString()} className="art-bankList__item">
                <div/>

                <div>
                    <h4>{BankName}</h4>
                    <h5>{`********${TailNo}`}</h5>
                </div>

                <AgreeItem
                    checked={Id == this.state.selecteId}
                    data-seed="logId"
                    onChange={e => {
                        this.setState({selecteId: Id})
                    }}>
                </AgreeItem>
            </div>
        );
    };

    nextStep = () => {
        const {withdrawMoney} = this.props.location.state;

        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        let Token = storage.get('userInfo').Token;

        let BankId = this.state.selecteId;
        let Money = withdrawMoney;

        this.props.getDesposits(CustomerId, Token, BankId, Money);
    };

    render() {
        const {bankCardList = []} = this.props;

        return (
            <Fragment>
                <PublicHeader jump="User" title="选择银行卡方式"/>

                <div className="art-bankList">
                    {bankCardList.map((bank, index) => {
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
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        let Token = storage.get('userInfo').Token;

        this.props.getAccountList(CustomerId, Token);
    }
}

const mapStateToProps = ({bank}) => {
    return {
        bankCardList: bank.bankCardList,
    }
};

const mapDispatchToProps = dispatch => ({
    getDesposits: (CustomerId, Token, BankId, Money) => {
        dispatch(getDesposits({Token, CustomerId, BankId, Money}))
    },

    getAccountList: (CustomerId, Token) => {
        dispatch(getAccountList({CustomerId, Token}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BankList);
