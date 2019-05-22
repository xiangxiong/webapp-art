import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getGetOrderDetail, getPOrderInfo} from '../store/actionCreators';

class OrderDetails extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        //const {} = this.props.orderDetail;

        return (
            <Fragment>
                <PublicHeader title="订单详情"/>

            </Fragment>
        )
    }

    componentDidMount() {
        const {SONumber} = this.props.location.state;
        this.props.getGetOrderDetail('2390648179516024','', SONumber, 11);
    }
}

const mapStateToProps = ({order}) => {
    return {
        orderDetail: order.orderDetail,
        pPOrderInfo: order.pPOrderInfo,
    }
};

const mapDispatchToProps = dispatch => ({
    getGetOrderDetail: (token, ProviderId, OrderNumber, CustomerId) => {
        dispatch(getGetOrderDetail({token, ProviderId, OrderNumber, CustomerId}))
    },

    getPOrderInfo: (token, SONumber) => {
        dispatch(getPOrderInfo({token, SONumber}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);
