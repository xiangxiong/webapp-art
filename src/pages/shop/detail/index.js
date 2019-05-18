import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getWorthGoodsDetail} from '../store/actionCreators';
import  {pictureUrl} from '../../../utils/stringUtil';

class Detail extends PureComponent {

    render() {
        let {
            MainImgs = [],
            Name,
            Brief,
            BrowseImages=[],
            KillPrice,
            MarketPrice,
            ProviderName,
            ProviderLogo,
            ProviderLabel,
        } = this.props.shopWorthGoodsDetail;

        let carouselData = MainImgs.map((mainImg) => {
            return {ImgUrl: mainImg}

        });

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
                            评价(230)
                        </div>
                    </div>

                    <div className="art-product__comment">
                        <div className="art-product__comment-avatar">
                            <div className="art-product__comment-avatar-item"></div>
                        </div>
                        <div className="art-product__comment-username">
                            小兰****天
                        </div>
                    </div>
                    <div className="art-product__comment-content">
                        贴心设计，现代玉雕分为南派、北派。南派以扬州为代表，特点是细腻形象
                    </div>

                    <div className="art-product__comment-image">
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>
                        <div></div>
                    </div>
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
                    <div>立即购买</div>
                    <div>购物车</div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {ProductId} = this.props.location.state;
        this.props.getWorthGoodsDetail(ProductId);
    }
}

const mapStateToProps = ({shop}) => {
    return {
        shopWorthGoodsDetail: shop.shopWorthGoodsDetail,
    }
};

const mapDispatchToProps = dispatch => ({
    getWorthGoodsDetail: (ProdId, PromotionId) => {
        dispatch(getWorthGoodsDetail({ProdId, PromotionId}))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
