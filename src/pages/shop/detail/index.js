import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getWorthGoodsDetail, getProductComment, getCollectin, getProductDetail} from '../store/actionCreators';
import  {pictureUrl} from '../../../utils/common';
import history from './../../../utils/history';
import {getModifyCart, dispatchVideoPalyer} from '../../cart/store/actionCreators';
import {Toast} from 'antd-mobile';

class Detail extends PureComponent {

    constructor(props){
        super(props);
        this.isLiving = false;
    }

    state = {
        videoId: '',
        isShowVideo: true,
        isHaveVideo: 0,
        isCreateVideo:false,
        isSelectedVideo:true,
        isSelectedImg:false
    }

    // static defaultProps = {
    //     id: 'player-detail',
    //     autoplay: true,
    //     isLive:true,
    //     width:"100%",
    //     height:"5.6rem",
    //     playsinline:true,
    //     controlBarVisibility:'hover',
    //     source:"",
    //     useH5Prism:true,
    //     useFlashPrism:false,
    //     x5_video_position:'top',
    //     //prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
    //     x5_type:'h5', //
    //     cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
    // };

    componentDidUpdate(){

        const {isCreateVideo,} = this.state;
        console.log('ref',this.refs.playerDetail);
        console.log('this.player',this.player);
        console.log('componentDidUpdate',this.state.isShowVideo);
        if(this.state.isShowVideo){
            this.setupPlayer();
            // if(!this.player)
            // {
            //     this.setupPlayer();
            // }
            // else{
            //     this.player.dispose();
            //     this.setupPlayer();
            // }
            // else
            // {
            //     this.player.dispose();
            //     this.setupPlayer();
            // }
        }
    }

    componentDidCatch(e){
        console.log(`componentDidCatch: ${e.message}`);
    }

    componentWillUnmount(){
        console.log('componentWillUnmount');
        if(this.player){
            this.player.dispose();
        }
    }

    componentDidMount() {
        const {ProductId} = this.props.location.state;
        let storage = Storage.Base.getInstance();
        let customerId = storage.get('userInfo') == null ? 0 : storage.get('userInfo').CustomerId;
        const promise = this.props.getWorthGoodsDetail(ProductId, customerId);
        this.props.getProductComment([ProductId], customerId);
        var that = this;
        promise.then((response) => {
            that.setState({
                isHaveVideo: response.value.IsHaveVideo,
                videoId: response.value.VideoId,
                isSelectdVideo: response.value.IsHaveVideo>0?true:false
            });
        });
    }

  async setupPlayer(){
      console.log('setupPlayer');
        var props = {};
            const result = await this.props.dispatchVideoPalyer({
                VedioId: this.state.videoId
            });
            console.log('this.state.videoId',this.state.videoId)
            console.log('result.Data.PlayAuth',this.state.videoId)
            this.isLiving = true;
            // eslint-disable-next-line no-undef
            this.player = new Aliplayer({
                id: 'player-detail',
                autoplay: true,
                isLive:true,
                width:"100%",
                vid: this.state.videoId,
                playauth: result.Data.PlayAuth,
                height:"5.6rem",
                playsinline:true,
                controlBarVisibility:'hover',
                useH5Prism:true,
                useFlashPrism:false,
                x5_video_position:'top',
                //prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
                x5_type:'h5' //
            });
            this.player.on('play',()=>{
              console.log('play');
            });
            this.setState({
                isCreateVideo:true
            })
    }

    handleBuy = () => {
        console.log('this.props.shopWorthGoodsDetail', this.props.shopWorthGoodsDetail);
        history.push('./submitorder', {productList: [this.props.shopWorthGoodsDetail]});
    };

    addBuy = (ProductId) => {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        this.props.getModifyCart({CustomerId, CartId: 0, ProductId, Quantity: 1});
        Toast.success("加入成功");
    };

    handleCollection = (ProductId) => {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        let Token = storage.get('userInfo').Token;
        this.props.getCollectin({CustomerId, Token, CollectType: 1, ObjId: ProductId});
    };

    handleImageClick = () => {
        this.setState({
            isShowVideo: false,
            isSelectdVideo: false,
            isSelectedImg:true
        });
    }

    handleVideoClick = () => {
        this.setState({
            isShowVideo: true,
            isSelectdVideo: true,
            isSelectedImg:false
        })
    }

    render() {
        let {
            MainImgs = [],
            ImageNames = [],
            Name,
            Brief,
            KillPrice,
            MarketPrice,
            Provider = {},
            ProdId,
            IsCollect
        } = this.props.shopWorthGoodsDetail;
        const {ImageName, ProviderName, ProductCount, MonthSalesCount, FansCount, CooperationWay, ProviderId} = Provider;
        let carouselData = MainImgs.map((mainImg) => {
            return {ImgUrl: mainImg}
        });
        let {TotalRecords, DataList = []} = this.props.showProductComment;

        const {isShowVideo, isHaveVideo,isSelectdVideo,isSelectedImg} = this.state;

        return (
            <Fragment>
                <div className="art-product-shop">
                    <PublicHeader title="商品详情" bgColor="#E87908"/>
                    {
                        isShowVideo ? isHaveVideo>0 ? <div className="prism-player" ref="playerDetail" id="player-detail"></div> : 
<CarouselBanner imgHeight="3.15rem" data={carouselData}/> : <CarouselBanner imgHeight="3.15rem" data={carouselData}/> 
                    }
                    
                    <div className="art-product-shop__autovideo">
                        {
                            isHaveVideo>0 ? <Fragment>
<span style={{backgroundColor: isSelectdVideo ? '#E87908':'#F3F3F3',color: isSelectdVideo ? '#FFFFFF':'rgba(122,122,122,1)'}} onClick={this.handleVideoClick.bind(this)}>视频</span>
                        <span style={{backgroundColor: isSelectedImg ? '#E87908':'#F3F3F3',color: isSelectedImg ? '#FFFFFF':'rgba(122,122,122,1)'}} onClick={this.handleImageClick.bind(this)}>图片</span> 
                            </Fragment> : <Fragment></Fragment>
                        }
                    </div> 

                    <div className={isShowVideo ? isHaveVideo > 0 ? "art-product-shop__detailvideo" : "art-product-shop__detail" : "art-product-shop__detail"}>
                        <h4>{Name}</h4>
                        <p className="art-product-shop__detail-font">
                            <span>现价:</span>
                            <i>￥</i>
                            <i>{KillPrice}</i>
                            <span>
                                ￥{MarketPrice}
                            </span>
                        </p>
                    </div>
                    <div className="art-product-shop__free">
                        <div>运费</div>
                        <div>包邮</div>
                    </div>

                    <div className="art-product-shop__space"></div>

                    <div className="art-product-shop__homepage">
                        <div>
                            <div className="art-product-shop__homepage-avatar"
                                 style={{
                                     background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`,
                                     marginRight: "3px",
                                 }}>
                            </div>
                        </div>
                        <div>
                            <h4 className="art-product-shop__homepage-master">{ProviderName}</h4>
                            <span className="art-product-shop__homepage-auth">
                                {`作品：${ProductCount}件 月销：${MonthSalesCount}件 粉丝：${FansCount}个`}
                                </span>
                        </div>
                        <div className="art-product__homepage-jump" onClick={() => {
                            if (CooperationWay == '1') {
                                //艺术家详情
                                history.push('./shopHomepage/', {
                                    ProviderId: ProviderId
                                });
                            } else if (CooperationWay == '2') {
                                //商户详情
                                history.push('./shopHomepage', {
                                    ProviderId: ProviderId
                                });
                            }
                        }}>去逛逛
                        </div>
                    </div>

                    <div className="art-product-shop__space"></div>

                    <div className="art-product-shop__homepage">
                        <div className="art-product-shop__homepage__detail">
                            详情
                        </div>
                    </div>

                    <div className="art-product-shop__homepage__content">
                        <p>{Brief}</p>
                    </div>

                    {ImageNames.map((imageName, index) => {
                        return (
                            <div className="art-product-shop__homepage__picture"
                                 key={index.toString()}
                                 style={{
                                     background: `url(${pictureUrl(imageName)}) 0% 0% / cover`,
                                 }}>
                            </div>
                        )
                    })}

                    <div className="art-product-shop__space"></div>

                    <div className="art-product-shop__homepage">
                        <div className="art-product-shop__homepage__detail">
                            {`评价(${TotalRecords})`}
                        </div>
                    </div>

                    {DataList.map((data, index) => {
                        const {HeadImage, CustomerName, Content} = data;
                        return (
                            <div key={index.toString()} style={{'borderBottom': '1px solid #E7E7E7'}}>
                                <div className="art-product-shop__comment">
                                    <div className="art-product-shop__comment-avatar">
                                        <div className="art-product-shop__comment-avatar-item"
                                             style={{
                                                 background: `url(${pictureUrl(HeadImage)}) 0% 0% / cover`,
                                             }}></div>
                                    </div>
                                    <div className="art-product-shop__comment-username">
                                        {CustomerName}
                                    </div>
                                </div>
                                <div className="art-product-shop__comment-content">
                                    {Content}
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="art-product-shop__comment-whiteSpace">
                    
                </div>

                <div className="art-product-shop__tooBar">
                    <div onClick={() => {
                        history.push('/home?tab=Cart');
                    }}>
                        <div className="art-icon art-icon-cart"></div>
                        <p>购物车</p>
                    </div>
                    <div
                        onClick={() => {
                            this.handleCollection(ProdId)
                        }}>
                        <div className="art-icon art-icon-collect"></div>
                        <p>{IsCollect ? '已收藏' : '收藏'}</p>
                    </div>
                    <div
                        onClick={() => {
                            this.handleBuy()
                        }}>
                        立即购买
                    </div>
                    <div
                        onClick={() => {
                            this.addBuy(ProdId)
                        }}
                    >加入购物车
                    </div>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = ({shop}) => {
    return {
        shopWorthGoodsDetail: shop.shopWorthGoodsDetail,
        showProductComment: shop.showProductComment,
    }
};

const mapDispatchToProps = dispatch => ({
    getWorthGoodsDetail: (ProdId, CustomerId) => {
        return dispatch(getWorthGoodsDetail({ProdId, CustomerId}))
    },
    getProductComment: (ProdIds, CustomerId) => {
        dispatch(getProductComment({ProdIds, CustomerId, CommentType: 9, CurrentPage: 1, PageSize: 50}))
    },
    getModifyCart: (params) => dispatch(getModifyCart(params)),
    getCollectin: (params) => dispatch(getCollectin(params)),
    dispatchVideoPalyer: (params) => dispatch(dispatchVideoPalyer(params)),
    getProductDetail: (params) => dispatch(getProductDetail(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
