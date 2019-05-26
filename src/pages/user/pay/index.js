import React, {useState, Fragment, PureComponent} from 'react';
import PublicHeader from './../../../components/header';
import {Checkbox} from 'antd-mobile';
import './index.scss';
import connect from "react-redux/es/connect/connect";
import {getDict} from "../store/actionCreators";
import history from './../../../utils/history';
const AgreeItem = Checkbox.AgreeItem;

class Pay extends PureComponent {
    constructor(props) {
        super(props);
        console.log('props', this.props.location.state);
        this.state = {
            selectedNumber: 0,
            selectedAmount: 0,
        }
    }

    addDesc = (userDict, index) => {
        return (
            <div className="art-add__desc" key={index.toString()}>
                <div>
                    {`￥${userDict.Value}`}
                </div>
                <div>
                    {userDict.Detail}
                </div>
                <div>
                    <AgreeItem
                        checked={userDict.TransactionNumber == this.state.selectedNumber}
                        data-seed="logId"
                        className="my-radio"
                        onChange={e => {
                            this.setState({selectedNumber: userDict.TransactionNumber, selectedAmount: userDict.Value})
                        }}>
                    </AgreeItem>
                </div>
            </div>
        )
    };

    render() {
        const {type} = this.props.location.state;
        const title = type === "art" ? "成为合作艺术家" : "成为艺术商城商户";
        let {userDictList} = this.props;

        return (
            <Fragment>
                <PublicHeader title={title}/>
                <p className="art-add__pay">
                    你已通过入驻艺术家信息审核
                    请选择入驻
                </p>

                {userDictList.map((userDict, index) => {
                    return this.addDesc(userDict, index)
                })}

                <div className="art-add__paysure" onClick={() => {
                    //支付
                    history.push({
                        pathname: '/payorder',
                        state: {SONumber: this.state.selectedAmount}
                    });
                }}>
                    确认并支付保障金
                </div>

            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getDict({listKey: 'ProviderDepositLevel'});
    }
}

const mapStateToProps = ({user}) => {
    return {
        userDictList: user.userDictList,
    }
};

const mapDispatchToProps = dispatch => ({
    getDict: (params) => {
        dispatch(getDict(params))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pay);