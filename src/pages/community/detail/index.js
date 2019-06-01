import React,{Fragment} from 'react';
import PublicHeader from './../../../components/header';
import './index.scss';
import CarouselBanner from '../../common/carousel';

const carouselData = [
    {
        ImgUrl:'http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg',
        ImgUrl:'http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg'
    }
]

const CommunityDetail = () =>{
    return (
        <Fragment>
            <PublicHeader title="社区详情"/>
            <div className="art-community-detail">
                 <div className="art-community-detail__visit">
                     <span>1</span>
                     <span>宇翔老者</span>
                     <span>关注</span>
                 </div>

                 <CarouselBanner imgHeight="3rem" data={carouselData}/>

                 <div className="art-community-detail__shop">
                     <img src="http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg"/>
                     <span className="art-community-detail__shop-container">
                         <h3 className="art-community-detail__shop-title">景德镇紫砂壶</h3>
                         <span className="art-community-detail__shop-price">
                             ￥1998  <i>￥1998</i>
                         </span>
                     </span>
                     <span className="art-community-detail__shop-like">购买</span>
                 </div>
                 <div className="art-community-detail__desc">
                    阿里拍卖提供具有独特性或有较高附加值商品的拍卖平台,包括
                 </div>
                 <div className="art-community-detail__comment-list">
                    <p>张国荣：好宝贝，我喜欢</p>
                    <p>张国荣：好宝贝，我喜欢</p>
                    <p className="art-community-detail__comment-list-all">查看875条评论</p>
                 </div>
                 <div className="art-community-detail__comment">
                    添加评论
                 </div>
                 <div className="art-community-detail__comment-split"></div>
            </div>
        </Fragment>
    )
}

export default CommunityDetail;