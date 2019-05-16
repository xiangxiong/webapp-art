import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import NavItem from './../nav/index';
import Column from '../column/index';
import ProductionItem from './../production/index';
import Letters from './../letters/index';
import {PICTUREURL} from '../../../utils/api';
import {Carousel} from 'antd-mobile';
import {connect} from 'react-redux';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../store/actionCreators';

class Main extends PureComponent {

    constructor(props) {
        super(props);

        this.navDataList = [
            {imageUrl: `${PICTUREURL}2.png`, name: '大师云集'},
            {imageUrl: `${PICTUREURL}3.png`, name: '市集'},
            {imageUrl: `${PICTUREURL}4.png`, name: '艺商城'},
            {imageUrl: `${PICTUREURL}5.png`, name: '艺社区'},
        ];
    }

    render() {
        const {carouselAdList, commonAdList, newsPagerList, userLikeProducts} = this.props;

        return (
            <Fragment>
                <div className="art-main__header">
                    <div className="art-main__header___carousel">
                        <Carousel
                            autoplay={false}
                            infinite
                        >
                            {carouselAdList.map((carouselAd, index) => (
                                <a
                                    key={index.toString()}
                                    href={carouselAd.SkipUrl}
                                    style={{
                                        display: 'inline-block',
                                        width: '375px',
                                        height: '176px',
                                    }}
                                >
                                    <img
                                        src={carouselAd.ImgUrl}
                                        style={{width: '375px', height: '176px'}}
                                    />
                                </a>
                            ))}
                        </Carousel>
                    </div>

                    <div className="art-main__header___search">
                        <span>上海</span>
                        <div>
                            <img src={`${PICTUREURL}51.png`}/>
                            <span>大家都在搜紫砂壶</span>
                        </div>
                        <img src={`${PICTUREURL}2.png`}/>
                    </div>
                </div>

                <section className="art-main__navitem">
                    {this.navDataList.map((navData, index) => {
                        return (
                            <div key={index.toString()}>
                                <NavItem {...navData}/>
                            </div>)
                    })}
                </section>

                <div className="art-main__special">
                    <Letters data={newsPagerList}/>
                </div>

                <div className="art-main__recomand">
                    {commonAdList && commonAdList.length > 0 ? <img src={commonAdList[0].ImgUrl}/> : null}
                </div>

                <div className="art-main__interval"/>

                <div className="art-main__column">
                    <Column leftPictureUrl={`${PICTUREURL}30.png`} rightPictureUrl={`${PICTUREURL}31.png`}/>
                </div>

                <h3 className="art-main__recommend">为你推荐</h3>

                <div className="art-main__recommendProduct">
                    <div>
                        {userLikeProducts.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                   {/* <ProductionItem {...production}/>*/}
                                </div>)
                        })}
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getAdvertList(1);
        this.props.getNewsPagerList();
        this.props.getAdvertList(11);
        this.props.getUserLikeProducts(11, 1);
    }
}

const mapStateToProps = ({home}) => {
    return {
        carouselAdList: home.carouselAdList,
        commonAdList: home.commonAdList,
        newsPagerList: home.newsPagerList,
        userLikeProducts: home.userLikeProducts,
    }
};

const mapDispatchToProps = dispatch => ({
    getAdvertList: (type) => {
        dispatch(getAdvertList(type))
    },

    getNewsPagerList: () => {
        dispatch(getNewsPagerList({CategoryId: 3, CurrentPage: 1, PageSize: 3}))
    },

    getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 10) => {
        dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);