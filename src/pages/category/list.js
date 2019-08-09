import React,{useState,useEffect,useCallback,Fragment} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from './store/actionCreators';
import './list.scss';
import Product from './product';
import {ListView} from 'antd-mobile';
import PublicHeader from './../../components/header';

function List(props){
    console.log('matchs',props.match.params.id);
    const [data,setData] = useState([]);
    const [title,setTitle] = useState("");

    async function getCategory(){
        var payload = {
            OneCategoryId:props.match.params.id,
        };
        const result = await props.dispatchShopCategoryList(payload);
        setTitle(result[0].CategoryName);
    }

    async function getProductList(){
        var payload = {
            CategoryIds:[props.match.params.id],
            CurrentPage:1,
            PageSize:10
        };

        const result = await props.dispatchProductList(payload);
        setData(result);
    }

    useEffect(()=>{
        getCategory();
        getProductList();
    },[]);

    console.log('useEffect');

    return (
        <Fragment>
            <PublicHeader title={title}/>
            <div className="art-category__item">
                {
                    data && data.map((item,index)=>{
                    return (<Product {...item} key={Math.random()}/>)
                    })
                }
            </div>
        </Fragment>
    )
}


const mapStateToDispatch = (dispatch) =>({
    dispatchProductList:(data)=>dispatch(actionCreators.dispatchProductList(data)),
    dispatchShopCategoryList:(data)=>dispatch(actionCreators.dispatchShopCategoryList(data))
});

export default connect(null,mapStateToDispatch)(React.memo(List));