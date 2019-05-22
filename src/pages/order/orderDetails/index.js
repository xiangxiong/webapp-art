import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getGetOrderDetail, getPOrderInfo} from '../store/actionCreators';
import Space from '../../common/space';

class OrderDetails extends PureComponent {

    constructor(props) {
        super(props);
    }

    showAddress = (address = {}) => {
        let {ShippingContactWith = '', ShippingPhone = '', ShippingAddress = '', IsDefault = ''} = address;

        return (
            <div className="art-details__address">
                <div className="art-details__address___left">
                    <div >
                        <span>{'柳士勇'}</span>
                        <span>{'152****1363'}</span>
                    </div>

                    <div>
                        <div/>
                        <span>{'上海市浦东新区杨新路118号'}</span>
                    </div>
                </div>
            </div>
        )
    };


    showProduct = () => {
        return (
            <div className="art-details__product">

                <div className="art-details__product-title">
                    <div className="art-details__product-title-name">{'卖家：硕嘉贸易'}</div>
                    <div className="art-details__product-title-count">{'共212件'}</div>
                </div>

                <div className="art-details__product-order">
                    <div className="art-details__product-order-img">
                        <div style={{
                            background: `url('')`,
                            marginRight: "3px",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain"
                        }}>
                        </div>
                    </div>
                    <div className="art-details__product-order-product">
                        <h3>
                            {'新疆和田玉'}
                        </h3>
                    </div>
                    <div className="art-details__product-order-price">
                        <span>
                            {'￥0.0'}
                        </span>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        //const {} = this.props.orderDetail;

        return (
            <Fragment>
                <PublicHeader title="订单详情"/>
                <div className="art-details">
                    {this.showAddress({})}
                    <Space/>
                    {this.showProduct()}

                    <div className="art-details__product">
                        <div className="art-details__product-title">
                            <div className="art-details__product-title-name">订单优惠</div>
                            <div className="art-details__product-title-count">无</div>
                        </div>

                        <div className="art-details__product-title">
                            <div className="art-details__product-title-name">实付款( 含运费):</div>
                            <div className="art-details__product-title-count"
                                 style={{color: '#F35576', fontSize: '36px', border: 'none'}}>{`￥${1111}`}
                            </div>
                        </div>
                    </div>

                    <Space/>

                    <div className="art-details__operation">
                        <div className="art-details__operation-service">
                            <span>联系客服</span>
                        </div>

                        <div className="art-details__operation-phone">
                            <span>联系电话</span>
                        </div>
                    </div>

                    <Space/>

                    <div className="art-details__describe">
                        <p>订单编号：2229619780632758</p>
                        <p>下单时间：2017-02-02 20:59:40</p>
                        <p>订单状态：运输中</p>
                        <p>成交类型：普</p>
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        //const {SONumber = ''} = this.props.location.state;

        let SONumber = '';
        this.props.getGetOrderDetail('2390648179516024', '', SONumber, 11);
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
