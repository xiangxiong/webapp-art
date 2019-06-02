import React,{Fragment,useState,useEffect} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import CarouselBanner from './../../common/carousel';
import {Tabs} from 'antd-mobile';
import {connect} from 'react-redux';
import {dispatchMasterDetail} from '../store/actionCreators';
import { PRODIMGURL} from './../../../utils/api';

const tabs = [
    { title: '成品专区' },
    { title: '定制专区' }
];

const MasterDetail = ({match,dispatchMasterDetail}) =>
     {
        const [data,setData] = useState([]);
        const [master,setMaster] = useState({});

        async function getMasterApi(){
            var params = {
                CustomerId: Storage.Base.getInstance().get('userInfo').CustomerId,
                ProviderId: match.params.id
            };
            const response = await dispatchMasterDetail(params);

            setMaster(response);

            console.log('response',response);
            let pdtImages = [];

            response.PdtImgList.map((item,key)=>{
                pdtImages.push({
                    ImgUrl: `${PRODIMGURL}`+item
                })
            });

            setData(pdtImages);
        }

        useEffect(() => {
            getMasterApi();
        },[]);

        return (
            <Fragment>
                <PublicHeader title="大师详情" bgColor="#E87908"/>
                <CarouselBanner  data={data}/>
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
                    说      明：{master.Description}
                </p>
                <Tabs tabs={tabs} initialPage={0}>
                    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', height: '300px',backgroundColor: '#fff' }}>
                            成品专区.
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', height: '300px',backgroundColor: '#fff' }}>
                            定制专区
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
        dispatchMasterDetail:(data) => dispatchMasterDetail(data)
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(MasterDetail)) ;
