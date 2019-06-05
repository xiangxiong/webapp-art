import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getCustomerDetail} from './store/actionCreators';
import history from './../../utils/history';
import {pictureUrl} from '../../utils/common';
import Header from './center/header';
import {Tabs, List} from 'antd-mobile';
import OrderItem from './center/order';
import {getUserLikeProducts, clearUserLikeProducts} from '../home/store/actionCreators';
import {getWeChatOauth} from './store/actionCreators';
import Product from '../common/product';
import Title from '../common/title';
import InfiniteScroll from 'react-infinite-scroller';
import '../../utils/storage';
import {PRODUCTURL} from './../../utils/api';
import _ from 'lodash';

const Item = List.Item;
const styles = {};
styles.tab = {
    backgroundColor: '#fff',
    height: "40px"
}

const navItems = [
    {
        title: '发布作品',
        icon: 'art-icon art-icon-user-release',
        routeUrl: '/work'
    },
    {
        title: '作品库',
        icon: 'art-icon art-icon-user-works',
        routeUrl: '/worklist'
    },
    {
        title: '发布大师印象',
        icon: 'art-icon art-icon-user-release-master',
        routeUrl: ''
    },
    {
        title: '订单管理',
        icon: 'art-icon art-icon-user-order',
        routeUrl: ''
    }
];

const customerNavItems = [
    {
        title: '协议规则',
        icon: 'art-icon art-icon-user-rule',
        routeUrl: ''
    },
    {
        title: '收货地址',
        icon: 'art-icon art-icon-user-recepter',
        routeUrl: '/addressList'
    },
    {
        title: '联系客服(9:00-21:30)',
        icon: 'art-icon art-icon-user-service',
        routeUrl: ''
    }
];

const normalNavItems = [
    {
        title: '合作入驻',
        icon: 'art-icon art-icon-user-cor',
        routeUrl: '/enter'
    },
    {
        title: '好货推荐',
        icon: 'art-icon art-icon-user-recomand',
        routeUrl: ''
    },
    {
        title: '提现',
        icon: 'art-icon art-icon-user-cash',
        routeUrl: '/withdraw'
    },
    {
        title: '银行卡',
        icon: 'art-icon art-icon-user-cash',
        routeUrl: '/bankCardList'
    },
    {
        title: '协议规则',
        icon: 'art-icon art-icon-user-rule',
        routeUrl: ''
    },
    {
        title: '收货地址',
        icon: 'art-icon art-icon-user-recepter',
        routeUrl: '/addressList'
    },
    {
        title: '联系客服(9:00-21:30)',
        icon: 'art-icon art-icon-user-service',
        routeUrl: ''
    }
];

class User extends PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            user: '卖家',
            hasMoreItems: true,
            ProviderStatus:1
        };
        this.currentPage = 1;//为你推荐 当前页
        this.init();
    }

    init(){
        let storage = Storage.Base.getInstance();
        let userInfo = storage.get('userInfo');
        if(userInfo == null ){
             history.push('./oauth');
             return;
        }
        else if(userInfo.Register === false){
            history.push('./bind');
            return;
        }
    }

    bindEvents(){
        this.handleNavUrl = this.handleNavUrl.bind(this);
        this.handleTestClick = this.handleTestClick.bind(this);
    }

    handleNavUrl(url) {
        history.push(url, {customerDetail: this.props.customerDetail});
    }

    bindSellList() {
        return navItems.map((navItem, index) => {
            return (
                <List key={index.toString()}>
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.handleNavUrl(navItem.routeUrl)
                        }}>
                        <div><span className={navItem.icon}></span> {navItem.title}</div>
                    </Item>
                </List>
            )
        })
    }

    bindBuyList() {
        const {ProviderStatus} = this.state;
        const navItems  = ProviderStatus === 1 ?  customerNavItems : normalNavItems;

        return navItems.map((navItem, index) => {
            return (
                <List key={index.toString()}>
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.handleNavUrl(navItem.routeUrl)
                        }}>
                        <div><span className={navItem.icon}></span> {navItem.title}</div>
                    </Item>
                </List>
            )
        })
    }

    showRecomandItem() {
        const {DataList = []} = this.props.userLikeProducts;
        var items = [];
        for (var i = 0; i < DataList.length; i++) {
            items.push(<Product {...DataList[i]} index={i} key={i.toString()}/>);
        }
        return items;
    }

    loadMoreItem() {
        const {DataList = [], TotalRecords} = this.props.userLikeProducts;

        if (DataList.length >= TotalRecords) {
            this.setState({hasMoreItems: false});
        } else {
            setTimeout(() => {
                this.setState({hasMoreItems: false}, () => {
                    this.currentPage = ++this.currentPage;
                    let storage = Storage.Base.getInstance();
                    let customerId = storage.get('userInfo').CustomerId;
                    this.props.getUserLikeProducts(customerId, this.currentPage).then(() => {
                        this.setState({hasMoreItems: true});
                    });
                });
            }, 200);
        }
    }


    render() {
        const {ProviderStatus} = this.state;
         
        const tabs  = ProviderStatus === 1 ?  [
            {title: '我是买家'},
            {title: '我是卖家'}
        ] : [
            {title: '我是买家'}
        ];


        const {
            UserName = '',
            ImageThumb,
            Money = '',
            CollectCount = '',
            FollowCount = '',
            VisitCount = '',
            GroupCount = '',
            AwaitPayCount,
            AwaitShipCount,
            AwaitReceiptCount = '',
            AwaitCommentCount = '',
            CustomerType
        } = this.props.customerDetail || { };

        var ObjectItem = this.props.customerDetail.ProviderInfo;
        for(var item in ObjectItem){
            let storage = Storage.Base.getInstance();
            storage.set('ProviderStatus',ObjectItem[item]);
            if(item==='ProviderStatus'){
                this.setState({
                    ProviderStatus:ObjectItem[item]
                })
            }
            if(item === 'CategoryId'){
                storage.set('CategoryId',ObjectItem[item]);
            }
            if(item === 'ProviderId'){
                storage.set('ProviderId',ObjectItem[item]);
            }
        }

        return (
            <Fragment>
                <Header
                    src={pictureUrl(ImageThumb)}
                    UserName={UserName}
                    Money={Money}
                    CollectCount={CollectCount}
                    FollowCount={FollowCount}
                    VisitCount={VisitCount}
                    GroupCount={GroupCount}
                />
                <Tabs tabs={tabs} initialPage={0}>
                    <div style={styles.tab}>
                        <InfiniteScroll
                            loadMore={this.loadMoreItem.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            loader={<div className="art-user__loader" key={0}> 正在努力加载中... </div>}
                            useWindow={false}>
                            <OrderItem
                                AwaitPayCount={AwaitPayCount}
                                AwaitShipCount={AwaitShipCount}
                                AwaitReceiptCount={AwaitReceiptCount}
                                AwaitCommentCount={AwaitCommentCount}
                            />
                            <div className="art-user__space"></div>
                            <div className="art-user__nav">
                                {this.bindBuyList()}
                            </div>
                            <div className="art-user__recommend">
                                <Title title="为你推荐"/>
                                <div className="art-user__recommend-content">
                                    {this.showRecomandItem()}
                                </div>
                            </div>
                        </InfiniteScroll>
                    </div>
                    <div style={styles.tab}>
                        <div className="art-user__nav">
                            {this.bindSellList()}
                        </div>
                    </div>
                </Tabs>
            </Fragment>
        )
    }

    async getWeChatOauth(){
        const data = {
            Url:encodeURIComponent(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd78e408c5668f65f&redirect_uri=${PRODUCTURL}&response_type=code&scope=snsapi_userinfo&state=vueapp#wechat_redirect`)
        };
        const result = await this.props.getWeChatOauth(data);
        console.log('result',result);
    }

    componentDidMount(){
        let storage = Storage.Base.getInstance();
        let userInfo = storage.get('userInfo');
        if(userInfo == null ){
             history.push('./oauth');
             return;
        }
        else if (userInfo.Register === false){
            history.push('./bind');
            return;
        }
        else {
            let customerId = userInfo.CustomerId;
            this.props.getCustomerDetail(customerId);
            this.props.clearUserLikeProducts();
            this.props.getUserLikeProducts(customerId,this.currentPage);
            this.getWeChatOauth();
        }
    }
}

const mapStateToProps = ({user, home}) => {
    return {
        customerDetail: user.customerDetail,
        userLikeProducts: home.userLikeProducts,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
            getWeChatOauth:(params)=>dispatch(getWeChatOauth(params)),
            clearUserLikeProducts: () =>  dispatch(clearUserLikeProducts()),
            getCustomerDetail: (CustomerId) => dispatch(getCustomerDetail({CustomerId})),
            getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) =>
                dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
