import React,{Fragment,useState,useEffect} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import CarouselBanner from './../../common/carousel';
import {Tabs} from 'antd-mobile';
import {connect} from 'react-redux';
import {dispatchMasterDetail} from '../store/actionCreators';

const tabs = [
    { title: '成品专区' },
    { title: '定制专区' }
];

const MasterDetail = ({match,dispatchMasterDetail}) =>
     {
        const [data,setData] = useState([
           { ImgUrl:'http://res.laoliwuyou.com/pic/public/upload/news/2019-05-26/art_9c2cd816-d455-46d9-8f0b-3d29ca78a676.jpg'}
        ]);

        const [master,setMaster] = useState({});

        async function getMasterApi(){
            var params = {
                CustomerId: Storage.Base.getInstance().get('userInfo').CustomerId,
                AuthorId: match.params.id
            };
            const response = await dispatchMasterDetail(params);
            console.log('response',response);
            setMaster(response);
        }
        
        useEffect(() => {
            getMasterApi();
        },[])

        return (
            <Fragment>
                <PublicHeader title="大师详情" bgColor="#E87908"/>
                <CarouselBanner  data={data}/>
                <h3 className="art-master_title">景德镇刘毅大师</h3>
                <p className="art-master_goodat">
                    擅长：制壶   级别：国家级美术员   身价：700万 
                </p>
                <p className="art-master_award">
                    获奖经历：2018年获得《国家艺术金奖》
                </p>
                <p className="art-master_resume">
                    个人简介：是近现代中国绘画大师，世界文化名人。早年曾为木工，后以
                </p>
                <p className="art-master_desc">
                    说      明：本作品由大师本人制作
                    由艺术大家质检运输并提供售后
                    成品预计5个工作日内发货
                    定制作品由工艺难度而定发货
                </p>
                <Tabs tabs={tabs} initialPage={0}>
                    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', height: '300px',backgroundColor: '#fff' }}>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center',justifyContent: 'center', height: '300px',backgroundColor: '#fff' }}>
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
