import React,{Fragment} from 'react';
import {Badge} from 'antd-mobile';
import './index.scss';
import history from '../../../../utils/history';

function handleOrderClick(index){
     history.push('/orderList',{index,type:'buy'});
}


const OrderItem = (props) =>{

    const {AwaitPayCount, AwaitShipCount, AwaitReceiptCount, AwaitCommentCount} = props;

    return (
        <Fragment>
              <div className="art-user__order" onClick={handleOrderClick.bind(null,0)}>
                            <h3> 我的订单 </h3>
                            <div className="art-icon art-icon-order-arrow"></div>
                        </div>
                        <div className="art-user__order-list">
                            <div onClick={handleOrderClick.bind(null,1)}>
                                <div className="art-icon art-icon-order-wait"></div>
                                <p>待付款</p>
                                <Badge text={AwaitPayCount > 0 ? AwaitPayCount : ''}></Badge>
                            </div>
                            <div onClick={handleOrderClick.bind(null,2)}>
                                <div className="art-icon art-icon-order-deliver"></div>
                                    <p>待发货</p>
                                    <Badge text={AwaitShipCount > 0 ? AwaitShipCount : ''}></Badge>
                                </div>
                                <div onClick={handleOrderClick.bind(null,3)}>
                                <div className="art-icon art-icon-order-recevier order-recevier"></div>
                                <p className="order-recevier-label">已发货</p>
                                <Badge text={AwaitReceiptCount > 0 ? AwaitReceiptCount : ''}></Badge>
                            </div>
                            <div onClick={handleOrderClick.bind(null,4)}>
                            <div className="art-icon art-icon-order-comment"></div>
                                <p>待评价</p>
                                <Badge text={AwaitCommentCount > 0 ? AwaitCommentCount : ''}></Badge>
                            </div>
                        </div>

        </Fragment>
    )
}

export default OrderItem;