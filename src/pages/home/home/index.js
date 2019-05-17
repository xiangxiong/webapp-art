import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import NavItem from './../nav/index';
import Column from '../column/index';
import ProductionItem from './../production/index';
import Letters from './../letters/index';
import {PICTUREURL} from '../../../utils/api';
import {Carousel,InputItem} from 'antd-mobile';
import {connect} from 'react-redux';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../store/actionCreators';

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
            data: ['1', '2', '3'],
            imgHeight: 176,
            scrollCss:classNames(
                'art-main__search',
                {
                    'art-main__search-bg':false
                }
            )
        };
        this.initEvent();
    }

    initEvent(){
    }


    render() {
        const {carouselAdList, commonAdList, newsPagerList, userLikeProducts} = this.props;
        const {scrollCss} = this.state;

        return (
            <Fragment>
                <div className="art-main" 
                ref="artScroll"
                style={{overflow:"auto",height:document.documentElement.clientHeight}}
                >
                    <div className={scrollCss}>
                        <div>上海</div>
                        <div>
                            <InputItem/>
                        </div>
                        <div>问好</div>
                    </div>

                    <div className="art-main__header">
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
                            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                            <img
                                src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                                alt=""
                                className="art-main__header-img"
                                onLoad={() => {
                                // fire window resize event to change height
                                window.dispatchEvent(new Event('resize'));
                                this.setState({ imgHeight: 'auto' });
                                }}
                            />
                            </a>
                        ))}
                        </Carousel>
                    </div>

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

                    <div className="art-main__message">
                        <Letters data={newsPagerList}/>
                    </div>

                    <div className="art-main__banner"
                        style={{
                            background:`url(${ commonAdList && commonAdList.length > 0 ? commonAdList[0].ImgUrl : ''})`,
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain"
                        }}
                    >
                    </div>

                    <div className="art-main__space"></div>

                    <div className="art-main__column">
                        <h2>栏目</h2>
                        <div className="art-main__column-content">
                            <div className="art-main__column-content-recomand"
                            style={{
                                background:`url(${PICTUREURL}30.png)`,
                                marginRight: "3px",
                                backgroundRepeat: "repeat",
                                backgroundSize: "contain"
                            }}>
                            </div>
                            <div className="art-main__column-content-invent"
                            style={{
                                background:`url(${PICTUREURL}31.png)`,
                                marginLeft: "3px",
                                backgroundRepeat: "repeat",
                                backgroundSize: "contain"
                            }}>
                            </div>
                        </div>
                    </div>

                    <div className="art-main__column-border"></div>

                    <div className="art-main__recommend">
                        <div className="art-main__recommend-title"> 
                            为你推荐
                        </div>
                        <div className="art-main__recommend-content">
                            <div className="art-main__recommend-item">
                                <div className="art-main__recommend-img img-mrg-right">
                                </div>
                                <p>景德镇紫砂壶</p>
                                <p><i className="art-main__recommend-money">￥1988</i> 
                                <i className="art-main__recommend-marketprice">￥1988</i></p>
                                <div className="art-main__recommend-user">
                                    <span className="art-main__recommend-name">宇翔老者</span>
                                    <img className="art-main__recommend-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103882846&di=1762f1769f1c241ec54f8b8e04d26e48&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623160926_fxMCc.jpeg"/>
                                </div>
                            </div>
                            <div className="art-main__recommend-item">
                                <div className="art-main__recommend-img img-mrg-right">
                                </div>
                                <p>景德镇紫砂壶</p>
                                <p><i className="art-main__recommend-money">￥1988</i> 
                                <i className="art-main__recommend-marketprice">￥1988</i></p>
                                <div className="art-main__recommend-user">
                                    <span className="art-main__recommend-name">宇翔老者</span>
                                    <img className="art-main__recommend-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103882846&di=1762f1769f1c241ec54f8b8e04d26e48&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623160926_fxMCc.jpeg"/>
                                </div>
                            </div>
                            <div className="art-main__recommend-item">
                                <div className="art-main__recommend-img img-mrg-right">
                                </div>
                                <p>景德镇紫砂壶</p>
                                <p><i className="art-main__recommend-money">￥1988</i> 
                                <i className="art-main__recommend-marketprice">￥1988</i></p>
                                <div className="art-main__recommend-user">
                                    <span className="art-main__recommend-name">宇翔老者</span>
                                    <img className="art-main__recommend-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103882846&di=1762f1769f1c241ec54f8b8e04d26e48&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623160926_fxMCc.jpeg"/>
                                </div>
                            </div>
                            <div className="art-main__recommend-item">
                                <div className="art-main__recommend-img img-mrg-right">
                                </div>
                                <p>景德镇紫砂壶</p>
                                <p><i className="art-main__recommend-money">￥1988</i> 
                                <i className="art-main__recommend-marketprice">￥1988</i></p>
                                <div className="art-main__recommend-user">
                                    <span className="art-main__recommend-name">宇翔老者</span>
                                    <img className="art-main__recommend-avatar" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558103882846&di=1762f1769f1c241ec54f8b8e04d26e48&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201606%2F23%2F20160623160926_fxMCc.jpeg"/>
                                </div>
                            </div>
                        </div>
                    </div>

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
                    )
                })
            }
            else{
                this.setState({
                    scrollCss:classNames(
                        'art-main__search',
                        {
                            'art-main__search-bg':false
                        }
                    )
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