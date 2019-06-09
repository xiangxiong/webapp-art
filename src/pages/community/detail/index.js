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
import {getUrlParam} from './../../../utils/common';

var carouselData = [
   
]

const CommunityDetail = ({dispatchCommunityDetail,detail,form,
    dispatchCommunityComment,dispatchCommunityCollectIn,dispatchVideoPalyer,location}) =>{
    const [isOpen,setIsOpen] = useState(false);
    const [topicIds,setTopicIds] = useState(getUrlParam('topicId'));
    const [isRefesh,setIsRefesh] = useState();
    const [videoId,setVideoId] = useState();
    const [playAuth,setPlayAuth] = useState();
    const [isHaveVideo,setIsHaveVideo] = useState();
    const [isShowVideo,setIsShowVideo] = useState(1);

    async function getCommunityDeteilApi(){
        var params ={
            TopicId:topicIds,
            CustomerId:Storage.Base.getInstance().get("userInfo").CustomerId,
            CommentCount:3,
            HasChoicenessProvider:false,
            HasProductsRecommend:false,
            HasRelatedRecommend:false
        };
        const result = await dispatchCommunityDetail(params);
        setVideoId(result.Data.VideoId);
        carouselData.push({
            ImgUrl:result.Data.TopicMainImg
        })
        if(result.Data.TopicImgs.length>0){
            result.Data.TopicImgs.map((item,index)=>{
                carouselData.push({
                    ImgUrl:item.ImageName
                });
                console.log('item.ImageName',item.ImageName);
            });
        }
        console.log('result',result);
        setIsHaveVideo(result.Data.IsHaveVideo)
        initAliplayer(result.Data.VideoId);
    }
    
    useEffect(()=>{
        console.log('useEffect');
        getCommunityDeteilApi();
    },[isRefesh]);
    
    const { getFieldProps } = form;
    const {LoginName,ImageName,TopicMainImg,ProductInfo,TopicContent,CommentCount,TopicComments,CustomerId,IsCollected} = detail;
    const imgUrl = PRODIMGURL + ImageName,topicMainImg = PRODIMGURL + TopicMainImg;
    var productImg = '',productName = '',SalePrice = 0,ProductId = 0,VideoId = 0;

    for(var item in ProductInfo){
        if(item === "ImgPath"){
            productImg = PRODIMGURL + ProductInfo[item];
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

    async function initAliplayer(videoId){
        try{
            const result = await dispatchVideoPalyer({
                VedioId:videoId
            });
             // eslint-disable-next-line no-undef
                var player = new Aliplayer({
                    id: 'player-con',
                    width: '100%',
                    autoplay: true,
                    vid : videoId,
                    playauth : result.Data.PlayAuth
                    // cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',  
                },function(player){
                    console.log('播放器创建好了。')
            })
        }
        catch(e){
            
        }
    }

    const handleSendComment = useCallback(async()=>{ 
        const {count} = form.getFieldsValue();
        if(_.isEmpty(count)){
            Toast.fail("请写下你的想法");
            return;
        };
        var payLoad = {
            TopicId:topicIds,
            CustomerId:Storage.Base.getInstance().get("userInfo").CustomerId,
            IsReply:false,
            ReplyCommentId:2,
            CommentContent:count
        };
        const result = await dispatchCommunityComment(payLoad);
        if(result && result.Status === 200){
            Toast.success("发送成功",1);
            setIsOpen(false);
        }else{
            Toast.fail("发送失败",1);
            setIsOpen(false);
        }
        setIsRefesh(Math.random());
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
            islike ? Toast.success("已关注",1) : Toast.success("取消关注",1);
        }else{
            Toast.fail("网络异常");
        }
        setIsRefesh(Math.random());
    },[]);

    const handleImageClick = useCallback(async()=>{
        setIsShowVideo(0);
    });

    const handleVideoClick = useCallback(async()=>{
        setIsShowVideo(1);
        initAliplayer(videoId);
    })
    
    return (
        <Fragment>
            <PublicHeader title="社区详情"/>
            <div className="art-community-detail">
                 <div className="art-community-detail__visit">
                     <img src={imgUrl}/>
                     <span className="art-community-detail-name">{LoginName}</span>{
                         IsCollected === true ?  <span onClick={()=>{handleCollectIn(CustomerId,false)}}>已关注</span> : <span onClick={()=>{handleCollectIn(CustomerId,true)}}>关注</span>
                     }
                 </div>
                 {
                   
                   isShowVideo ? isHaveVideo >0 ? <div class="prism-player" style={{height:'900px'}} id="player-con"></div> : <CarouselBanner imgHeight="3rem" data={carouselData}/> 
                   : carouselData.length > 0 ? <CarouselBanner imgHeight="3rem" data={carouselData}/> : ""
                 }

                 <div className="art-community-detail__autovideo">
                     <span onClick={()=>{
                         handleImageClick();
                     }}>图片</span> | <span onClick={()=>{
                         handleVideoClick();
                     }}>视频</span>
                 </div>
                 <div className={ isShowVideo? isHaveVideo >0 ? 'art-community-detail__shop-video':'art-community-detail__shop' :'art-community-detail__shop'}>
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
                        {...getFieldProps('count',{
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
    dispatchCommunityCollectIn:(data) => dispatch(actionCreators.dispatchCommunityCollectIn(data)),
    dispatchGetDicItem:(data)=>dispatch(actionCreators.dispatchGetDicItem(data)),
    dispatchVideoPalyer:(data)=>dispatch(actionCreators.dispatchVideoPalyer(data))
});

const CommunityDetailWrapper = createForm()(React.memo(CommunityDetail));

export default connect(mapStateToProps,mapStateToDispatch)(CommunityDetailWrapper);