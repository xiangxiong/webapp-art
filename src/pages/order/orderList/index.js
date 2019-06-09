import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getQueryCustomerOrderList} from '../store/actionCreators';
import {Tabs} from 'antd-mobile';
import Space from '../../common/space';
import  {pictureUrl} from '../../../utils/common';
import ArtListView from '../../../components/artListView';
import history from './../../../utils/history';

const orderTabs = [
    {title: '全部'},
    {title: '待付款'},
    {title: '待发货'},
    {title: '已发货'},
    {title: '待评价'},
];

class OrderList extends PureComponent {
    constructor(props) {
        super(props);
        this.CurrentPage = 1;
    }

    getTabProduct = (order, index) => {
        const {type} = this.props.location.state;
        const {ProviderName = '', OrderStatusName = '', Details = [], ProductCount = '', SOAmount = '', OrderStatus = '', SONumber, OrderNumber} = order;

        return (
            <div className="art-list__bussinss" key={index.toString()}
                 onClick={() => {
                     if (type === 'sell') {
                         //卖家
                         history.push('./orderSellDetails', {SONumber, OrderNumber})
                     } else {
                         //买家
                         history.push('./orderDetails', {SONumber, OrderNumber})
                     }
                 }}>
                <Space/>

                <div className="art-list__bussinss-title">
                    <div className="art-list__bussinss-title-name">{ProviderName}</div>
                    <div className="art-list__bussinss-title-count">{OrderStatusName}</div>
                </div>

                {Details.map((detail, index) => {
                    const {ImageName = '', ProductName = '', LastPrice = '', Quantity = ''} = detail;
                    return (
                        <div className="art-list__bussinss-order" key={index.toString()}>
                            <div className="art-list__bussinss-order-img">
                                <div style={{
                                    background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`,
                                    marginRight: "3px",
                                }}>
                                </div>
                            </div>
                            <div className="art-list__bussinss-order-product">
                                <h3>
                                    {ProductName}
                                </h3>
                            </div>
                            <div className="art-list__bussinss-order-price">
                        <span>
                            {`￥${LastPrice}`}
                        </span>
                                <span>
                            {`×${Quantity}`}
                        </span>
                            </div>
                        </div>
                    )
                })}

                {SOAmount > 0 ? (<div className="art-list__bussinss-total">
                    <span>{ `共${ProductCount}件商品 合计:￥${SOAmount}`}</span>
                </div>) : null}

                {this.getOrderOperation(order)}
            </div>
        )
    };


    //付款
    onPayment = (order) => {
        let {SOAmount, SONumber, OrderNumber} = order;
        history.push('./payorder', {OrderAmount: SOAmount, SONumber, OrderNumber});
    };

    //确认收货
    confirmGoods = () => {

    };

    //评价
    evaluation = (order) => {
        history.push('./orderEvaluation', {order});
    };

    //申请退货
    returnGoods = (order) => {
        history.push('./orderReturnGoods', {order});
    };

    //立即发货
    onDelivery = (order) => {
        history.push('./orderDelivery', {order});
    };

    getOrderOperation = (order) => {
        const {OrderStatus} = order;

        const {type} = this.props.location.state;

        switch (OrderStatus) {
            case 5:
                if (type !== 'sell') {
                    return (
                        <div className="art-list__bussinss-operation">
                            <div className="art-list__bussinss-operation-item" onClick={(e) => {
                                e.stopPropagation();
                                this.onPayment(order);
                            }}>
                                立即付款
                            </div>
                        </div>
                    );
                }

                break;
            case 20:
                if (type === 'sell') {
                    return (
                        <div className="art-list__bussinss-operation">
                            <div className="art-list__bussinss-operation-item" onClick={(e) => {
                                e.stopPropagation();
                                this.onDelivery(order);
                            }}>
                                立即发货
                            </div>
                        </div>
                    );
                }
                break;
            // case 100:
            //     return (
            //         <div className="art-list__bussinss-operation">
            //             <div className="art-list__bussinss-operation-item" onClick={() => {
            //                 this.confirmGoods();
            //             }}>
            //                 确认收货
            //             </div>
            //         </div>
            //     );
            case 300:
            case 200:
                if (type !== 'sell') {
                    return (
                        <div className="art-list__bussinss-operation">
                            <div style={{display: 'flex', dipflexDirection: 'row'}}>
                                <div style={{marginRight: '10px'}} className="art-list__bussinss-operation-item"
                                     onClick={(e) => {
                                         e.stopPropagation();
                                         this.evaluation(order);
                                     }}>
                                    评价
                                </div>
                                {/*<div className="art-list__bussinss-operation-item" onClick={() => {
                                 this.returnGoods(order);
                                 }}>
                                 申请退货
                                 </div>*/}
                            </div>
                        </div>
                    )
                }
                break;
        }
    };


    showOrderList = (orderList) => {
        return (
            <ArtListView
                data={orderList}
                renderRow={this.getTabProduct}
            />
        );
    };

    render() {
        const {index = 0} = this.props.location.state;
        const {orderList = []} = this.props;

        return (
            <Fragment>
                <PublicHeader jump="User" title="我的订单"/>

                <div className="art-list">
                    <Tabs tabs={orderTabs}
                          initialPage={index}
                          onChange={(tab, index) => {
                              let storage = Storage.Base.getInstance();
                              let CustomerId = storage.get('userInfo').CustomerId;
                              this.props.getQueryCustomerOrderList(CustomerId, (index - 1), this.CurrentPage);
                          }}>

                        <div>
                            {this.showOrderList(orderList)}
                        </div>

                        <div>
                            {this.showOrderList(orderList)}
                        </div>

                        <div>
                            {this.showOrderList(orderList)}
                        </div>

                        <div>
                            {this.showOrderList(orderList)}
                        </div>

                        <div>
                            {this.showOrderList(orderList)}
                        </div>
                    </Tabs>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {index = -1, type} = this.props.location.state;
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;

        let ObjectItem = this.props.customerDetail.ProviderInfo || {};

        if (type === 'sell') {
            //卖家
            this.props.getQueryCustomerOrderList(0, (index - 1), this.CurrentPage, ObjectItem.ProviderId);
        } else {
            //买家
            this.props.getQueryCustomerOrderList(CustomerId, (index - 1), this.CurrentPage, 0);
        }
    }
}

const mapStateToProps = ({order, user}) => {
    return {
        customerDetail: user.customerDetail,
        orderList: order.orderList,
    }
};

const mapDispatchToProps = dispatch => ({
    getQueryCustomerOrderList: (CustomerId, OrderStatus, CurrentPage, ProviderId, PageSize = 10) => {
        dispatch(getQueryCustomerOrderList({CustomerId, OrderStatus, CurrentPage, ProviderId, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
