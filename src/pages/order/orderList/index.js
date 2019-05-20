import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getQueryCustomerOrderList} from '../store/actionCreators';
import {Tabs} from 'antd-mobile';
import Space from '../../common/space';

const orderTabs = [
    {title: '全部'},
    {title: '待付款'},
    {title: '待发货'},
    {title: '已发货'},
    {title: '待评价'},
];

const styles = {};
styles.tab = {
    backgroundColor: '#fff',
    height: "800px",
};

class OrderList extends PureComponent {

    constructor(props) {
        super(props);
    }

    getTabProduct = (order) => {
        const {} = order;

        return (
            <div className="art-list__bussinss">
                <Space/>

                <div className="art-list__bussinss-title">
                    <div className="art-list__bussinss-title-name">{'硕嘉贸易'}</div>
                    <div className="art-list__bussinss-title-count">{'卖家已付款'}</div>
                </div>

                <div className="art-list__bussinss-order">
                    <div className="art-list__bussinss-order-img">
                        <div style={{
                            background: '#E87908',
                            marginRight: "3px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain"
                        }}>
                        </div>
                    </div>
                    <div className="art-list__bussinss-order-product">
                        <h3>
                            {'新疆和田玉'}
                        </h3>
                    </div>
                    <div className="art-list__bussinss-order-price">
                        <span>
                            {`￥298.0`}
                        </span>
                        <span>
                            {`×5`}
                        </span>
                    </div>
                </div>

                <div className="art-list__bussinss-total">
                    <span>共2件商品 合计:￥98.00(运费￥12.00)</span>
                </div>

                <div className="art-list__bussinss-operation">
                    {this.getOrderOperation()}
                </div>
            </div>
        )
    };


    getOrderOperation = () => {
        return (
            <div className="art-list__bussinss-operation-item">
                取消订单
            </div>
        )
    };


    render() {
        const {orderList = []} = this.props;

        return (
            <Fragment>
                <PublicHeader title="我的订单"/>

                <div className="art-list">
                    <Tabs tabs={orderTabs}
                          initialPage={1}>

                        <div style={styles.tab}>
                            {orderList.map((order, index) => {
                                return this.getTabProduct(order, index)
                            })}
                        </div>

                        <div style={styles.tab}>
                            {orderList.map((order, index) => {
                                return this.getTabProduct(order, index)
                            })}
                        </div>

                        <div style={styles.tab}>
                            {orderList.map((order, index) => {
                                return this.getTabProduct(order, index)
                            })}
                        </div>

                        <div style={styles.tab}>
                            {orderList.map((order, index) => {
                                return this.getTabProduct(order, index)
                            })}
                        </div>

                        <div style={styles.tab}>
                            {orderList.map((order, index) => {
                                return this.getTabProduct(order, index)
                            })}
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
