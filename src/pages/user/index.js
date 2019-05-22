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
import Product from '../common/product';
import Title from '../common/title';
import InfiniteScroll from 'react-infinite-scroller';

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
        title: '发布大师印象',
        icon: 'art-icon art-icon-user-release-master',
        routeUrl: ''
    },
    {
        title: '作品库',
        icon: 'art-icon art-icon-user-works',
        routeUrl: ''
    },
    {
        title: '订单管理',
        icon: 'art-icon art-icon-user-order',
        routeUrl: ''
    },
    {
        title: '提现',
        icon: 'art-icon art-icon-user-cash',
        routeUrl: ''
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
        title: '我的银行卡',
        icon: 'art-icon art-icon-user-bankcard',
        routeUrl: ''
    },
    {
        title: '联系客服(9:00-21:30)',
        icon: 'art-icon art-icon-user-service',
        routeUrl: ''
    }
];

const customerNavItems = [
    {
        title: '合作入住',
        icon: 'art-icon art-icon-user-cor',
        routeUrl: '/application'
    },
    {
        title: '好货推荐',
        icon: 'art-icon art-icon-user-recomand',
        routeUrl: ''
    },
    {
        title: '提现',
        icon: 'art-icon art-icon-user-cash',
        routeUrl: ''
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

class User extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            user: '卖家',
            hasMoreItems: true
        };
        this.currentPage = 1;//为你推荐 当前页
        this.bindEvents();
    }

    bindEvents() {
        this.handleNavUrl = this.handleNavUrl.bind(this);
        this.handleTestClick = this.handleTestClick.bind(this);
    }

    handleNavUrl(url) {
        history.push(url);
    }

    bindSellList() {
        return navItems.map((navItem, index) => {
            const activeSpace = navItem.title === "订单管理" ? <div className="art-user__space"></div> : "";
            return (
                <List key={index.toString()}>
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.handleNavUrl(navItem.routeUrl)
                        }}>
                        <div><span className={navItem.icon}></span> {navItem.title}</div>
                    </Item>
                    {activeSpace}
                </List>
            )
        })
    }

    bindBuyList() {
        return customerNavItems.map((navItem, index) => {
            const activeSpace = navItem.title === "提现" ? <div className="art-user__space"></div> : "";
            return (
                <List key={index.toString()}>
                    <Item
                        arrow="horizontal"
                        onClick={() => {
                            this.handleNavUrl(navItem.routeUrl)
                        }}>
                        <div><span className={navItem.icon}></span> {navItem.title}</div>
                    </Item>
                    {activeSpace}
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
        debugger;
        const {DataList = [], TotalRecords} = this.props.userLikeProducts;

        if (DataList.length >= TotalRecords) {
            this.setState({hasMoreItems: false});
        } else {
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
    
    handleTestClick(){
        history.push('/oauth');
    }
    
    render() {
        const tabs = [
            {title: '我是买家'},
            {title: '我是卖家'}
        ];

        const {
            UserName = '',
            ImageThumb,
            Money = '',
            CollectCount = '',
            FollowCount = '',
            VisitCount = '',
            GroupCount = '',
            AwaitPayCount = '',
            AwaitShipCount = '',
            AwaitReceiptCount = '',
            AwaitCommentCount = ''
        } = this.props.customerDetail;

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
                <div onClick={this.handleTestClick}>测试</div>
                <Tabs tabs={tabs} initialPage={1}>
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
                        <OrderItem
                            AwaitPayCount={AwaitPayCount}
                            AwaitShipCount={AwaitShipCount}
                            AwaitReceiptCount={AwaitReceiptCount}
                            AwaitCommentCount={AwaitCommentCount}
                        />
                        <div className="art-user__space"></div>
                        <div className="art-user__nav">
                            {this.bindSellList()}
                        </div>
                    </div>
                </Tabs>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.clearUserLikeProducts();
        this.props.getCustomerDetail('11');
        this.props.getUserLikeProducts(11, this.currentPage);
    }
}

const mapStateToProps = ({user, home}) => {
    return {
        customerDetail: user.customerDetail,
        userLikeProducts: home.userLikeProducts,
    }
};

const mapDispatchToProps = dispatch => ({
    clearUserLikeProducts: () => {
        dispatch(clearUserLikeProducts())
    },
    getCustomerDetail: (CustomerId) => {
        dispatch(getCustomerDetail({CustomerId}))
    },
    getUserLikeProducts: (CustomerId, CurrentPage, PageSize = 2) =>
        dispatch(getUserLikeProducts({CustomerId, Position: 1, CurrentPage, PageSize}))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
