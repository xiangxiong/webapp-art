import React,{Fragment,useState,useEffect} from 'react';
import {connect} from 'react-redux';
import * as serviceKey from './store/actionCreators';
import './shop.scss';
import PublicHeader from './../../components/header';
import CategoryJD from 'react-category-jd';

const ShopCategroy = (props) =>{
    const [data,setData] = useState([]);

    async function getCategoryList(){
        const result = await props.dispatchShopCategoryList({});
        let response =[];
       
        if(result){
            for(let i = 0; i < result.length; i++){
              response.push({
                title: result[i].CategoryName,
                path: '/abc',
                children: []
              });
            }

            for(let i = 0; i < result.length; i++){
                if(result[i].Childs.length>0){
                  console.log('result[i].Childs[0].CategoryName',result[i].Childs[0].CategoryName);
                  response[i].children.push(
                    {
                      children: [
                        { title: result[i].Childs[0].CategoryName, path: '/categroyProducts/'+result[i].Childs[0].CategoryId, image: '//img20.360buyimg.com/focus/jfs/t13861/165/1416050485/4023/7a99270b/5a1fb902N806b102c.jpg' }
                      ],
                    }
                )
              }
            }
        }
        
        setData(response);
    }

    useEffect(()=>{
        getCategoryList();
    },[]);

    return (
        <Fragment>
            <PublicHeader title="商品分类"/>
            <CategoryJD dataSource={data}/>
        </Fragment>
    )
}

const mapStateToProps = ()=>({

});

const mapDispatchToProps = (dispatch)=>({
    dispatchShopCategoryList:(data)=>dispatch(serviceKey.dispatchShopCategoryList(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(ShopCategroy));