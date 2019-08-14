import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getWorthGoodsDetail, getProductComment, getCollectin, getProductDetail} from '../store/actionCreators';
import {getModifyCart, dispatchVideoPalyer} from '../../cart/store/actionCreators';
import List from './List';

class Detail extends React.Component{

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

    render() {
        return (
            <>
              <List 
                showProductComment={this.props.showProductComment}
                shopWorthGoodsDetail={this.props.shopWorthGoodsDetail}  
                getModifyCart={this.props.getModifyCart}
                getCollectin={this.props.getCollectin}
                />
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
