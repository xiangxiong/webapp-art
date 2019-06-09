import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {TextareaItem, Toast} from 'antd-mobile';
import Action from './../action';
import {connect} from 'react-redux';
import {getCreateOrder, getDefaultAddress, defaultAddress} from '../store/actionCreators';
import  {pictureUrl} from '../../../utils/common';
import history from '../../../utils/history';
import _ from 'lodash';
import Space from '../../common/space';

class SubmitOrder extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            UsrMemo: ''
        };
        this.init();
    }

    init(){
        let storage = Storage.Base.getInstance();
        let userInfo = storage.get('userInfo');

        if(userInfo == null ){
             history.push('./oauth');
        }
        else if(userInfo.Register === false){
            history.push('./bind');
        }
    }

    HandleSubmitOrder = () => {
        let storage = Storage.Base.getInstance();
        let customerId = storage.get('userInfo').CustomerId;
        
        const {UsrMemo = ''} = this.state;
        let {productList = []} = this.props.location.state;

        let OrderItems = [];
        productList.map((product)=>{
            const {ProdId, KillPrice, productNumber = 1,PromotionId = 0} = product;
            let OrderItem = {ProdId, UnitPrice: KillPrice, PromotionId: PromotionId, Quantity: productNumber, CartId: '0'};
            OrderItems.push(OrderItem);
        });

        const {AddressId = ''} = this.props.defaultAddress;

        if (_.isEmpty(this.props.defaultAddress)) {
            Toast.info('请选择收获地址', 1);
            return;
        }

        this.props.getCreateOrder(customerId, OrderItems, 0, UsrMemo, AddressId);
    };

    setAddress = (address) => {
        if (address) {
            this.props.setDefaultAddress(address);
        }
    };

    showAddress = () => {
        if (!_.isEmpty(this.props.defaultAddress)) {
            const {ShippingContactWith = '', ShippingPhone = '', ShippingAddress = ''} = this.props.defaultAddress;
            return (
                <div style={{display: 'flex', alignItems: 'center', background: '#FFFFFF'}} onClick={() => {
                    history.push({
                        pathname: './addressList', callback: this.setAddress
                    });
                }}>
                    <div style={{flex: 1}}>
                        <div className="art-order-detail__adress">
                            <div>{ShippingContactWith}</div>
                            <div>{ShippingPhone}</div>
                        </div>

                        <div className="art-order-detail__location">
                            <div>
                            </div>
                            <div>{ShippingAddress}</div>
                        </div>
                    </div>
                    <div className="art-icon art-icon-arrow art-order-detail__arrow">
                    </div>
                </div>
            )
        } else {
            return (
                <div className="art-order-detail__noAdress" onClick={() => {
                    history.push({
                        pathname: './addressList', callback: this.setAddress
                    });
                }}>
                    <span>请选择收获地址</span>
                    <div className="art-icon art-icon-arrow-noAdress art-order-detail__arrow">
                    </div>
                </div>
            )
        }
    };

    render() {
        let {productList = []} = this.props.location.state;
        let money = 0;
        productList.map((product) => {
            console.log('submit order',product);
            const {KillPrice, productNumber = 1} = product;
            money += KillPrice * productNumber;
        });

        return (
            <Fragment>
                <PublicHeader title="确认订单" bgColor="#E87908"/>

                {this.showAddress()}

                <Space/>
                {productList.map((product, index) => {
                    const {ProviderName, Name, KillPrice, productNumber = 1, MainImgs = []} = product;
                    return (
                        <div className="art-order-detail__bussinss" key={index.toString()}>

                            <div className="art-order-detail__bussinss-title">
                                <div className="art-order-detail__bussinss-title-name">{ProviderName}</div>
                                <div className="art-order-detail__bussinss-title-count">{`${productNumber}件`}</div>
                            </div>

                            <div className="art-order-detail__bussinss-order">
                                <div className="art-order-detail__bussinss-order-img">
                                    <div style={{
                                        background: `url(${MainImgs.length > 0 ? pictureUrl(MainImgs[0]) : ''}) 0% 0% / cover`,
                                        marginRight: "3px",
                                    }}>
                                    </div>
                                </div>
                                <div className="art-order-detail__bussinss-order-product">
                                    <h3>
                                        {Name}
                                    </h3>
                                </div>
                                <div className="art-order-detail__bussinss-order-price">
                        <span>
                            {`￥${KillPrice}`}
                        </span>
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="art-order-detail__bussinss">
                    <div className="art-order-detail__bussinss-title">
                        <div className="art-order-detail__bussinss-title-name">运费</div>
                        <div className="art-order-detail__bussinss-title-count">￥ 0.0</div>
                    </div>

                    <div className="art-order-detail__bussinss-title">
                        <div className="art-order-detail__bussinss-title-name">实付款( 含运费):</div>
                        <div className="art-order-detail__bussinss-title-count"
                             style={{color: '#F35576', border: 'none'}}>{`￥${money}`}
                        </div>
                    </div>
                </div>

                <div className="art-order-detail__comment">
                    <TextareaItem
                        placeholder="给卖家留言"
                        rows={5}
                        onChange={(v) => {
                            this.setState({UsrMemo: v})
                        }}
                    />
                </div>
                <Action text="提交订单" price={money} HandleSubmitOrder={() => {
                    this.HandleSubmitOrder()
                }}/>
            </Fragment>
        )
    }

    componentDidMount() {
        let storage = Storage.Base.getInstance();
        let userInfo = storage.get('userInfo');

        if(userInfo == null ){
             history.push('./oauth');
        }
        else if(userInfo.Register === false){
            history.push('./bind');
        }
        else{
            this.props.getDefaultAddress(userInfo.CustomerId);
        }
    }
}

const mapStateToProps = ({order}) => {
    return {
        defaultAddress: order.defaultAddress,
    }
};

const mapDispatchToProps = dispatch => ({
    getDefaultAddress: (CustomerId) => {
        dispatch(getDefaultAddress({CustomerId, PageIndex: 1, PageSize: 50}))
    },
    getCreateOrder: (CustomerId, OrderItems, ShippingFee, UsrMemo, AddrerssId) => {
        dispatch(getCreateOrder({CustomerId, OrderItems, ShippingFee, UsrMemo, AddrerssId}))
    },
    setDefaultAddress: (addressObj) => {
        dispatch(defaultAddress(addressObj))
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(SubmitOrder);