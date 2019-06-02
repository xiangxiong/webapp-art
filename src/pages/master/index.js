<<<<<<< HEAD
import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAdvertList, getNewsPagerList} from '../home/store/actionCreators';
import SearchCategory from  '../shop/search/index';
import CarouselBanner from '../common/carousel';
import Advert from './../common/advert';
import Letters from '../common/letters/index';
import Space from '../common/space';
import Column from '../common/column';
import Artist from '../common/artist/index';
import Title from './../common/title';
import {getRecommendAuthorList} from './store/actionCreators';

class Master extends PureComponent {
    render() {
        const {masterCarouselAdList, masterCommonAdList, masterNewsPagerList, masterProductCommendList = ['1'], masterUserLikeProductsList = ['2']} = this.props;

        return (
            <Fragment>
                <div className="art-master">
                    <SearchCategory/>
                    <CarouselBanner data={masterCarouselAdList}/>
                    <Column leftImgUrl={'30.png'} rightImgUrl={'31.png'}/>
                    <div className="art-master__hot">
                        <Title title="大师推荐" more="更多"/>
                        <div className="art-master__hot-content">
                            {masterProductCommendList.map((masterProductCommend, index) => {
                                return <Artist key={index.toString()} {...masterProductCommend}/>
                            })}
                        </div>
                    </div>
                    <div style={{borderBottom: '1px solid #E7E7E7'}}/>
                    <Letters data={masterNewsPagerList}/>
                    <Advert commonAdList={masterCommonAdList}/>
                    <Space/>
                    <div className="art-master__border"></div>
                    <div className="art-master__hot">
                        <Title title="为你推荐" more="更多"/>
                        <div className="art-master__hot-content">
                            {masterUserLikeProductsList.map((masterUserLikeProducts, index) => {
                                return <Artist key={index.toString()} {...masterUserLikeProducts}/>
                            })}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getMasterAdvertList(3);
        this.props.getMasterNewsPagerList();
        this.props.getMasterAdvertList(31);
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo') == null ? 0 : storage.get('userInfo').CustomerId;

        this.props.getRecommendAuthorList(CustomerId);
        this.props.getRecommendAuthorList(CustomerId, 1);
    }
}

const mapStateToProps = ({masters}) => {
    return {
        masterCarouselAdList: masters.masterCarouselAdList,
        masterCommonAdList: masters.masterCommonAdList,
        masterNewsPagerList: masters.masterNewsPagerList,
        masterProductCommendList: masters.masterProductCommendList,
        masterUserLikeProductsList: masters.masterUserLikeProductsList,
    }
};

const mapDispatchToProps = dispatch => ({
    getMasterAdvertList: (type) => {
        dispatch(getAdvertList(type))
    },
    getMasterNewsPagerList: () => {
        dispatch(getNewsPagerList({CategoryId: 5, CurrentPage: 1, PageSize: 3}))
    },
    getRecommendAuthorList: (CustomerId, IsHot) => {
        dispatch(getRecommendAuthorList({CustomerId, IsHot, CurrentPage: 1, PageSize: 4}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Master);

=======
import React,{PureComponent,Fragment,useState} from 'react';
import './index.scss';
import PublicHeader from './../../components/header';
import CarouselBanner from './../common/carousel';
import {Tabs, List} from 'antd-mobile';

const tabs = [
    { title: '成品专区' },
    { title: '定制专区' }
];

const Master = React.memo(
    props => {

        const [data,setData] = useState([
           { ImgUrl:'http://res.laoliwuyou.com/pic/public/upload/news/2019-05-26/art_9c2cd816-d455-46d9-8f0b-3d29ca78a676.jpg'}
        ]);

        console.log('data',data);

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
)

export default Master;
>>>>>>> add master
