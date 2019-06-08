import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getProviderInfo} from '../store/actionCreators';
import  {pictureUrl} from '../../../utils/common';

class ShopHomePage extends PureComponent {

    render() {
        const {ImageName, ProviderName, FansCount, CategoryName, ProductCount, WeekProductCount, TopicCount} = this.props.shopProviderInfo;

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
                            <div>
                                <span className="art-shop-home__header-like">+关注</span>
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
                </div>

            </Fragment>
        )
    }

    componentDidMount() {
        const {ProviderId = ''} = this.props.location.state;
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        this.props.getProviderInfo({CustomerId, ProviderId});
    }
}

const mapStateToProps = ({shop}) => {
    return {
        shopProviderInfo: shop.shopProviderInfo,
    }
};

const mapDispatchToProps = dispatch => ({
    getProviderInfo: (params) => dispatch(getProviderInfo(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopHomePage);