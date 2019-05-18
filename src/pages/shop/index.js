import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import Column from '../common/column/index';
import ProductionItem from '../home/production/index';
import {Carousel} from 'antd-mobile';
import {connect} from 'react-redux';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../home/store/actionCreators';
import {getProductCommend} from './store/actionCreators';
import {PICTUREURL} from "../../utils/api";
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

        this.state = {
            salesProductionList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                },
            ],

            likeProductionList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',

                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                    authorName: '宇翔老者',
                    authorHead: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                },
            ],
        };
    }

    render() {
        const {salesProductionList, likeProductionList} = this.state;
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
             
{/*                
                <div className="art-shop__header">
                    <div>
                        <img src={`${PICTUREURL}51.png`}/>
                        <span>大家都在搜紫砂壶</span>
                    </div>
                    
                    <div>
                        <img src={`${PICTUREURL}50.png`}/>
                        <span>分类</span>
                    </div>
                </div>

                <div className="art-shop__carousel">
                    <Carousel
                        autoplay={false}
                        infinite
                    >
                        {shopCarouselAdList.map((shopCarouselAd, index) => (
                            <a
                                key={index.toString()}
                                href={shopCarouselAd.SkipUrl}
                                style={{
                                    display: 'inline-block',
                                    width: '375px',
                                    height: '148px',
                                }}
                            >
                                <img
                                    src={shopCarouselAd.ImgUrl}
                                    style={{width: '375px', height: '148px'}}
                                />
                            </a>
                        ))}
                    </Carousel>
                </div>

                <div className="art-shop__special">
                    <Letters data={shopNewsPagerList}/>
                </div>

                <div className="art-shop__recomand">
                    {shopCommonAdList && shopCommonAdList.length > 0 ? <img src={shopCommonAdList[0].ImgUrl}/> : null}
                </div>

                <div className="art-shop__interval"/>

                <div className="art-shop__column">
                    <Column leftPictureUrl={`${PICTUREURL}30.png`} rightPictureUrl={`${PICTUREURL}31.png`}/>
                </div>

                <div className="art-shop__recommendTitle">
                    <h3>热销作品</h3>
                    <span>更多</span>
                </div>

                <div className="art-shop__recommend">
                    <div className="art-shop__recommend___left" style={{marginRight: '5px'}}>
                        <ProductionItem {...shopUserLikeProducts[0]}/>


                    </div>

                    <div className="art-shop__recommend___right">
                    </div>
                </div>

                <div className="art-shop__recommendTitle">
                    <h3>为你推荐</h3>
                    <span>更多</span>
                </div>

                <div className="art-shop__recommend">
                    <div className="art-shop__recommend___content">
                        {salesProductionList.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                </div>)
                        })}
                    </div>
                </div>
            */}
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

