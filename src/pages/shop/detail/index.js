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
import Loading from "./../../../components/hoc/loading";
import List from './List';

class Detail extends PureComponent{

    constructor(){
        super();
        this.state = {
            videoId: '',
            isShowVideo: true,
            isHaveVideo: 0,
            isCreateVideo:false,
            isSelectedVideo:true,
            isSelectedImg:false
        }
    }

    componentDidUpdate(){
        if(this.state.isShowVideo){
            // this.setupPlayer();
        }
        setTimeout(()=>{
            this.setState({
                data:[1]
            });
        },3000);
    }

    componentDidMount(){
        console.log('this.props componentDidMount');
        const {ProductId} = this.props.location.state;
        let storage = Storage.Base.getInstance(),
            customerId = storage.get('userInfo') == null ? 0 : storage.get('userInfo').CustomerId;
        const promise = this.props.getWorthGoodsDetail(ProductId, customerId);
        var that = this;
        this.props.getProductComment([ProductId], customerId);
        promise.then((response) => {
            that.setState({
                isHaveVideo: response.value.IsHaveVideo,
                videoId: response.value.VideoId,
                isSelectdVideo: response.value.IsHaveVideo>0?true:false
            });
        });
    }

    componentWillUnmount(){
        // if(this.player){
        //     this.player.dispose();
        // }
    }

    render() {
        return (
            <>
                <List shopWorthGoodsDetail={this.props.shopWorthGoodsDetail}  data={this.state.data}/>
            </>
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
