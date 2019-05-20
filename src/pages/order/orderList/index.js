import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getQueryCustomerOrderList} from '../store/actionCreators';

class OrderList extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const {orderList = []} = this.props;

        return (
            <Fragment>
                <PublicHeader title="我的订单"/>

            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getQueryCustomerOrderList('124', 1, 50);
    }
}

const mapStateToProps = ({order}) => {
    return {
        orderList: order.orderList,
    }
};

const mapDispatchToProps = dispatch => ({
    getQueryCustomerOrderList: (CustomerId, ProviderId, OrderStatus, CurrentPage, PageSize = 10) => {
        dispatch(getQueryCustomerOrderList({CustomerId, ProviderId, OrderStatus, CurrentPage, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
