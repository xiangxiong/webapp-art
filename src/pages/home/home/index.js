import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';
import {connect} from 'react-redux';
import classNames from 'classnames';
import InfiniteScroll from 'react-infinite-scroller';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../store/actionCreators';
import CarouselBanner from '../../common/carousel';
import Column from '../../common/column';
import Advert from '../../common/advert';
import Letters from '../../common/letters/index';
import Space from '../../common/space';
import Product from './../../common/product';
import Title from './../../common/title';
import eventProxy from 'react-eventproxy';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

class Main extends PureComponent{

    constructor(props) {
        super(props);
        this.navDataList = [
            {imageUrl: `${PICTUREURL}2.png`, name: '大师云集'},
            {imageUrl: `${PICTUREURL}3.png`, name: '市集'},
            {imageUrl: `${PICTUREURL}4.png`, name: '艺商城'},
            {imageUrl: `${PICTUREURL}5.png`, name: '艺社区'},
        ];
        this.state = {
            imgHeight: 176,
            scrollCss:classNames(
                'art-main__search',
                {
                    'art-main__search-bg':false
                }
            ),
            searchCss:classNames('art-main__search-input',{
                'art-main__search-input-bg':false
            }),
            address:classNames('art-main__search-address',{
                'art-main__search-address-bg':false
            }),
            hasMoreItems: true,
            current:'visible'
        };
        this.currentPage=1;//为你推荐 当前页 hidden
    }

    showRecomandItem() {
        const {DataList = []} = this.props.userLikeProducts;
        var items = [];
        for (var i = 0; i < DataList.length; i++) {
            items.push(<Product {...DataList[i]} index={i} key={i.toString()}/>);
        }
        return items;
    }

    loadMoreItem(){
        const {DataList = [], TotalRecords} = this.props.userLikeProducts;
        if (DataList.length >= TotalRecords) {
            this.setState({hasMoreItems:false});
        }else{
            setTimeout(() => {
                this.setState({hasMoreItems: false}, () => {
                    this.currentPage = ++this.currentPage;
                    this.props.getUserLikeProducts(11, this.currentPage).then(() => {
                        this.setState({hasMoreItems: true});
                    });
                });
            }, 200);
        }
    }
    
    render() {
        const {carouselAdList, commonAdList, newsPagerList} = this.props;
        const {scrollCss,searchCss,address,current} = this.state;
        // ref="artScroll"
        // style={{overflow:"auto",height:document.documentElement.clientHeight}}

        return (
            <Fragment>
                <div className="art-main">
                    <div className={scrollCss} style={{'visibility':current}}>
                        <div className={address}>上海</div>
                        <div>
                            <input className={searchCss} placeholder="大家都在搜紫砂壶"/>
                        </div>
                        <div className="art-icon art-icon-helper"></div>
                    </div>

                    {/* <InfiniteScroll
                        loadMore={this.loadMoreItem.bind(this)}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="art-main__loader" key={0}> 正在努力加载中... </div>}
                        useWindow={false}> */}

                        <CarouselBanner data={carouselAdList}/>

                        <div className="art-main__navitem">
                                {
                                    this.navDataList.map((navData, index) => {
                                        return (
                                            <div key={index.toString()}>
                                                <div className="art-main__navitem-img-wrapper">
                                                    <img className="art-main__navitem-img" src={navData.imageUrl}/>
                                                </div>
                                                <span className="art-main__navitem-title" >{navData.name}</span>
                                            </div>
                                        )
                                    })
                                }
                        </div>

                        <Letters data={newsPagerList}/>

                        <Advert commonAdList={commonAdList}/>

                        <Space/>

                        <Column leftImgUrl={'30.png'} rightImgUrl={'31.png'}/>

                        <div className="art-main__recommend">
                            <Title title="为你推荐"/>
                            <div className="art-main__recommend-content">
                                {this.showRecomandItem()}
                            </div>
                        </div>
                    {/* </InfiniteScroll> */}
                </div>
            </Fragment>
        )
    }

    componentWillMount(){
    }

    componentDidMount() {
        eventProxy.on('trigger-search', (current) => {
            console.log('current',current);
            if(current==='USER' || current === 'ARTSHOP'){
                this.setState({
                    current:'hidden'
                });
            }
            if(current === 'MAIN'){
                this.setState({
                    current:'visible'
                });
            }
            // this.setState({current: current});
        });
        // this.refs.artScroll.addEventListener("scroll",()=>{
        //     // console.log('addEventListener');
        //     // console.log('this.refs.myscroll.scrollTop',);
        //     // console.log('this.refs.myscroll.clientHeight ',this.refs.artScroll.clientHeight );
        //     if(this.refs.artScroll.scrollTop>176){
        //         this.setState({
        //             scrollCss:classNames(
        //                 'art-main__search',
        //                 {
        //                     'art-main__search-bg':true
        //                 }
        //             ),
        //             searchCss:classNames('art-main__search-input',{
        //                 'art-main__search-input-bg':true
        //             }),
        //             address:classNames('art-main__search-address',{
        //                 'art-main__search-address-bg':true
        //             })
        //         })
        //     }
        //     else{
        //         this.setState({
        //             scrollCss:classNames(
        //                 'art-main__search',
        //                 {
        //                     'art-main__search-bg':false
        //                 }
        //             ),
        //             searchCss:classNames('art-main__search-input',{
        //                 'art-main__search-input-bg':false
        //             }),
        //             address:classNames('art-main__search-address',{
        //                 'art-main__search-address-bg':false
        //             })
        //         })
        //     }
        // });
        this.props.getAdvertList(1);
        this.props.getNewsPagerList();
        this.props.getAdvertList(11);
        this.props.getUserLikeProducts(11, this.currentPage);
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

    getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) =>
        dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);