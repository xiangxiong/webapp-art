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

const Data = [];
let NEWDATAINDEX = 1;
for(let i=0;i<10;i++){
    Data.push(i)
};

var pushList=[];

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
            current:'visible',
            listData: Data
        };
        this.currentPage=1;//为你推荐 当前页 hidden
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

    componentWillMount(){
        NEWDATAINDEX = 1;
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
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        eventProxy.on('recomandItem',(object)=>{
            console.log('recomandItem',object);
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

// const mapDispatchToProps = dispatch => ({
//     getAdvertList: (type) => {
//         dispatch(getAdvertList(type))
//     },
//     getNewsPagerList: () => {
//         dispatch(getNewsPagerList({CategoryId: 3, CurrentPage: 1, PageSize: 3}))
//     },
//     getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) => dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
// });

export default connect(mapStateToProps, mapDispatchToProps)(Main);