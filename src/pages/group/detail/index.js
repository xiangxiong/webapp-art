import React, {Fragment,useState,useEffect} from 'react';
import './index.scss';
import CarouselBanner from './../../common/carousel';
import PublicHeader from './../../../components/header';
import history from './../../../utils/history';
import {connect} from 'react-redux';
import * as actionCreators  from './../store/actionCreators';
import { PRODIMGURL } from '../../../utils/api';

const Detail =({dispatchGroupDetail,dispatchGoodsDetail,location}) => {

    const [groupItem,setGroupItem] = useState([]);
    const [banners,setBanners] = useState([]);
    const [isLoading,setIsLoading] = useState(false);
    const [ProviderName,setProviderName] = useState("");
    const [FansCount,setFansCount] = useState(0);
    const [ImageName,setImageName] = useState("");
    const [ProductCount,setProductCount] = useState(0);
    const [ProviderId,setProviderId] = useState(0);
    const [MonthSalesCount,setMonthSalesCount] = useState(0);
    const [ProductDetail,setProductDetail] = useState("");
    const [product,setProduct] = useState({});
    
    async function loadData(){
        setIsLoading(true);
        var payLoad = {
            PromotionId:location.state.PromotionId,
            CustomerId:Storage.Base.getInstance().get('userInfo').CustomerId
        };

        if(location.state.PromotionId>0){
            var carouselData = [];
            const result = await dispatchGroupDetail(payLoad);
            var goodsParams = {
                ProdId:result.Data.Entity.ProductId,
                PromotionId:result.Data.Entity.PromotionId
            };
            const goods = await dispatchGoodsDetail(goodsParams);
            setIsLoading(false);
            setGroupItem(result.Data.Entity);

            setProduct(goods.Data.Entity);
            setProviderName(result.Data.Entity.Provider.ProviderName);
            setFansCount(result.Data.Entity.Provider.FansCount);
            setImageName(result.Data.Entity.Provider.ImageName);
            setProductCount(result.Data.Entity.Provider.ProductCount);
            setProviderId(result.Data.Entity.Provider.ProviderId);
            setMonthSalesCount(result.Data.Entity.Provider.MonthSalesCount);
            setProductDetail(result.Data.Entity.Provider.ProductDetail)

            result.Data.Entity.PdtImgList.map((item,index)=>{
                carouselData.push({ImgUrl:PRODIMGURL+item});
                setBanners(carouselData)
            });
        }
    }

    useEffect(()=>{
        loadData();
    },[]);

    return (
        <Fragment>
            {isLoading?(
                 <div style={{display: isLoading ?'none':'block'}}>Loading ...</div>
            ):(
                <Fragment>
                    <div className="art-product">
                        <PublicHeader title="团购详情" bgColor="#E87908"/>
                        <CarouselBanner imgHeight="3.14rem" data={banners} />
                        <div className="art-product__detail">
                            <h4>{groupItem.ProductName}</h4>
                            <p className="art-product__detail-font">
                                <span>团购价:</span>
                                <i>￥</i>
                                <i>{groupItem.LimitPrice}</i>
                                <span>
                                    ￥{groupItem.MarketPrice}
                                </span>
                                <div className="art-product__lockCount">
                                    <span>
                                    { groupItem.LockCount } 人
                                    </span>
                                    {/* 
                                        <div className="art-product__personCount">
                                            <span className="art-product__personCount-item">2</span>
                                        </div> 
                                    */}
                                </div>
                            </p>
                        </div>
                        <div className="art-product__space"></div>
                        <div className="art-product__homepage">
                            <div>
                                <div className="art-product__homepage-avatar"
                                        style={{
                                            marginRight: "3px",
                                            background: `url(${PRODIMGURL+ImageName}) 0% 0% / cover`
                                        }}>
                                </div>
                            </div>
                            <div>
                                <h4 className="art-product__homepage-master">{ProviderName}</h4>
                                <span className="art-product__homepage-auth">
                                    {`作品：${ProductCount}件 月销：${MonthSalesCount}件 粉丝：${FansCount}个`}
                                </span>
                            </div>
                            <div>
                                {/* <div className="art-product__homepage-jump">去逛逛</div>*/}
                            </div>
                        </div>

                        <div className="art-product__space"></div>

                        <div className="art-product__homepage">
                            <div className="art-product__homepage__detail">
                                商品详情
                            </div>
                        </div>

                        <div className="art-product__homepage__content">
                            <p>{ProductDetail}</p>
                        </div>

                    </div>
                    <div className="art-product__comment-whiteSpace">
                    </div>
                    <div className="art-product__tooBar">
                        <div>
                            <div className="art-icon art-icon-collect"></div>
                            <p onClick={()=>{}}>收藏</p>
                        </div>
                        <div onClick={() => {history.push('./submitorder', {productList: [product]});}}>
                            <p>{groupItem.MarketPrice}</p>
                            <p>直接购买</p>
                        </div>
                        <div onClick={() => {}}>
                            <p>{groupItem.LimitPrice}</p>
                            <p>参与拼团</p>
                        </div>
                    </div>
                 </Fragment>
              )
            }
        </Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
    }
}

const mapDispatchToProps = (dispatch) =>({
    dispatchGroupDetail:(data)=>dispatch(actionCreators.dispatchGroupDetail(data)),
    dispatchGoodsDetail:(data)=>dispatch(actionCreators.dispatchGoodsDetail(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Detail));