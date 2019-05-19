import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getWorthGoodsDetail, getProductComment} from '../store/actionCreators';
import  {pictureUrl} from '../../../utils/stringUtil';
import history from './../../../utils/history';

class Detail extends PureComponent {

    handleBuy = () => {
        history.push('./submitorder');
    };

    render() {
        let {
            MainImgs = [],
            Name,
            Brief,
            BrowseImages = [],
            KillPrice,
            MarketPrice,
            ProviderName,
            ProviderLogo,
            ProviderLabel,
        } = this.props.shopWorthGoodsDetail;

        let carouselData = MainImgs.map((mainImg) => {
            return {ImgUrl: mainImg}
        });

        let {TotalRecords, DataList = []} = this.props.showProductComment;

        return (
            <Fragment>
                <div className="art-product">
                    <PublicHeader title="商品详情" bgColor="#E87908" share="share"/>
                    <CarouselBanner imgHeight="2.96rem" data={carouselData}/>

                    <div className="art-product__detail">
                        <h4>{Name}</h4>
                        <p className="art-product__detail-font">
                            <span>现价:</span>
                            <i>￥</i>
                            <i>{KillPrice}</i>
                            <span>
                        ￥{MarketPrice}
                        </span>
                        </p>
                    </div>

                    <div className="art-product__free">
                        <div>运费</div>
                        <div>包邮</div>
                    </div>

                    <div className="art-product__space"></div>

                    <div className="art-product__homepage">
                        <div>
                            <div className="art-product__homepage-avatar"
                                 style={{
                                     background: `url(${pictureUrl(ProviderLogo)})`,
                                     marginRight: "3px",
                                     backgroundRepeat: "no-repeat",
                                     backgroundSize: "contain"
                                 }}>
                            </div>
                        </div>
                        <div>
                            <h4 className="art-product__homepage-master">{ProviderName}</h4>
                            <span className="art-product__homepage-auth">作品：245件 月销：755件 粉丝：345个</span>
                        </div>
                        <div>
                            <div className="art-product__homepage-jump">去逛逛</div>
                        </div>
                    </div>

                    <div className="art-product__space"></div>

                    <div className="art-product__homepage">
                        <div className="art-product__homepage__detail">
                            详情
                        </div>
                    </div>

                    <div className="art-product__homepage__content">
                        <p>{Brief}</p>
                    </div>

                    {BrowseImages.map((browseImage, index) => {
                        return (
                            <div className="art-product__homepage__picture"
                                 key={index.toString()}
                                 style={{
                                     background: `url(${pictureUrl(browseImage)})`,
                                     backgroundRepeat: "no-repeat",
                                     backgroundSize: "contain"
                                 }}>
                            </div>
                        )
                    })}

                    <div className="art-product__space"></div>

                    <div className="art-product__homepage">
                        <div className="art-product__homepage__detail">
                            {`评价(${TotalRecords})`}
                        </div>
                    </div>

                    {DataList.map((data, index) => {
                        return (
                            <div key={index.toString()}>
                                <div className="art-product__comment">
                                    <div className="art-product__comment-avatar">
                                        <div className="art-product__comment-avatar-item"></div>
                                    </div>
                                    <div className="art-product__comment-username">
                                        {data.CustomerName}
                                    </div>
                                </div>
                                <div className="art-product__comment-content">
                                    {data.Content}
                                </div>

                                <div className="art-product__comment-image">
                                    <div
                                        style={{
                                            background: `url(${pictureUrl(data.HeadImage)})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "contain"
                                        }}>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div className="art-product__comment-whiteSpace">
                </div>

                <div className="art-product__tooBar">
                    <div>
                        <div className="art-icon art-icon-kefu"></div>
                        <p>客服</p>
                    </div>
                    <div>
                        <div className="art-icon art-icon-cart"></div>
                        <p>购物车</p>
                    </div>
                    <div>
                        <div className="art-icon art-icon-collect"></div>
                        <p>收藏</p>
                    </div>
                    <div
                        onClick={() => {
                            this.handleBuy()
                        }}>
                        立即购买
                    </div>
                    <div>购物车</div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {ProductId} = this.props.location.state;
        this.props.getWorthGoodsDetail(ProductId);
        this.props.getProductComment([ProductId], '11');
    }
}

const mapStateToProps = ({shop}) => {
    return {
        shopWorthGoodsDetail: shop.shopWorthGoodsDetail,
        showProductComment: shop.showProductComment,
    }
};

const mapDispatchToProps = dispatch => ({
    getWorthGoodsDetail: (ProdId, PromotionId) => {
        dispatch(getWorthGoodsDetail({ProdId, PromotionId}))
    },

    getProductComment: (ProdIds, CustomerId) => {
        dispatch(getProductComment({ProdIds, CustomerId, CommentType: 9, CurrentPage: 1, PageSize: 50}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
