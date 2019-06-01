import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {List, InputItem, Toast} from 'antd-mobile';
import _ from 'lodash';
import {connect} from 'react-redux';
import {getCardAdd} from '../store/actionCreators';

const Item = List.Item;

class AddBankCard extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            BankPersonName: '', //持卡人名称
            BankName: '',       //开户行名称
            BankInfo: '',       //省市名称+开户行名称
            BankAccount: '',    //卡号
            CardType: '',       //卡类型 1：储蓄卡 2：信用卡
        }
    }

    onSubmit = () => {
        const {BankPersonName, BankName, BankInfo, BankAccount, CardType} = this.state;

        if (_.isEmpty(BankPersonName)) {
            Toast.info('请填写持卡人名称', 1);
            return;
        }
        if (_.isEmpty(BankName)) {
            Toast.info('请填写开户行名称', 1);
            return;
        }
        if (_.isEmpty(BankInfo)) {
            Toast.info('请填写省市名称和开户行名称', 1);
            return;
        }
        if (_.isEmpty(BankAccount)) {
            Toast.info('请填写卡号', 1);
            return;
        }
        if (_.isEmpty(CardType)) {
            Toast.info('请选择卡类型', 1);
            return;
        }

        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        let Token = storage.get('userInfo').Token;

        let params = {};
        params.CustomerId = CustomerId;
        params.Token = Token;

        params.BankPersonName = BankPersonName;
        params.BankName = BankName;
        params.BankInfo = BankInfo;
        params.BankAccount = BankAccount;
        params.CardType = CardType;

        this.props.getCardAdd(params);
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
                            this.setState({BankName: v});
                        }}>
                        开户行网点名称
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                            this.setState({BankAccount: v});
                        }}>
                        储蓄卡号
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                            this.setState({BankPersonName: v});
                        }}>
                        开户行姓名
                    </InputItem>

                    <InputItem
                        clear
                        placeholder="请输入"
                        onChange={(v) => {
                            this.setState({ShippingAddress: v});
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

const mapStateToProps = ({bank}) => {
    return {
        bankCardList: bank.bankCardList,
    }
};

const mapDispatchToProps = dispatch => ({
    getCardAdd: (params) => {
        dispatch(getCardAdd(params))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBankCard);
