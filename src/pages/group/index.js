import PublicHeader from './../../components/header';
import React,{Fragment,useState,useEffect} from 'react';
import './index.scss';
import history from './../../utils/history';
import {connect} from 'react-redux';
import * as actionCreators from './store/actionCreators';
import {PRODIMGURL} from './../../utils/api';

const Group = ({dispatchGroupList}) =>{

    const [productList,setProductList] = useState([]);

    async function loadData(){
        var payLoad = {
            CurrentPage:1,
            PageSize:10
        };
       const result = await dispatchGroupList(payLoad);
       setProductList(result.Data.DataList);
    }
    
    useEffect(()=>{
        loadData();
    },[]);

    return (
        <Fragment>
            <PublicHeader title="超值团购"/>
            <div className="art-group__super" style={{background: 'url("http://res.laoliwuyou.com/icon/44.png") 0% 0% / cover'}}>
            </div>

            <div className="art-group__product">
                {
                    productList.map((item,index)=>{
                        return (
                            <div className="art-group__product-item" key={index} onClick={()=>{ history.push('./groupdetail',{PromotionId:item.PromotionId})}}>
                                <div style={{background: `url(${PRODIMGURL+item.ImgPath}) 0% 0% / cover`}}>
                                </div>
                                <h4>{item.ProductName}</h4>
                                <p>团购价：￥{item.LimitPrice} <i className="art-group__product-price">原价：￥{item.MarketPrice} </i> </p>
                                <p>{item.JoinBuyer}人团购 <i className="art-group__product-join">已有{item.LockCount}人参团</i></p>
                            </div>
                        )
                    })
                }
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) =>{
    return {
    }
}

const mapDispatchToProps = (dispatch) => ({
    dispatchGroupList: (data) => dispatch(actionCreators.dispatchGroupList(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Group));