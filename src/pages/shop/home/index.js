import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getProviderInfo, dispatchMasterGetProduct, getCollectin} from '../store/actionCreators';
import  {pictureUrl} from '../../../utils/common';
import Product from './../../common/product';


class ShopHomePage extends PureComponent {

    showRecomandItem() {
        const {shopMasterGetProduct} = this.props;
        var items = [];
        if (shopMasterGetProduct.length <= 0) {
            return;
        }
        shopMasterGetProduct.map((shopMasterProduct, index) => {
            items.push(
                <Product {...shopMasterProduct} key={Math.random()}/>
            );
        });

        return items;
    }

    render() {
        const {ImageName, ProviderName, FansCount, CategoryName, ProductCount, WeekProductCount, TopicCount, IsCollect, ProviderCustomerId} = this.props.shopProviderInfo;

        return (
            <Fragment>
                <PublicHeader title="商户"/>

                <div className="art-shop-home">
                    <div className="art-shop-home__header">
                        <div className="art-shop-home__header-top">
                            <div>
                                <img className="art-shop-home__header-top-img"
                                     src={pictureUrl(ImageName)}/>
                            </div>
                            <div>
                                <h3 className="art-shop-home__header-top-h3">{ProviderName}</h3>
                                <p className="art-shop-home__header-top-fans">{`粉丝：${FansCount}`}</p>
                                <p className="art-shop-home__header-top-category">{`主营品类：${CategoryName}`}</p>
                            </div>
                            <div onClick={() => {
                                const {ProviderId = ''} = this.props.location.state;
                                let storage = Storage.Base.getInstance();
                                let CustomerId = storage.get('userInfo').CustomerId;
                                let Token = storage.get('userInfo').Token;
                                this.props.getCollectin({
                                    CustomerId,
                                    Token,
                                    CollectType: 4,
                                    ObjId: ProviderCustomerId,
                                    ProviderId
                                });
                            }}>
                                <span className="art-shop-home__header-like">{IsCollect == 0 ? '+关注' : '已关注'}</span>
                            </div>
                        </div>
                        <div className="art-shop-home__header-bottom">
                            <div>
                                <p>{ProductCount}</p>
                                <p>商品</p>
                            </div>
                            <div>
                                <p>{WeekProductCount}</p>
                                <p>上新</p>
                            </div>
                            <div>
                                <p>{TopicCount}</p>
                                <p>实测</p>
                            </div>
                        </div>
                    </div>

                    <div className="art-shop-home__space">

                    </div>

                    <div className="art-shop-home__recommend">
                        <div className="art-shop-home__recommend-content">
                            {this.showRecomandItem()}
                        </div>
                    </div>

                </div>

            </Fragment>
        )
    }

    componentDidMount() {
        const {ProviderId = ''} = this.props.location.state;
        console.log('location', this.props.location);
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        this.props.getProviderInfo({CustomerId, ProviderId});
        this.props.dispatchMasterGetProduct({CustomerId, ProviderId, SaleType: 10, CurrentPage: 1, PageSize: 10});
    }
}

const mapStateToProps = ({shop}) => {
    return {
        shopProviderInfo: shop.shopProviderInfo,
        shopMasterGetProduct: shop.shopMasterGetProduct,
    }
};

const mapDispatchToProps = dispatch => ({
    getCollectin: (params) => dispatch(getCollectin(params)),
    getProviderInfo: (params) => dispatch(getProviderInfo(params)),
    dispatchMasterGetProduct: (params) => dispatch(dispatchMasterGetProduct(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopHomePage);