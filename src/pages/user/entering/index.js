import React, {PureComponent, Fragment} from 'react';
import {List} from 'antd-mobile'
import './index.scss';
import PublicHeader from './../../../components/header'
import history from './../../../utils/history';
import connect from "react-redux/es/connect/connect";
import {getQueryIntertionalPartener} from "../store/actionCreators";

const Item = List.Item;

class Entering extends PureComponent {

    constructor(props) {
        super(props);
        this.handleCreateArt = this.handleCreateArt.bind(this);
        this.handleCreateShop = this.handleCreateShop.bind(this);
    }

    handleCreateArt() {
        history.push('/application', {type: 'art'});
    }

    handleCreateShop() {
        history.push('/application', {type: 'shop'});
    }

    getItem() {
        let {customerDetail, userIntertionalPartener} = this.props;
        let {CustomerType} = customerDetail;
        let {Status} = userIntertionalPartener;

        let extra = '';
        if (Status == 0) {
            extra = '待审核';
        } else if (Status == 4) {
            extra = '待缴纳保障金';
        } else if (Status == 5) {
            extra = '已签约';
        } else if (Status == 6) {
            extra = '审核不通过';
        }

        if (CustomerType == 10) {
            //普通用户
            return (
                <List>
                    {/* <Item arrow="horizontal" onClick={this.handleCreateArt}>入住成为合作艺术家</Item>*/}
                    <Item arrow="horizontal" className="art-entering__arts"
                          onClick={this.handleCreateShop}>入住成为艺术商户商城</Item>
                </List>
            )
        } else if (CustomerType == 1) {
            //艺术家
            return (
                <List>
                    <Item arrow="horizontal" extra={extra} onClick={this.handleCreateArt}>入住成为合作艺术家</Item>
                </List>
            )
        } else if (CustomerType == 2) {
            //商户
            return (
                <List>
                    <Item arrow="horizontal" extra={extra} onClick={this.handleCreateShop}>入住成为艺术商户商城</Item>
                </List>
            )

        }
    }

    render() {
        return (
            <Fragment>
                <PublicHeader title="合作入住"/>
                {this.getItem()}
            </Fragment>
        )
    }

    componentDidMount() {
        let {CustomerType} = this.props.customerDetail;
        if (CustomerType != 10) {
            this.props.getQueryIntertionalPartener({Token: '2390648179516024', CustomerId: '11'});
        }
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