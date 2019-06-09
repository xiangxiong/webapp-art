import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../components/header';
import {List} from 'antd-mobile';
import history from './../../utils/history';
const Item = List.Item;

export default class Agreement extends PureComponent {

    constructor(props) {
        super(props);
    }

    onJump = (htmlFilePath, title) => {
        history.push('./htmlViewer', {htmlFilePath, title});
    };

    render() {
        const {CustomerType = ''} = this.props.location.state || {};

        let enterText = '';
        if (CustomerType == 1) {
            //艺术家
            enterText = '艺术家入驻合作协议';
        } else if (CustomerType == 2) {
            // 商家
            enterText = '艺商城入驻合作协议'
        }

        return (
            <Fragment>
                <PublicHeader jump="User" title="协议规则"/>

                <List>
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', enterText);
                        }}>
                        {enterText}
                    </Item>

                    <Item>
                        常见问题
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '用户使用协议');
                        }}>
                        用户使用协议
                    </Item>

                    <Item>
                        常见售后问题
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '签收注意事项');
                        }}>
                        签收注意事项
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '商品出现损坏');
                        }}>
                        商品出现损坏
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '收到的作品有瑕疵或损坏，能否办理退换货？');
                        }}>
                        收到的作品有瑕疵或损坏，能否办理退换货？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '收到货后是否需要确认收货？');
                        }}>
                        收到货后是否需要确认收货？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '售后退换货时效？');
                        }}>
                        售后退换货时效？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '退换货处理标准');
                        }}>
                        退换货处理标准
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '退换货邮费问题');
                        }}>
                        退换货邮费问题
                    </Item>

                    <Item>
                        新手指引(我是买家)
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '买家下单流程');
                        }}>
                        买家下单流程
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '如何查看物流信息？');
                        }}>
                        如何查看物流信息？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '商品寄回给卖家了，如何退款？');
                        }}>
                        商品寄回给卖家了，如何退款？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '收到的货品货不对板怎么办？');
                        }}>
                        收到的货品货不对板怎么办？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '下单后什么时候发货呢？');
                        }}>
                        下单后什么时候发货呢？
                    </Item>

                    <Item>
                        新手指引(我是卖家)
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '担保期是多久？延长担保期是多久？');
                        }}>
                        担保期是多久？延长担保期是多久？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '买家收到货品后不点击“确认收货”怎么办？');
                        }}>
                        买家收到货品后不点击“确认收货”怎么办？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '卖家违规管理办法');
                        }}>
                        卖家违规管理办法
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '如何查看订单数量？');
                        }}>
                        如何查看订单数量？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '如何联系买家提供物流信息？');
                        }}>
                        如何联系买家提供物流信息？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '如何入驻？');
                        }}>
                        如何入驻？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '如何提现？');
                        }}>
                        如何提现？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '什么是诚信契约保障金？');
                        }}>
                        什么是诚信契约保障金？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '什么是担保支付？');
                        }}>
                        什么是担保支付？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '收到用户退货商品，如何为其退款？');
                        }}>
                        收到用户退货商品，如何为其退款？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '提现次数和金额有无限制？');
                        }}>
                        提现次数和金额有无限制？
                    </Item>

                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.onJump('', '用户付完款 卖家如何拿到这笔货款？');
                        }}>
                        用户付完款 卖家如何拿到这笔货款？
                    </Item>

                </List>
            </Fragment>
        )
    }
}
