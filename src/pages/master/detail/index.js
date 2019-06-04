import React,{Fragment,useState,useEffect} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import CarouselBanner from './../../common/carousel';
import {Tabs} from 'antd-mobile';
import {connect} from 'react-redux';
import {dispatchMasterDetail,dispatchMasterGetProduct} from '../store/actionCreators';
import { PRODIMGURL} from './../../../utils/api';
import history from './../../../utils/history';

const tabs = [
    { title: '成品专区' },
    { title: '定制专区' }
];

const MasterDetail = ({match,dispatchMasterDetail,dispatchMasterGetProduct}) =>
     {
        const [data,setData] = useState([]);
        const [master,setMaster] = useState({});
        const [productList,setProductList] = useState({});
        const [orderProductList,setOrderProductList] = useState({});

        async function getMasterApi(){
            var params = {
                CustomerId: Storage.Base.getInstance().get('userInfo').CustomerId,
                ProviderId: match.params.id
            };
            const response = await dispatchMasterDetail(params);
            setMaster(response);
            let pdtImages = [];

            if(response.PdtImgList){
                response.PdtImgList.map((item,key)=>{
                    pdtImages.push({
                        ImgUrl: `${PRODIMGURL}`+item
                    })
                });
             setData(pdtImages);
            }
        }

       function loadProduct(){
           if(productList.length>0){
                return productList.map((item,index)=>{
                    return (
                        // todo:ProductId 传递不过去.
                        <div onClick={()=>{ history.push('/detail',{ProductId:1})}} className="art-master__productlist-item" key={index}>
                            <img src="http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-02/art_1ebd26c7-b6bb-4304-b71e-d13492a110c0.jpg"/>
                            <h3>景德镇紫砂壶</h3>
                            <p>
                                {item.SalePrice} <i>￥  {item.MarketPrice}</i>
                            </p>
                        </div>
                     )
                })
           }
           return "";
       }
     
       function loadOrderProduct(){
            if(orderProductList.length>0){
                return orderProductList.map((item,index)=>{
                    return (<div onClick={(item)=>{ history.push('/detail',{ProductId:item.ProductId})}} className="art-master__productlist-item" key={index}>
                        <img src="http://res.laoliwuyou.com/pic/public/upload/paimai/2019-05-02/art_1ebd26c7-b6bb-4304-b71e-d13492a110c0.jpg"/>
                        <h3>景德镇紫砂壶</h3>
                        <p>
                            {item.SalePrice} <i>￥  {item.MarketPrice}</i>
                        </p>
                    </div>)
                })
        }
        return "";
       }

        async function getProductApi(saleType){
           var params = {
                CustomerId: Storage.Base.getInstance().get('userInfo').CustomerId,
                ProviderId: match.params.id,
                SaleType:saleType,
                CurrentPage:0,
                PageSize:10
           };

           const response = await dispatchMasterGetProduct(params);

           saleType === 10 ? setProductList(response.DataList) : setOrderProductList(response.DataList);
        }

        useEffect(() => {
            getMasterApi();
            getProductApi(10);
            getProductApi(20);
        },[]);

        return (
            <Fragment>
                <PublicHeader title="大师详情" bgColor="#E87908"/>
                <CarouselBanner  imgHeight="3.14rem" data={data}/>
                <h3 className="art-master_title">{master.ProviderName}</h3>
                <p className="art-master_goodat">
                擅 长: {master.Speciality} | 级 别: {master.AuthorTypeName} | 座右铭: {master.Motto}
                {/* 擅长：制壶   级别：国家级美术员   身价：700万  */}
                </p>
                <p className="art-master_award">
                    {/* 获奖经历：2018年获得《国家艺术金奖》 */}
                </p>
                <p className="art-master_resume">
                    个人简介：{master.Brief}
                </p>
                <p className="art-master_desc">
                    说    明：{master.Description}
                </p>
                <Tabs tabs={tabs} initialPage={0}>
                    <div style={{ display: 'flex', height: '1000px',backgroundColor: '#fff' }}>
                        <div className="art-master__productlist">
                            {loadProduct()}
                        </div>
                    </div>
                    <div style={{ display: 'flex', height: '1000px',backgroundColor: '#fff' }}>
                        <div className="art-master__productlist">
                            {loadOrderProduct()}
                        </div> 
                    </div>
                </Tabs>
            </Fragment>
        )
}

const mapStateToProps = (state) =>{
    return {
    }
}

const mapDispatchToProps ={
        dispatchMasterDetail:(data) => dispatchMasterDetail(data),
        dispatchMasterGetProduct:(data) => dispatchMasterGetProduct(data)
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(MasterDetail)) ;
