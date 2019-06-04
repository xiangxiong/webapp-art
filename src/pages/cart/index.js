import React, {PureComponent, Fragment} from 'react';
import {Checkbox} from 'antd-mobile';
import './index.scss';
import {getQueryCarList, getModifyCart, getBatchDelCart} from './store/actionCreators';
import {connect} from 'react-redux';
import  {pictureUrl} from '../../utils/common';
import history from '../../utils/history';
import eventProxy from 'react-eventproxy';

const AgreeItem = Checkbox.AgreeItem;

class Cart extends PureComponent {

    showGoods = (goods, index) => {
        const {ProductName, ProductImg, SalesPrice, TransactionNumber} = goods;
        return (
            <div key={index.toString()} className="art-cart__goods">
                <AgreeItem
                    data-seed="logId"
                    onChange={e => {
                    }}/>
                <div style={{
                    background: `url(${pictureUrl(ProductImg)}) 0% 0% / cover`,
                }}/>
                <div>
                    <h4>{ProductName}</h4>
                    <h4>{`￥${SalesPrice}`}</h4>
                </div>
                <div>
                    <span>{`×${TransactionNumber}`}</span>
                   {/* <div style={{}}/>*/}
                </div>
            </div>
        );
    };

    showMerchant = (merchant, index) => {
        const {ProviderName, Products = []} = merchant;

        let count = 0, price = 0.00;

        Products.map((product, index) => {
            const {SalesPrice, TransactionNumber} = product;
            count += TransactionNumber;
            price += SalesPrice * TransactionNumber;
        });

        return (
            <div
                style={{borderTop: index > 0 ? '8px solid #F3F3F3' : ''}}
                className="art-cart__merchant"
                key={index.toString()}>

                <div className="art-cart__merchant-title">
                    <AgreeItem
                        data-seed="logId"
                        onChange={e => {
                        }}>
                        {`卖家：${ProviderName}`}
                    </AgreeItem>
                    <span>
                        编辑
                    </span>
                </div>

                {Products.map((product, index) => {
                    return this.showGoods(product, index);
                })}

                <h4>
                    {`共${count}件商品 合计:￥${price} (运费￥0.00)`}
                </h4>
            </div>
        )
    };

    settlement = () => {
        let productList = [];
        history.push('./submitorder', {productList});
    };

    state = {
        isShow:'hidden'
    }



    render() {
        const {carList = []} = this.props;

        return (
            <div className="art-cart">
                <div className="art-cart__top">
                    <span>购物车</span>
                    <span>编辑</span>
                </div>

                <h4 className="art-cart__title">
                    <span>30天无忧退货</span>
                    <span>48小时快速退款</span>
                    <span>全场免邮费</span>
                </h4>
                {carList.map((merchant, index) => {
                    return this.showMerchant(merchant, index);
                })}

                <div className="art-cart__bottom" style={{visibility:this.state.isShow}}>
                        <AgreeItem
                            data-seed="logId"
                            onChange={e => {
                            }}>
                            已选22
                        </AgreeItem>
                        <span>￥98.00</span>
                        <span
                            onClick={() => {
                                this.settlement();
                            }}>
                            结算
                        </span>
                </div>

            </div>
        )
    }

    componentDidMount() {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo') == null ? 0 : storage.get('userInfo').CustomerId;
        eventProxy.on("showcart",(object)=>{
            this.setState({
                isShow:object
            });
        });
        this.props.getQueryCarList({CustomerId, CurrentPage: 1, PageSize: 100});
    }
}


const mapStateToProps = ({cart}) => {
    return {
        carList: cart.carList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getQueryCarList: (params) => dispatch(getQueryCarList(params)),
        getModifyCart: (params) => dispatch(getModifyCart(params)),
        getBatchDelCart: (params) => dispatch(getBatchDelCart({params})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);