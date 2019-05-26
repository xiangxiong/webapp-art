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
        const {ProviderName = '', OrderStatusName = '', Details = [], ProductCount = '', SOAmount = '', OrderStatus = '', SONumber, OrderNumber} = order;

        return (
            <div className="art-list__bussinss" key={index.toString()}
                 onClick={() => history.push('./orderDetails', {SONumber, OrderNumber})}>
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

                <div className="art-list__bussinss-total">
                    <span>{`共${ProductCount}件商品 合计:￥${SOAmount}(运费￥0)`}</span>
                </div>

                {this.getOrderOperation(order)}
            </div>
        )
    };


    //付款
    onPayment = (order) => {
        let {OrderAmount, SONumber} = order;
        history.push('./payorder', {OrderAmount, SONumber});
    };

    //确认收货
    confirmGoods = () => {

    };

    //评价
    evaluation = () => {

    };

    //申请退货
    returnGoods = () => {
    };

    getOrderOperation = (order) => {
        const {OrderStatus} = order;

        switch (OrderStatus) {
            case 5:
                return (
                    <div className="art-list__bussinss-operation">
                        <div className="art-list__bussinss-operation-item" onClick={() => {
                            this.onPayment(order);
                        }}>
                            立即付款
                        </div>
                    </div>
                );
            case 100:
                return (
                    <div className="art-list__bussinss-operation">
                        <div className="art-list__bussinss-operation-item" onClick={() => {
                            this.confirmGoods();
                        }}>
                            确认收货
                        </div>
                    </div>
                );
            case 300:
            case 200:
                return (
                    <div className="art-list__bussinss-operation">
                        <div style={{display: 'flex', dipflexDirection: 'row'}}>
                            <div style={{marginRight: '10px'}} className="art-list__bussinss-operation-item"
                                 onClick={() => {
                                     this.evaluation();
                                 }}>
                                评价
                            </div>
                            <div className="art-list__bussinss-operation-item" onClick={() => {
                                this.returnGoods();
                            }}>
                                申请退货
                            </div>
                        </div>
                    </div>
                )
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
                <PublicHeader title="我的订单"/>

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
        const {index = -1} = this.props.location.state;
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;

        this.props.getQueryCustomerOrderList(CustomerId, (index - 1), this.CurrentPage);
    }
}

const mapStateToProps = ({order}) => {
    return {
        orderList: order.orderList,
    }
};

const mapDispatchToProps = dispatch => ({
    getQueryCustomerOrderList: (CustomerId, OrderStatus, CurrentPage, ProviderId, PageSize = 10) => {
        dispatch(getQueryCustomerOrderList({CustomerId, OrderStatus, CurrentPage, ProviderId, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
