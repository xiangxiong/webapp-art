import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getGetOrderDetail, getPOrderInfo} from '../store/actionCreators';
import Space from '../../common/space';
import  {pictureUrl} from '../../../utils/common';
import {formatDate} from '../../../utils/common';
import {PICTUREURL} from '../../../utils/api';

class OrderSellDetails extends PureComponent {

    constructor(props) {
        super(props);
    }

    showAddress = () => {
        let {ShippingContactWith = '', ShippingPhone = '', ShippingAddress = ''} = this.props.orderDetail;

        return (
            <div className="art-sellDetails__address">
                <span>{`联系人：${ShippingContactWith}`}</span>
                <span>{`联系电话：${ShippingPhone}`}</span>
                <span>{`联系地址：${ShippingAddress}`}</span>
            </div>
        )
    };


    showProduct = () => {
        let {Details = []} = this.props.orderDetail;

        return Details.map((detail, index) => {
            let {ProductName, Quantity, ImageName, LastPrice} = detail;

            return (
                <div className="art-sellDetails__product" key={index.toString()}>

                    <div className="art-sellDetails__product-order">
                        <div className="art-sellDetails__product-order-img">
                            <div style={{
                                background: `url('${pictureUrl(ImageName)}') 0% 0% / cover`,
                                marginRight: "3px",
                            }}>
                            </div>
                        </div>
                        <div className="art-sellDetails__product-order-product">
                            <h3>
                                {ProductName}
                            </h3>
                        </div>
                        <div className="art-sellDetails__product-order-price">
                            <span>{`￥${LastPrice}`}</span>
                            <span>{`${Quantity}件`}</span>
                        </div>
                    </div>
                </div>
            )
        });
    };

    render() {
        const {SOAmount = '', OrderNumber = '', UnixSODate = '', StatusName = '', Details = []} = this.props.orderDetail;

        let promotionList = Details.filter(detail => {
            return detail.PromotionId != 0;
        });

        return (
            <Fragment>
                <PublicHeader title="客户订单详情"/>
                <div
                    style={{
                        height: '10px',
                        width: '100%',
                        background: `url(${PICTUREURL + 'fengexian.png'}) 0% 0% / cover`,
                    }}/>
                <div className="art-sellDetails">
                    {this.showAddress({})}
                    <Space/>
                    {this.showProduct()}
                    <Space/>
                    <div className="art-sellDetails__product">
                        <div className="art-sellDetails__product-title">
                            <div className="art-sellDetails__product-title-name">订单优惠</div>
                            <div className="art-sellDetails__product-title-count">无</div>
                        </div>

                        <div className="art-sellDetails__product-title">
                            <div className="art-sellDetails__product-title-name">实付款( 含运费):</div>
                            <div className="art-sellDetails__product-title-count"
                                 style={{color: '#F35576', fontSize: '36px', border: 'none'}}>{`￥${SOAmount}`}
                            </div>
                        </div>
                    </div>

                    <Space/>

                    {/*<div className="art-details__operation">
                     <div className="art-details__operation-service">
                     <span>联系客服</span>
                     </div>

                     <div className="art-details__operation-phone">
                     <span>联系电话</span>
                     </div>
                     </div>

                     <Space/>*/}

                    <div className="art-sellDetails__describe">
                        <p>{`订单编号：${OrderNumber}`}</p>
                        <p>{`下单时间：${formatDate(UnixSODate)}`}</p>
                        <p>{`订单状态：${StatusName}`}</p>
                        <p>{`成交类型：${promotionList.length > 0 ? '团购订单' : '普通订单'}`}</p>
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {OrderNumber = ''} = this.props.location.state;
        let storage = Storage.Base.getInstance();
        let Token = storage.get('userInfo').Token;

        let ObjectItem = this.props.customerDetail.ProviderInfo || {};

        //卖家
        this.props.getGetOrderDetail(Token, ObjectItem.ProviderId, OrderNumber, '0');
    }
}

const mapStateToProps = ({order, user}) => {
    return {
        orderDetail: order.orderDetail,
        pPOrderInfo: order.pPOrderInfo,
        customerDetail: user.customerDetail,
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderSellDetails);
