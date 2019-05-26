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
        const {OrderAmount = 0, SONumber = 0, OrderNumber = 0,ProviderId = 0} = this.props.location.state;

        let storage = Storage.Base.getInstance(),
            token = storage.get("userInfo").Token,
            openId = storage.get("oauthInfo").OpenId;

        let data = encodeURIComponent(`${token}|${OrderAmount}|${openId}|${SONumber}|${OrderNumber}|${ProviderId}`);

        console.log('token',token);
        console.log('OrderAmount',OrderAmount);
        console.log('openId',openId);
        console.log('SONumber',SONumber);
        console.log('OrderNumber',OrderNumber);
        console.log('ProviderId',ProviderId);
        console.log('data',data);

        var payType = 1;

        if(SONumber > 0 ||  OrderNumber>0){
            payType = 1;
        }

        if(ProviderId>0){
            payType = 2;
        }

        const result = await this.props.handleWechatPay(data,payType);
        
        console.log('result.data.Data',result.data.Data);

        if(result.status === 200 && result.data.Data) {
            window.WeChatPay.Base.getInstance().WeChatPay(result.data.Data,this.HandlePayCallBack);
        }
        else {
            Toast.info("发起支付异常!");
        }
    }

    HandlePayCallBack(res){
         if(res.err_msg === "get_brand_wcpay_request:ok" ){
            Toast.success('支付成功');
            history.push('/success');
         }
         else{
            Toast.success('支付已取消!');
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
        handleWechatPay: (data,payType) =>  dispatch(getPayParams({PayType: payType, PayMethod:'WeChatJs',data}))
    }
};

export default connect(null, mapDispatchToProps)(PayOrder);
