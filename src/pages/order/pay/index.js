import React,{Fragment} from 'react';
import PublicHeader from './../../../components/header';
import Action from './../action';
import './index.scss';

const PayOrder = (props) =>{
    return (
        <Fragment>
             <PublicHeader title="收银台" bgColor="#E87908"/>
             <div className="art-order-pay__message">
                 <div className="art-icon art-icon-wechat"></div>
                 <div>微信支付</div>
             </div>
             <Action text="付款" price="1234"/>
        </Fragment>
    )
}

export default PayOrder;