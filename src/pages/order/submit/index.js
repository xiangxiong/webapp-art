import React,{Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import { TextareaItem } from 'antd-mobile';
import Action from './../action';

function HandleSubmitOrder(){
    console.log('HandleSubmitOrder');
}

const SubmitOrder = ()=>{
    return (
        <Fragment>
             <PublicHeader title="订单详情" bgColor="#E87908"/>

             <div className="art-order-detail__adress">
                 <div>柳士勇</div>
                 <div>152****1363</div>
             </div>

             <div className="art-order-detail__location">
                 <div>
                     <span className="art-order-detail__location-default">默认</span>
                 </div>
                 <div>上海市浦东新区杨新路118号</div>
             </div>

             <div className="art-order-detail__bussinss">

                <div className="art-order-detail__bussinss-title">
                    <div className="art-order-detail__bussinss-title-name">黄焖鸡</div>
                    <div className="art-order-detail__bussinss-title-count">5件</div>
                </div>

                <div className="art-order-detail__bussinss-order">
                    <div className="art-order-detail__bussinss-order-img">
                            <div>
                            </div>
                    </div>
                    <div className="art-order-detail__bussinss-order-product">
                            <h3>
                                新疆和田玉
                            </h3>
                            <p>
                                20克 白色
                            </p>
                    </div>
                    <div className="art-order-detail__bussinss-order-price">
                        <span>
                        ￥0.0
                        </span>
                    </div>
                </div>

                <div className="art-order-detail__bussinss-title">
                    <div className="art-order-detail__bussinss-title-name">运费</div>
                    <div className="art-order-detail__bussinss-title-count">￥ 0.0 </div>
                </div>

                <div className="art-order-detail__bussinss-title">
                    <div className="art-order-detail__bussinss-title-name">实付款( 含运费):</div>
                    <div className="art-order-detail__bussinss-title-count" style={{color:'#F35576',fontSize:'36px',border:'none'}}>￥120.0 </div>
                </div>

             </div>

             <div className="art-order-detail__comment">
                    <TextareaItem
                        value="给卖家留言"
                        rows={5}
                    />
             </div>

              <Action text="提交订单" price="1234"/>
        </Fragment>
    )
}

export default SubmitOrder;