import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import history from './../../../utils/history';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getDespositsRecord} from '../store/actionCreators';
import {formatDate} from '../../../utils/common';

class WithdrawList extends PureComponent {

    constructor(props) {
        super(props);

        this.PageIndex = 1;
    }

    showWithdrawItem = (withdraw, index) => {
        const {Money, OpretionTime} = withdraw;
        return (
            <div key={index.toString()} className="art-withdrawList__item" onClick={() => {
                history.push('./withdrawDetails', {withdraw});
            }}>
                {/* <h2></h2>*/}

                <div className="art-withdrawList__item-content"
                     style={{borderTop: index > 0 ? "10px solid #f3f3f3" : ""}}>
                    <div/>

                    <div>
                        <div>
                            <h4>提现</h4>
                            <h5>{`￥${-Money}`}</h5>
                        </div>

                        <div>
                            <h4>{formatDate(OpretionTime, 'MM月dd日 HH:mm')}</h4>
                            {/* <h5>流水号：w2568412592412</h5>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {recordList = []} = this.props;

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
