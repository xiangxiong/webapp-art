import React, {Fragment,useState,useEffect} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';
import history from './../../../utils/history';
import {connect} from 'react-redux';
import * as actionCreators  from './../store/actionCreators';

const Detail =({dispatchGroupDetail,match}) => {

    async function loadData(){
        var payLoad = {
            PromotionId:1,
            CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId
        };
        
        const result = await dispatchGroupDetail({});
        console.log('result',result);
    }

    // match.params.PromotionId,

    useEffect(()=>{
        loadData();
    },[]);

    const handleBuy = () => {
        history.push('./submitorder', {productList: [this.props.shopWorthGoodsDetail]});
    };

    const addBuy = (ProductId) => {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        this.props.getModifyCart({CustomerId, CartId: 0, ProductId, Quantity: 1});
    };

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
                    <div className="art-icon art-icon-cart"></div>
                    <p>购物车</p>
                </div>
                <div>
                    <div className="art-icon art-icon-collect"></div>
                    <p>收藏</p>
                </div>
                <div
                    onClick={() => {
                    }}>
                    立即购买
                </div>
                <div
                    onClick={() => {
                    }}
                >加入购物车
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {

    }
}

const mapDispatchToProps = (dispatch) =>({
    dispatchGroupDetail:(data)=>dispatch(actionCreators.dispatchGroupDetail(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Detail));
