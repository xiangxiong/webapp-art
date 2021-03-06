import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header'
import history from './../../../utils/history';
import {connect} from 'react-redux';
import {getAccountList, getCardDelete} from '../store/actionCreators';

class BankCardList extends PureComponent {

    constructor(props) {
        super(props);
    }

    goAddBankCard = () => {
        history.push('./addBankCard');
    };

    showBankCardItem = (bankCard, index) => {
        let {Id, BankName, TailNo} = bankCard;

        return (
            <div className="art-bankCardList__item" key={index.toString()}
                 style={{borderTop: index > 0 ? '9px solid #F3F3F3' : ''}}>
                <div>

                </div>

                <div>
                    <h2>{BankName}</h2>
                    <h4>{`********${TailNo}`}</h4>
                </div>

                <span
                    onClick={() => {
                        let storage = Storage.Base.getInstance();
                        let CustomerId = storage.get('userInfo').CustomerId;
                        this.props.getCardDelete(Id, CustomerId);
                    }}>解绑</span>
            </div>
        )
    };

    render() {
        const {bankCardList = []} = this.props;

        return (
            <Fragment>
                <PublicHeader jump="User" title="我的银行卡"/>

                <div className="art-bankCardList">
                    {bankCardList.map((bankCard, index) => {
                        return this.showBankCardItem(bankCard, index);
                    })}
                </div>

                <div className="art-bankCardList__bottom"
                     onClick={() => {
                         this.goAddBankCard();
                     }}>
                    <div className="art-icon art-icon-bankCard-add"></div>
                    <span>添加银行卡</span>
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
    getAccountList: (CustomerId, Token) => {
        dispatch(getAccountList({CustomerId, Token}))
    },

    getCardDelete: (Id, CustomerId) => {
        dispatch(getCardDelete({Id, CustomerId}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BankCardList);
