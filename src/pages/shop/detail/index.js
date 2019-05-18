import React,{Fragment} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';

const Detail = () => {
    return (
        <Fragment>
            <div className="art-product">
                <PublicHeader title="商品详情" bgColor="#E87908" share="share"/>
                <CarouselBanner imgHeight="2.96rem"/>

                <div className="art-product__detail">
                    <h4>新疆上等的玉料和田玉坠</h4>
                    <p>
                        上等的玉料已经浑然天成，在呈现给世人之前已然经过了大自然的造化神功。
                    </p>
                    <p className="art-product__detail-font">
                        <span>现价:</span>
                        <i>￥</i>
                        <i>52.0</i>
                        <span>
                        ￥128.0
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
                        <div className="art-product__homepage-avatar"></div>
                    </div>
                    <div>
                        <h4 className="art-product__homepage-master">景德镇陶瓷艺术大师</h4>
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
                    sssss
                </div>

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

export default Detail;