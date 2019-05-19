import React,{Fragment} from 'react';
import {Badge} from 'antd-mobile';
import './index.scss';

const OrderItem = () =>{
    return (
        <Fragment>
              <div className="art-user__order">
                            <h3> 我的订单 </h3>
                            <div className="art-icon art-icon-order-arrow"></div>
                        </div>
                        <div className="art-user__order-list">
                            <div>
                                <div className="art-icon art-icon-order-wait"></div>
                                <p>待付款</p>
                                <Badge text={'3'}></Badge> 
                            </div>
                            <div>
                            <div className="art-icon art-icon-order-deliver"></div>
                                <p>待发货</p>
                                <Badge text={'3'}></Badge> 
                            </div>
                            <div>
                                <div className="art-icon art-icon-order-recevier"></div>
                                <p>待收货</p>
                            </div>
                            <div>
                            <div className="art-icon art-icon-order-comment"></div>
                                <p>待评价</p>
                            </div>
                            <div>
                            <div className="art-icon art-icon-order-return"></div>
                                <p>退货/售后</p>
                            </div>
                        </div>
                       
        </Fragment>
    )
}

export default OrderItem;