import React, {PureComponent, Fragment} from 'react';
import PublicHeader from './../../../components/header';
import Action from './../action';
import './index.scss';
import {connect} from 'react-redux';
import {getWebSite} from '../store/actionCreators';

class PayOrder extends PureComponent {

    render() {
        const {OrderAmount = 0, SONumber = 0} = this.props.location.state;

        return (
            <Fragment>
                <PublicHeader title="收银台" bgColor="#E87908"/>
                <div className="art-order-pay__message">
                    <div className="art-icon art-icon-wechat"></div>
                    <div>微信支付</div>
                </div>
                <Action text="付款" price="1234" HandleSubmitOrder={() => {
                    let Token = '2390648179516024';
                    let OpenId = 'wxd78e408c5668f65f';

                    let Data = encodeURI(`${Token}|${OrderAmount}|${OpenId}|${SONumber}|${0}|${0}`);
                    this.props.getWebSite(Data);
                }}/>
            </Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    getWebSite: (Data) => {
        dispatch(getWebSite({PayType: 1, Data}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(PayOrder);
