import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {List} from 'antd-mobile';
import ProductionItem from '../home/production/index';
import {connect} from 'react-redux';
import {getHomeList} from './store/actions';
import history from '@/utils/history';

const Item = List.Item;

class User extends PureComponent {

    constructor(props) {
        super(props);
        
        this.state = {
            productionList: [
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                },
                {
                    imageUrl: 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg',
                    name: '景德镇紫砂壶',
                    salesPrice: '￥1998',
                    marketPrice: '￥1998',
                },
            ]
        };

        this.handleNavUrl = this.handleNavUrl.bind(this);
    }

    handleNavUrl(){
        history.push('/enter');
    }

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


    render() {
        const {productionList} = this.state;

        return (
            <Fragment>
                <div className="art-user__header">
                    <div className="art-user__header___basicInfo">
                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                        <div>
                            <span>{'柳士勇'}</span>
                            <span>{'账户余额：8890元'}</span>
                        </div>
                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                    </div>

                    <div style={{width: '100%', height: '1px', backgroundColor: '#E7E7E7'}}/>

                    <div className="art-user__header___otherInfo">
                        {this.otherInfoItem(45, '收藏')}
                        {this.otherInfoItem(45, '关注')}
                        {this.otherInfoItem(45, '足记')}
                        {this.otherInfoItem(56, '团购')}
                    </div>


                </div>
                <div className="art-user__order">
                    <div className="art-user__order___title">
                        <span>我的订单</span>

                        <img src="http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg"/>
                    </div>

                    <div style={{width: '97%', height: '1px', backgroundColor: '#E7E7E7', alignSelf: 'center'}}/>
                    <div className="art-user__order___stateList">
                        {this.orderInfoItem(0, '待付款', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(2, '待发货', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(0, '待收货', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(0, '待评价', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        {this.orderInfoItem(0, '退货/售后', 'http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg', false)}
                    </div>
                </div>
                <div style={{width: '100%', height: '20px', backgroundColor: '#F3F3F3'}}/>
                <List>
                    <Item
                        thumb={this.itemLeftIcon('http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        arrow="horizontal"
                        onClick={this.handleNavUrl}>
                        合作入住
                    </Item>

                    <Item
                        thumb={this.itemLeftIcon('http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        arrow="horizontal"
                        onClick={() => {
                        }}>
                        好货推荐
                    </Item>

                    <Item
                        thumb={this.itemLeftIcon('http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        arrow="horizontal"
                        onClick={() => {
                        }}>
                        提现
                    </Item>
                </List>
                <div style={{width: '100%', height: '20px', backgroundColor: '#F3F3F3'}}/>
                <List>
                    <Item
                        thumb={this.itemLeftIcon('http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        arrow="horizontal"
                        onClick={() => {
                        }}>
                        协议规则
                    </Item>

                    <Item
                        thumb={this.itemLeftIcon('http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        arrow="horizontal"
                        onClick={() => {
                        }}>
                        收货地址
                    </Item>


                    <Item
                        thumb={this.itemLeftIcon('http://pic29.nipic.com/20130601/12122227_123051482000_2.jpg')}
                        arrow="horizontal"
                        onClick={() => {
                        }}>
                        联系客服(9:00-21:30)
                    </Item>
                </List>

                <div className="art-user__recommend">

                    <span>--为你推荐--</span>

                    <div className="art-user__recommend___content">
                        {productionList.map((production, index) => {
                            return (
                                <div key={index.toString()}>
                                    <ProductionItem {...production}/>
                                </div>)
                        })}
                    </div>

                </div>

            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getHomeList();
    }
}

const mapStateToProps = state => {
    console.log('mapStateToProps', state.user);
    return {
        list: state.user.newsList,
        name: state.user.name
    }
}

const mapDispatchToProps = dispatch => ({
    getHomeList(){
        dispatch(getHomeList())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
