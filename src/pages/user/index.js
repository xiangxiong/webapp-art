import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getCustomerDetail} from './store/actionCreators';
import history from './../../utils/history';
import {pictureUrl} from '../../utils/stringUtil';
import Header from './center/header';
import { Tabs,List } from 'antd-mobile';
import OrderItem from './center/order';

const Item = List.Item;

const styles = {};
styles.tab = { 
    backgroundColor: '#fff',
    height:"40px"
}

const navItems = [
    {
        title:'发布作品',
        icon:'art-icon art-icon-user-release',
        routeUrl:'/work'
    },
    {
        title:'发布大师印象',
        icon:'art-icon art-icon-user-release-master',
        routeUrl:''
    },
    {
        title:'作品库',
        icon:'art-icon art-icon-user-works',
        routeUrl:''
    },
    {
        title:'订单管理',
        icon:'art-icon art-icon-user-order',
        routeUrl:''
    },
    {
        title:'提现',
        icon:'art-icon art-icon-user-cash',
        routeUrl:''
    },
    {
        title:'协议规则',
        icon:'art-icon art-icon-user-rule',
        routeUrl:''
    },
    {
        title:'收货地址',
        icon:'art-icon art-icon-user-recepter',
        routeUrl:'/addressList'
    },
    {
        title:'我的银行卡',
        icon:'art-icon art-icon-user-bankcard',
        routeUrl:''
    },
    {
        title:'联系客服(9:00-21:30)',
        icon:'art-icon art-icon-user-service',
        routeUrl:''
    }
]

const customerNavItems = [
    {
        title:'合作入住',
        icon:'art-icon art-icon-user-cor',
        routeUrl:'/application'
    },
    {
        title:'好货推荐',
        icon:'art-icon art-icon-user-recomand',
        routeUrl:''
    },
    {
        title:'提现',
        icon:'art-icon art-icon-user-cash',
        routeUrl:''
    },
    {
        title:'协议规则',
        icon:'art-icon art-icon-user-rule',
        routeUrl:''
    },
    {
        title:'收货地址',
        icon:'art-icon art-icon-user-recepter',
        routeUrl:'/addressList'
    },
    {
        title:'联系客服(9:00-21:30)',
        icon:'art-icon art-icon-user-service',
        routeUrl:''
    }
];

class User extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            user:'卖家'
        };

        this.bindEvents();
    }

    bindEvents(){
        this.handleNavUrl = this.handleNavUrl.bind(this);
    }

    handleNavUrl(url){
        history.push(url);
    }

    bindSellList(){
       return navItems.map(navItem=>{
            const activeSpace =  navItem.title==="订单管理" ?  <div className="art-user__space"></div> : "";
            return (
                <List>
                    <Item
                    arrow="horizontal"
                    onClick={()=>{
                        this.handleNavUrl(navItem.routeUrl)
                    }}>
                        <div> <span className={navItem.icon}></span> {navItem.title}</div>
                    </Item>
                    {activeSpace}
                </List>
            )
        })
    }

    bindBuyList(){
        return customerNavItems.map(navItem=>{
            const activeSpace =  navItem.title==="提现" ?  <div className="art-user__space"></div> : "";
            return (
                <List>
                    <Item
                    arrow="horizontal"
                    onClick={()=>{
                        this.handleNavUrl(navItem.routeUrl)
                    }}>
                        <div> <span className={navItem.icon}></span> {navItem.title}</div>
                    </Item>
                    {activeSpace}
                </List>
            )
        })
    }

<<<<<<< HEAD
=======
    otherInfoItem(number, name) {
        return (
            <div>
                <span>{number}</span>
                <span>{name}</span>
            </div>
        )
    }

    orderInfoItem(number, name, url, isShowBorderRight = true) {

        return (
            <div>
                <div style={{visibility: +number > 0 ? 'visible' : 'hidden'}}>
                    <span>{number}</span>
                </div>

                <div style={{
                    borderRightColor: '#DFDFDF',
                    borderRightStyle: 'solid',
                    borderRightWidth: isShowBorderRight ? '1px' : '0px'
                }}>
                    <img src={url}/>
                    <span>{name}</span>
                </div>
            </div>
        )
    }

    itemLeftIcon(url) {
        return (
            <img src={url} style={{width: '17px', height: '17px'}}/>
        )
    }

>>>>>>> init
    render() {
        const tabs = [
            { title: '我是买家' },
            { title: '我是卖家' }
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
                <Tabs tabs={tabs} initialPage={1}>
                    <div style={styles.tab}>
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
                        <div className="art-user__recomand">
                              - 为你推荐 -
                        </div>
                    </div>
                </Tabs>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getCustomerDetail('11');
    }
}

const mapStateToProps = ({user}) => {
    return {
        customerDetail: user.customerDetail,
    }
};

const mapDispatchToProps = dispatch => ({
    getCustomerDetail: (CustomerId) => {
        dispatch(getCustomerDetail({CustomerId}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
