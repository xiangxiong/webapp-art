import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getDespositsRecord} from '../store/actionCreators';

class WithdrawList extends PureComponent {

    constructor(props) {
        super(props);

        this.PageIndex = 1;
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
        const {recordList = ['1']} = this.props;

        return (
            <Fragment>
                <PublicHeader title="提现明细"/>

                <div className="art-withdrawList">
                    {recordList.map((withdraw, index) => {
                        return this.showWithdrawItem(withdraw, index);
                    })}
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        let Token = storage.get('userInfo').Token;

        this.props.getDespositsRecord(Token, CustomerId, this.PageIndex);
    }
}

const mapStateToProps = ({withdraw}) => {
    return {
        recordList: withdraw.recordList,
    }
};

const mapDispatchToProps = dispatch => ({
    getDespositsRecord: (Token, CustomerId, PageIndex, PageSize = 10) => {
        dispatch(getDespositsRecord({Token, CustomerId, PageIndex, PageSize}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(WithdrawList);
