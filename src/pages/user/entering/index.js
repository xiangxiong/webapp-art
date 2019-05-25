import React, {PureComponent, Fragment} from 'react';
import {List} from 'antd-mobile'
import './index.scss';
import PublicHeader from './../../../components/header'
import history from './../../../utils/history';
import connect from "react-redux/es/connect/connect";
import {getQueryIntertionalPartener} from "../store/actionCreators";
import _ from 'lodash';

const Item = List.Item;

class Entering extends PureComponent {

    constructor(props) {
        super(props);
        this.handleCreateShop = this.handleCreateShop.bind(this);
    }

    handleCreateShop(type) {
        let {userIntertionalPartener} = this.props;
        let {Status} = userIntertionalPartener;

        if (_.isEmpty(userIntertionalPartener)) {
            //跳转到入驻
            history.push({
                pathname: './application',
                state: {type}
            });
        } else {
            if (Status == 3) {
                //保障金列表
                history.push({
                    pathname: './pay',
                    state: {type}
                });
            } else if (Status == 4) {
                //跳支付
            } else if (Status == 6) {
                //跳转到入驻 传入数据
                history.push({
                    pathname: './application',
                    state: {type, data: userIntertionalPartener}
                });
            }
        }
    }

    getItem() {
        let {customerDetail, userIntertionalPartener} = this.props;
        let {CustomerType} = customerDetail;
        let {Status, Remark} = userIntertionalPartener;

        let extra = '';
        if (Status == 0) {
            extra = '待审核';
        } else if (Status == 3 || Status == 4) {
            extra = '待缴纳保障金';
        } else if (Status == 6) {
            extra = '审核不通过';
        }

        if (CustomerType == 10) {
            //普通用户
            return (
                <List>
                    {/* <Item arrow="horizontal" onClick={this.handleCreateArt}>入住成为合作艺术家</Item>*/}
                    <Item arrow="horizontal" className="art-entering__arts"
                          onClick={this.handleCreateShop}>入驻成为艺术商户商城</Item>
                </List>
            )
        } else if (CustomerType == 1) {
            //艺术家
            return (
                <List>
                    <Item arrow="horizontal" extra={extra} onClick={this.handleCreateShop}>入驻成为合作艺术家</Item>
                    {Status == 6 ? <Item>{`审核不通过：${Remark}`}</Item> : null}
                </List>
            )
        } else if (CustomerType == 2) {
            //商户
            return (
                <List>
                    <Item arrow="horizontal" extra={extra} onClick={this.handleCreateShop}>入驻成为艺术商户商城</Item>
                    {Status == 6 ? <Item>{`审核不通过：${Remark}`}</Item> : null}
                </List>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <PublicHeader title="合作入驻"/>
                {this.getItem()}
            </Fragment>
        )
    }

    componentDidMount() {
        let storage = Storage.Base.getInstance();
        let Token = storage.get('userInfo').Token;
        let CustomerId = storage.get('userInfo').CustomerId;

        this.props.getQueryIntertionalPartener({Token, CustomerId});
    }
}

const mapStateToProps = ({user}) => {
    return {
        customerDetail: user.customerDetail,
        userIntertionalPartener: user.userIntertionalPartener,
    }
};

const mapDispatchToProps = dispatch => ({
    getQueryIntertionalPartener: (params) => {
        dispatch(getQueryIntertionalPartener(params))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Entering);