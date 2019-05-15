import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import Letters from '../home/letters/index';
import Column from '../home/column/index';
import ProductionItem from '../home/production/index';
import {Carousel, WingBlank} from 'antd-mobile';
import {connect} from 'react-redux';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../home/store/actionCreators';
import {getProductCommend} from './store/actionCreators';
import {PICTUREURL} from "../../utils/api";

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

            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
        };
    }

    render() {
        const {columnList, salesProductionList, likeProductionList} = this.state;

        console.log("porps", this.props);

        return (
            <Fragment>
                <div className="art-shop__header">
                    <div></div>

                    <div>
                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                        <span>分类</span>

                    </div>
                </div>

                <div className="art-shop__carousel">
                    <WingBlank>
                        <Carousel
                            autoplay={false}
                            infinite
                            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                            afterChange={index => console.log('slide to', index)}
                        >
                            {this.state.data.map(val => (
                                <a
                                    key={val}
                                    href="http://www.alipay.com"
                                    style={{
                                        display: 'inline-block',
                                        width: '100%',
                                        height: '148px',
                                    }}
                                >
                                    <img
                                        src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                        alt=""
                                        style={{width: '100%', height: '148px'}}
                                        onLoad={() => {
                                        }}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </WingBlank>
                </div>

                <div className="art-shop__special">
                    <Letters/>
                </div>

                <div className="art-shop__recomand">
                    <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                </div>

                <div className="art-shop__column">
                    <Column leftPictureUrl={`${PICTUREURL}30.png`} rightPictureUrl={`${PICTUREURL}31.png`}/>
                </div>

                <div className="art-shop__recommend">
                    <div className="art-shop__recommend___title">
                        <span>热销作品</span>
                        <div>
                            <span>更多</span>
                        </div>
                    </div>
                    <div className="art-shop__recommend___content">
                        {salesProductionList.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                    <ProductionItem {...production}/>
                                </div>)
                        })}
                    </div>
                </div>


                <div className="art-shop__recommend">
                    <div className="art-shop__recommend___title">
                        <span>为你推荐</span>
                        <div>
                            <span>更多</span>
                        </div>
                    </div>
                    <div className="art-shop__recommend___content">
                        {salesProductionList.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                    <ProductionItem {...production}/>
                                </div>)
                        })}
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
        this.props.getUserLikeProducts(11, 2);
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
        dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);

