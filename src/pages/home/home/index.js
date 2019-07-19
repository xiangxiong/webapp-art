import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {PICTUREURL} from '../../../utils/api';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {getAdvertList, getNewsPagerList, getUserLikeProducts} from '../store/actionCreators';
import CarouselBanner from '../../common/carousel';
import Column from '../../common/column';
import Advert from '../../common/advert';
import Letters from '../../common/letters/index';
import Space from '../../common/space';
import Product from './../../common/product';
import Title from './../../common/title';
import eventProxy from 'react-eventproxy';
import history from './../../../utils/history';
import { Toast } from 'antd-mobile';
import {IMGURL} from './../../../utils/api';

const Data = [];
let NEWDATAINDEX = 1;
for(let i=0;i<10;i++){
    Data.push(i)
};
var pushList=[];
const cloumnData = [
    {title:'「 好货推荐 」', name: '上千件好物等你来选',url:'./shopCategroy'},
    {title:'「 超值团购 」', name: '邀请好友一起拼团',url:'./group'}
];

class Main extends PureComponent{
    
    constructor(props) {
        super(props);
        this.navDataList = [
            {imageUrl: `${IMGURL}/icon/master.svg`, name: '大师云集',url:'/category'},
            {imageUrl: `${IMGURL}/icon/atshop.svg`, name: '线下活动',url:'/shiji'},
            {imageUrl: `${IMGURL}/icon/shop.svg`, name: '艺商城',url:'/shop'},
            {imageUrl: `${IMGURL}/icon/community.svg`, name: '艺社区',url:'/community'},
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
            current:'visible',
            listData: Data,
            show:false
        };
        this.currentPage=1;//为你推荐 当前页 hidden
        // this.handleScroll = this.handleScroll.bind(this);
        // this.HandleBackTop = this.HandleBackTop.bind(this);
    }

    // handleScroll(event){
    //     let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    //     console.log('scrollTop',scrollTop);
    //     if(scrollTop>100){
    //         this.setState({
    //             show:false
    //         })
    //     }
    //     else{
    //         this.setState({
    //             show:false
    //         })
    //     }
    // }

    // HandleBackTop(){
    //     console.log('HandleBackTop',document.documentElement.scrollTop);
    //     // document.body.scrollTop = 0;
    // }

    componentWillMount(){
        NEWDATAINDEX = 1;
        // window.addEventListener('scroll',this.handleScroll,true);
    }

    HandleJumpUrl(url){
        if(url==="/shiji"){
            Toast.success("正在开发中",1);
            return;
        }
        else if(url === "/shop"){
            history.push('/home?tab=Shop');
            eventProxy.trigger('selectedTab','redTab')
            return;
        }else{
            if(url === "/category"){
                eventProxy.trigger('navitem','大师云集');
            }
            history.push(url);
        }
    }

    showRecomandItem() {
        var items = [];
        if(pushList.length<=0){
            return;
        }
        pushList.map((item,key)=>{
            for (var i = 0; i < item.DataList.length; i++) {
                items.push(<Product {...item.DataList[i]} key={Math.random()}/>);
            }
        });
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
                    let storage = Storage.Base.getInstance();
                    let CustomerId = storage.get('userInfo') === null ? 0 :storage.get('userInfo').CustomerId ;
                    this.props.getUserLikeProducts(CustomerId, this.currentPage).then(() => {
                        this.setState({hasMoreItems: true});
                    });
                });
            },200);
        }
    }

    render() {
        const {carouselAdList, commonAdList, newsPagerList} = this.props;

        return (
            <Fragment>
                <div className="art-main">
                      {
                        /*
                            <div className={scrollCss} style={{'visibility':current}}>
                                <div className={address}>上海</div>
                                <div>
                                    <input className={searchCss} placeholder="大家都在搜紫砂壶"/>
                                </div>
                                <div className="art-icon art-icon-helper"></div>
                            </div>
                        */
                      }
                        <CarouselBanner data={carouselAdList}/>
                        <div className="art-main__navitem">
                                {
                                    this.navDataList.map((navData, index) => {
                                        return (
                                            <div key={index.toString()}>
                                                <div className="art-main__navitem-img-wrapper" onClick={this.HandleJumpUrl.bind(this,navData.url)}>
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
                        <Column cloumnData={cloumnData}  leftImgUrl={'/icon/8.png'} rightImgUrl={'/icon/9.png'}/>
                        <div className="art-main__recommend">
                            <Title title="为你推荐"/>
                            <div className="art-main__recommend-content">
                                {this.showRecomandItem()}
                            </div>
                        </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        eventProxy.on('recomandItem',(object)=>{
            pushList.push(object);
            this.forceUpdate();
        });
        this.props.getAdvertList(1);
        this.props.getNewsPagerList();
        this.props.getAdvertList(11);
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo') == null ? 0 : storage.get('userInfo').CustomerId;
        this.props.getUserLikeProducts(CustomerId, this.currentPage);
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

const mapDispatchToProps = (dispatch) => {
    return {
        getAdvertList: type => dispatch(getAdvertList(type)),
        getNewsPagerList: data => dispatch(getNewsPagerList({CategoryId: 3, CurrentPage: 1, PageSize: 3})),
        getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) => dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);


