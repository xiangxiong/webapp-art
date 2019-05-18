import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import NavItem from './../nav/index';
import ProductionItem from './../production/index';

import {PICTUREURL} from '../../../utils/api';
import {InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../store/actionCreators';
import CarouselBanner from '../../common/carousel';
import Column from '../../common/column';
import Advert from '../../common/advert';
import Letters from '../../common/letters/index';
import Space from '../../common/space';
import Product from './../../common/product';
import Title from './../../common/title';

class Main extends PureComponent{

    constructor(props) {
        super(props);

        this.navDataList = [
            {imageUrl: `${PICTUREURL}2.png`, name: '大师云集'},
            {imageUrl: `${PICTUREURL}3.png`, name: '市集'},
            {imageUrl: `${PICTUREURL}4.png`, name: '艺商城'},
            {imageUrl: `${PICTUREURL}5.png`, name: '艺社区'},
        ];

        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            imgHeight: 176,
            scrollCss:classNames(
                'art-main__search',
                {
                    'art-main__search-bg':false
                }
            ),
            searchCss:classNames('art-main__search-input',{
                'art-main__search-input-bg':false
            }),
            address:classNames('art-main__search-address',{
                'art-main__search-address-bg':false
            }),
            items:4,
            hasMoreItems: true
        };
    }

    showRecomandItem(){
        var items = [];

        for(var i = 0; i <  this.state.items; i++){
            items.push(<div key={i} className="art-main__recommend-item">
            <div className="art-main__recommend-img img-mrg-right">
            </div>
            <p>景德镇紫砂壶</p>
            <p><i className="art-main__recommend-money">￥1988</i> 
            <i className="art-main__recommend-marketprice">￥1988</i></p>
            <div className="art-main__recommend-user">
                <span className="art-main__recommend-name">宇翔老者</span>
                <img className="art-main__recommend-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103882846&di=1762f1769f1c241ec54f8b8e04d26e48&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623160926_fxMCc.jpeg"/>
            </div>
        </div>);
        }

        return items;
    }

    loadMoreItem(){
        if(this.state.items === 20){
            this.setState({
                hasMoreItems:false
            });
        }else{
            setTimeout(()=>{
                // todo: 异步加载数据.
                this.setState({
                    items:this.state.items + 4
                });
            },2000);
        }
    }

    render() {
        const {carouselAdList, commonAdList, newsPagerList, userLikeProducts} = this.props;
        const {scrollCss,searchCss,address} = this.state;

        return (
            <Fragment>
                <div className="art-main" 
                ref="artScroll"
                style={{overflow:"auto",height:document.documentElement.clientHeight}}>
                    <div className={scrollCss}>
                        <div className={address}>上海</div>
                        <div>
                            <input className={searchCss} placeholder="大家都在搜紫砂壶"/>
                        </div>
                        <div className="art-icon art-icon-helper"></div>
                    </div>

                    <InfiniteScroll
                        loadMore={this.loadMoreItem.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="art-main__loader"> 正在努力加载中... </div>}
                        useWindow={false}>

                        <CarouselBanner data={this.state.data}/>

                        <div className="art-main__navitem">
                                {
                                    this.navDataList.map((navData, index) => {
                                        return (
                                            <div key={index.toString()}>
                                                <div className="art-main__navitem-img-wrapper">
                                                    <img className="art-main__navitem-img" src={navData.imageUrl}/>
                                                </div>
                                                <span className="art-main__navitem-title" >{navData.name}</span>
                                            </div>
                                        )
                                    })
                                }
                        </div>

                        <Letters data={newsPagerList}/>

                        <Advert commonAdList={commonAdList}/>

                        <Space/>

                        <Column imgUrl={PICTUREURL}/>

                        <div className="art-main__recommend">
                            
                            <Title title="为你推荐"/>

                            <div className="art-main__recommend-content">
                                <Product/>
                                <Product/>
                                <Product/>
                                <Product/>
                                {this.showRecomandItem()}
                            </div>

                        </div>
                  
                    </InfiniteScroll>
                </div>

                {/* <div className="art-main__header">
                    <div className="art-main__header___carousel">
                        <Carousel
                            autoplay={false}
                            infinite
                        >
                            {carouselAdList.map((carouselAd, index) => (
                                <a
                                    key={index.toString()}
                                    href={carouselAd.SkipUrl}
                                    style={{
                                        display: 'inline-block',
                                        width: '375px',
                                        height: '176px',
                                    }}
                                >
                                    <img
                                        src={carouselAd.ImgUrl}
                                        style={{width: '375px', height: '176px'}}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </div>

                    <div className="art-main__header___search">
                        <span>上海</span>
                        <div>
                            <img src={`${PICTUREURL}51.png`}/>
                            <span>大家都在搜紫砂壶</span>
                        </div>
                        <img src={`${PICTUREURL}2.png`}/>
                    </div>
                </div>

                <section className="art-main__navitem">
                    {this.navDataList.map((navData, index) => {
                        return (
                            <div key={index.toString()}>
                                <NavItem {...navData}/>
                            </div>)
                    })}
                </section>

                <div className="art-main__special">
                    <Letters data={newsPagerList}/>
                </div>

                <div className="art-main__recomand">
                    {commonAdList && commonAdList.length > 0 ? <img src={commonAdList[0].ImgUrl}/> : null}
                </div>

                <div className="art-main__interval"/>

                <div className="art-main__column">
                    <Column leftPictureUrl={`${PICTUREURL}30.png`} rightPictureUrl={`${PICTUREURL}31.png`}/>
                </div>

                <h3 className="art-main__recommend">为你推荐</h3>

                <div className="art-main__recommendProduct">
                    <div>
                        {userLikeProducts.map((production, index) => {
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

        console.log("this.refs.artScroll",this.refs.artScroll);

        this.refs.artScroll.addEventListener("scroll",()=>{
            // console.log('addEventListener');
            // console.log('this.refs.myscroll.scrollTop',);
            // console.log('this.refs.myscroll.clientHeight ',this.refs.artScroll.clientHeight );
            if(this.refs.artScroll.scrollTop>176){
                this.setState({
                    scrollCss:classNames(
                        'art-main__search',
                        {
                            'art-main__search-bg':true
                        }
                    ),
                    searchCss:classNames('art-main__search-input',{
                        'art-main__search-input-bg':true
                    }),
                    address:classNames('art-main__search-address',{
                        'art-main__search-address-bg':true
                    })
                })
            }
            else{
                this.setState({
                    scrollCss:classNames(
                        'art-main__search',
                        {
                            'art-main__search-bg':false
                        }
                    ),
                    searchCss:classNames('art-main__search-input',{
                        'art-main__search-input-bg':false
                    }),
                    address:classNames('art-main__search-address',{
                        'art-main__search-address-bg':false
                    })
                })
            }
        });

         // simulate img loading
        setTimeout(() => {
            this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
        this.props.getAdvertList(1);
        this.props.getNewsPagerList();
        this.props.getAdvertList(11);
        this.props.getUserLikeProducts(11, 1);
    }
}

const mapStateToProps = ({home}) => {
    return {
        carouselAdList: home.carouselAdList,
        commonAdList: home.commonAdList,
        newsPagerList: home.newsPagerList,
        userLikeProducts: home.userLikeProducts,
    }
};

const mapDispatchToProps = dispatch => ({
    getAdvertList: (type) => {
        dispatch(getAdvertList(type))
    },

    getNewsPagerList: () => {
        dispatch(getNewsPagerList({CategoryId: 3, CurrentPage: 1, PageSize: 3}))
    },

    getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 10) => {
        dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);