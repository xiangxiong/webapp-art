import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';

class Detail extends PureComponent {

    render() {
       
        return (
            <Fragment>
                <div className="art-product">
                    <PublicHeader title="团购详情" bgColor="#E87908"/>
                    <CarouselBanner imgHeight="2.96rem" />

                    <div className="art-product__detail">
                        <h4>eeee</h4>
                        <p className="art-product__detail-font">
                            <span>现价:</span>
                            <i>￥</i>
                            <i>3333</i>
                            <span>
                        ￥3333
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
                                     marginRight: "3px",
                                 }}>
                            </div>
                        </div>
                        {/* background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`, */}
                        <div>
                            <h4 className="art-product__homepage-master">eeee</h4>
                            <span className="art-product__homepage-auth">
                                {`作品：${2}件 月销：${2}件 粉丝：${2}个`}
                                </span>
                        </div>
                        <div>
                           {/* <div className="art-product__homepage-jump">去逛逛</div>*/}
                        </div>
                    </div>

                    <div className="art-product__space"></div>

                    <div className="art-product__homepage">
                        <div className="art-product__homepage__detail">
                            详情
                        </div>
                    </div>

                    <div className="art-product__homepage__content">
                        <p>eeee</p>
                    </div>

                    {/* {ImageNames.map((imageName, index) => {
                        return (
                            <div className="art-product__homepage__picture"
                                 key={index.toString()}
                                 style={{
                                     background: `url(${pictureUrl(imageName)}) 0% 0% / cover`,
                                 }}>
                            </div>
                        )
                    })} */}

                    <div className="art-product__space"></div>

                    <div className="art-product__homepage">
                        <div className="art-product__homepage__detail">
                            {`评价(eeee)`}
                        </div>
                    </div>

                            <div style={{'borderBottom': '1px solid #E7E7E7'}}>
                                <div className="art-product__comment">
                                    <div className="art-product__comment-avatar">
                                        <div className="art-product__comment-avatar-item"
                                           ></div>
                                    </div>
                                    <div className="art-product__comment-username">
                                      dddd
                                    </div>
                                </div>
                                <div className="art-product__comment-content">
                                    ddddd
                                </div>
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
                    <div>购物车</div>
                </div>
            </Fragment>
        )
    }
}

export default Detail;
