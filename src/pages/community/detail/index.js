import React,{Fragment,useEffect,useState,useCallback} from 'react';
import PublicHeader from './../../../components/header';
import './index.scss';
import CarouselBanner from '../../common/carousel';
import {connect} from 'react-redux';
import {actionCreators} from './../store';
import {PRODIMGURL} from '../../../utils/api';
import {Modal,List,Button,TextareaItem, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import history from './../../../utils/history';
import _ from 'lodash';

const carouselData = [
    {
        ImgUrl:'http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg',
        ImgUrl:'http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-24/art_ca5f74ac-4d75-4eda-b261-976f440d9635.jpg'
    }
]

const CommunityDetail = ({dispatchCommunityDetail,detail,form,
    dispatchCommunityComment,dispatchCommunityCollectIn,forceUpdate}) =>{
    const [isOpen,setIsOpen] = useState(false);

    async function getCommunityDeteilApi(){
        var params ={
            TopicId:2,
            CustomerId:Storage.Base.getInstance().get("userInfo").CustomerId,
            CommentCount:3,
            HasChoicenessProvider:false,
            HasProductsRecommend:false,
            HasRelatedRecommend:false
        };
        dispatchCommunityDetail(params);
    }

    useEffect(()=>{
        getCommunityDeteilApi();
    },[]);
    
    const { getFieldProps } = form;
    const {LoginName,ImageName,TopicMainImg,ProductInfo,TopicContent,CommentCount,TopicComments,CustomerId,IsCollected} = detail;
    const imgUrl = PRODIMGURL + ImageName,topicMainImg = PRODIMGURL + TopicMainImg;
    var productImg = '',productName = '',SalePrice = 0,ProductId = 0;

    const handleSendComment = useCallback(async()=>{ 
        const {count} = form.getFieldsValue();
        if(_.isEmpty(count)){
            Toast.fail("请写下你的想法");
            return;
        }
        var payLoad = {
            TopicId:2,
            CustomerId:11,
            IsReply:false,
            ReplyCommentId:2,
            CommentContent:count
        };
        const result = await dispatchCommunityComment(payLoad);
        if(result && result.Status === 200){
            Toast.success("发送成功");
            setIsOpen(false);
        }else{
            Toast.fail("发送失败");
            setIsOpen(false);
        }
    },[isOpen]);

    const handleCollectIn = useCallback(async(CustomerId,islike)=>{
        var params = {
            CustomerId:Storage.Base.getInstance().get("userInfo").CustomerId,
            Token:Storage.Base.getInstance().get("userInfo").Token,
            CollectType:4,
            ObjId:CustomerId
        };
        const result = await dispatchCommunityCollectIn(params);

        if(result && result.Status === 200){
            islike ? Toast.success("已关注") : Toast.success("已取消");
        }else{
            Toast.fail("网络异常");
        }
    },[]);

    for(var item in ProductInfo){
        if(item === "ImgPath"){
            productImg = PRODIMGURL + ProductInfo[item];
            console.log('ProductInfo',ProductInfo[item]);
        }
        if(item === "ProductName"){
            productName = ProductInfo[item]
        }
        if(item === "ProductId"){
            ProductId = ProductInfo[item]
        }
        if(item === "SalePrice"){
            SalePrice = ProductInfo[item]
        }
    }

    return (
        <Fragment>
            <PublicHeader title="社区详情"/>
            <div className="art-community-detail">
                 <div className="art-community-detail__visit">
                     <img src={imgUrl}/>
                     <span className="art-community-detail-name">{LoginName}</span>
                     {
                         IsCollected === true ?  <span onClick={()=>{handleCollectIn(CustomerId,false)}}>已关注</span> : <span onClick={()=>{handleCollectIn(CustomerId,true)}}>关注</span>
                     }
                 </div>
                 <CarouselBanner imgHeight="3rem" data={carouselData}/>
                 <div className="art-community-detail__shop">
                     <img src={productImg}/>
                     <span className="art-community-detail__shop-container">
                         <h3 className="art-community-detail__shop-title">{productName}</h3>
                         <span className="art-community-detail__shop-price">
                             ￥ {SalePrice}  <i>￥ {SalePrice}</i>
                         </span>
                     </span>
                     <span className="art-community-detail__shop-like" onClick={()=>{history.push('./detail',{ProductId:ProductId})}}>购买</span>
                 </div>
                 <div className="art-community-detail__desc">
                    {TopicContent}
                 </div>
                 <div className="art-community-detail__comment-list">
                     {
                       TopicComments && TopicComments.map((item,index)=>(
                            <p>{item.LoginName}：{item.CommentContent}</p>
                         ))
                     }
                    <p className="art-community-detail__comment-list-all">查看{CommentCount}条评论</p>
                 </div>
                 <div className="art-community-detail__comment" onClick={()=>{setIsOpen(true);}}>
                    添加评论
                 </div>
                 <div className="art-community-detail__comment-split"></div>
            </div>

            <Modal
                popup
                visible={isOpen}
                onClose={()=>{ setIsOpen(false)}}
                animationType="slide-up"
                afterClose={()=>{ setIsOpen(false)}}>
                <List renderHeader={() => <div>发表评论</div>} className="popup-list">
                    <TextareaItem
                        {...getFieldProps('count', {
                            initialValue: '',
                        })}
                        placeholder="写下你的想法..."
                        rows={6}
                        count={100}/>
                    <List.Item>
                        <Button type="primary" onClick={handleSendComment}>发 送</Button>
                    </List.Item>
                </List>
            </Modal>
        </Fragment>
    )
}

const mapStateToProps = state =>{
    return {
        detail:state.community.get('detail')
    }
};

const mapStateToDispatch = dispatch => ({
    dispatchCommunityDetail:(data)=> dispatch(actionCreators.dispatchCommunityDetail(data)),
    dispatchCommunityComment:(data) => dispatch(actionCreators.dispatchCommunityComment(data)),
    dispatchCommunityCollectIn:(data) => dispatch(actionCreators.dispatchCommunityCollectIn(data))
});

const CommunityDetailWrapper = createForm()(React.memo(CommunityDetail));

export default connect(mapStateToProps,mapStateToDispatch)(CommunityDetailWrapper);