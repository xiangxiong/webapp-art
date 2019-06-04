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
        const {masterCarouselAdList, masterCommonAdList, masterNewsPagerList, masterProductCommendList=[], masterUserLikeProductsList = []} = this.props;

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

