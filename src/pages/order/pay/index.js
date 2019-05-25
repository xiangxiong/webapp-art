import React, {PureComponent, Fragment} from 'react';
import PublicHeader from './../../../components/header';
import Action from './../action';
import './index.scss';
import {connect} from 'react-redux';
import {getPayParams} from '../store/actionCreators';
import {Toast} from 'antd-mobile';
import history from './../../../utils/history';

class PayOrder extends PureComponent {

    async handlePayOrder(){
        const {OrderAmount = 0, SONumber = 0} = this.props.location.state;

        let storage = Storage.Base.getInstance(),
            openId = storage.get("oauthInfo").OpenId,
            token = storage.get("userInfo").Token;

        let data = encodeURI(`${token}|${OrderAmount}|${openId}|${SONumber}|${0}|${0}`);
        const result = await this.props.handleWechatPay(data);
        
        console.log('result.data.Data',result.data.Data);

        if(result.status === 200 && result.data.Data) {
            window.WeChatPay.Base.getInstance().WeChatPay(result.data.Data,this.HandlePayCallBack);
        }
        else {
            Toast.info("网络异常");
        }
    }

    HandlePayCallBack(res){
         if(res.err_msg === "get_brand_wcpay_request:ok" ){
            Toast.success('支付成功');
            history.push('/success');
         }
         else{
            Toast.success('网络异常');
         }
    }

    render() {
        const {OrderAmount = 0.00} = this.props.location.state;
        return (
            <Fragment>
                <PublicHeader title="收银台" bgColor="#E87908"/>
                <div className="art-order-pay__message">
                    <div className="art-icon art-icon-wechat"></div>
                    <div>微信支付</div>
                </div>
                <Action text="付款" price={OrderAmount} HandleSubmitOrder={() => {
                    this.handlePayOrder()
                }}/>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleWechatPay: (data) =>  dispatch(getPayParams({PayType: 'PayOrder', PayMethod:'WeChatJs',data}))
    }
};

export default connect(null, mapDispatchToProps)(PayOrder);
