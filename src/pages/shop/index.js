import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../home/store/actionCreators';
import {getProductCommend} from './store/actionCreators';
import PublicHeader from './../../components/header';
import SearchCategory from  './search/index';
import CarouselBanner from '../common/carousel';
import Advert from './../common/advert';
import Letters from '../common/letters/index';
import Space from '../common/space';
import Cloumn from '../common/column';
import Product from './../common/product';
import Title from './../common/title';

class Shop extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {shopCarouselAdList, shopCommonAdList, shopNewsPagerList, shopProductCommendList, shopUserLikeProducts} = this.props;

        return (
            <Fragment>
                <div className="art-shop">
                    <PublicHeader title="艺商城" bgColor="#E87908" icon="none"/>
                    <SearchCategory/>
                    <CarouselBanner/>
                    <Letters data={null}/>
                    <Advert commonAdList={null}/>
                    <Space/>
                    <Cloumn data={null}/>
                    <div className="art-shop__hot">
                        <Title title="热销作品" more="更多"/>
                        <div className="art-shop__hot-content">
                            <Product/>
                            <Product/>
                            <Product/>
                            <Product/>
                        </div>
                    </div>
                    <div className="art-shop__border"></div>
                    <div className="art-shop__hot">
                        <Title title="猜你喜欢" more="更多"/>
                        <div className="art-shop__hot-content">
                            <Product/>
                            <Product/>
                            <Product/>
                            <Product/>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getShopAdvertList(2);
        this.props.getShopNewsPagerList();
        this.props.getShopAdvertList(21);
        this.props.getProductCommend();
        this.props.getUserLikeProducts(11, 1);
    }
}

const mapStateToProps = ({shop}) => {
    return {
        shopCarouselAdList: shop.shopCarouselAdList,
        shopCommonAdList: shop.shopCommonAdList,
        shopNewsPagerList: shop.shopNewsPagerList,
        shopProductCommendList: shop.shopProductCommendList,
        shopUserLikeProducts: shop.shopUserLikeProducts,
    }
};

const mapDispatchToProps = dispatch => ({
    getShopAdvertList: (type) => {
        dispatch(getAdvertList(type))
    },

    getShopNewsPagerList: () => {
        dispatch(getNewsPagerList({CategoryId: 4, CurrentPage: 1, PageSize: 3}))
    },

    getProductCommend: () => {
        dispatch(getProductCommend({CategoryId: 4, CurrentPage: 1, PageSize: 3}))
    },

    getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 10) => {
        dispatch(getUserLikeProducts({CustomerId, Position: 2, CurrentPage, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

