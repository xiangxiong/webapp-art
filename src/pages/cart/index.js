import React, {PureComponent, Fragment} from 'react';
import {Checkbox} from 'antd-mobile';
import './index.scss';

const AgreeItem = Checkbox.AgreeItem;

export default class Cart extends PureComponent {

    showGoods = (goods, index) => {
        return (
            <div key={index.toString()} className="art-cart__goods">
                <AgreeItem
                    data-seed="logId"
                    onChange={e => {
                    }}/>

                <div style={{}}/>

                <div>
                    <h4>新疆和田玉</h4>
                    <h4>20克 白色</h4>
                    <h4>￥35.00</h4>
                </div>

                <div>
                    <span>×1</span>
                    <div style={{}}/>
                </div>
            </div>
        );
    };

    showMerchant = (merchant, index) => {
        const {goodsList = ['11', '22']} = this.props;

        return (
            <div
                style={{borderTop: index > 0 ? '8px solid #F3F3F3' : ''}}
                className="art-cart__merchant"
                key={index.toString()}>

                <div className="art-cart__merchant-title">
                    <AgreeItem
                        data-seed="logId"
                        onChange={e => {
                        }}>
                        卖家：玉溪和田玉
                    </AgreeItem>
                    <span>
                        编辑
                    </span>
                </div>

                {goodsList.map((goods, index) => {
                    return this.showGoods(goods, index);
                })}

                <h4>
                    共2件商品 合计:￥98.00 (运费￥12.00)
                </h4>
            </div>
        )
    };

    render() {
        const {merchantList = ['1', '2']} = this.props;

        return (
            <div className="art-cart">
                <div className="art-cart__top">
                    <span>购物车</span>
                    <span>编辑</span>
                </div>

                <h4 className="art-cart__title">
                    <span>30天无忧退货</span>
                    <span>48小时快速退款</span>
                    <span>全场免邮费</span>
                </h4>

                {merchantList.map((merchant, index) => {
                    return this.showMerchant(merchant, index);
                })}

                <div className="art-cart__bottom">
                    <AgreeItem
                        data-seed="logId"
                        onChange={e => {
                        }}>
                        已选22
                    </AgreeItem>
                    <span>￥98.00</span>
                    <span>下单</span>
                </div>
            </div>
        )
    }
}