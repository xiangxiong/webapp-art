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
    }

    getTabProduct = (order, index) => {
        const {ProviderName = '', OrderStatusName = '', Details = [], ProductCount = '', SOAmount = '', StatusValue = ''} = order;

        return (
            <div className="art-list__bussinss" key={index.toString()} onClick={() => history.push('./orderDetails')}>
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
                                    background: `url(${pictureUrl(ImageName)})`,
                                    marginRight: "3px",
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "contain"
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

                <div className="art-list__bussinss-operation">
                    {this.getOrderOperation(StatusValue)}
                </div>
            </div>
        )
    };


    //付款
    onPayment = () => {

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

    getOrderOperation = (StatusValue) => {
        switch (StatusValue) {
            case 0:
                return (
                    <div className="art-list__bussinss-operation-item" onClick={() => {
                        this.onPayment();
                    }}>
                        立即付款
                    </div>
                );
            case 1:
                return '';
            case 2:
                return (
                    <div className="art-list__bussinss-operation-item" onClick={() => {
                        this.confirmGoods();
                    }}>
                        确认收货
                    </div>
                );
            case 3:
                return (
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
        const {orderList = []} = this.props;

        return (
            <Fragment>
                <PublicHeader title="我的订单"/>

                <div className="art-list">
                    <Tabs tabs={orderTabs}
                          initialPage={1}
                          onChange={(tab, index) => {
                              this.props.getQueryCustomerOrderList(11, index - 1, 1);
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
        this.props.getQueryCustomerOrderList(11, -1, 1);
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
