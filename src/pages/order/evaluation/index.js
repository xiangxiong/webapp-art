import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getCommentAdd} from '../store/actionCreators';
import Space from '../../common/space';
import {TextareaItem, InputItem, ActionSheet} from 'antd-mobile';
import  {pictureUrl} from '../../../utils/common';

let BUTTONS = ['好评', '中评', '差评'];

class OrderEvaluation extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            buttonIndex: -1,
        }
    }


    handleCategory = () => {
        const {buttonIndex} = this.state;

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length,
                destructiveButtonIndex: buttonIndex,
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
            },
            (buttonIndex) => {
                this.setState({
                    buttonIndex
                });
            });
    };

    release = () => {
        const {order} = this.props.location.state;
        console.log('order', order);
        const {Content, buttonIndex} = this.state;

        let storage = Storage.Base.getInstance();
        let Token = storage.get('userInfo').Token;
        let CustomerId = storage.get('userInfo').CustomerId;

        let params = {};
        params.Token = Token;
        params.CustomerId = CustomerId;

        params.SONumber = order.SONumber;
        params.OrderNumber = order.OrderNumber;
        params.ProdId = order.ProdId;
        params.Type = 9;
        params.Content = Content;
        params.ProviderId = order.ProviderId;
        if (buttonIndex == 0) {
            params.CommentLevel = '10';
        } else if (buttonIndex == 1) {
            params.CommentLevel = '20';
        } else if (buttonIndex == 2) {
            params.CommentLevel = '30';
        }

        this.props.getCommentAdd(params);
    };

    showProduct = () => {
        const {order = {}} = this.props.location.state;
        const {ProductName = '', ImageName = '', LastPrice = '', Quantity = ''} = order.Details[0];
        return (
            <div className="art-orderEvaluation__goods-item">
                <div style={{
                    background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`,
                }}/>
                <div>
                    <h4>{ProductName}</h4>
                    <h4>{`￥${LastPrice}`}</h4>
                </div>
                <div>
                    <span>{`×${Quantity}`}</span>
                </div>
            </div>
        )
    };

    render() {
        const {buttonIndex} = this.state;

        return (
            <Fragment>
                <PublicHeader
                    title="订单评价"
                    rightContent={
                        <div
                            onClick={() => {
                                this.release();
                            }}>
                            发布
                        </div>}/>

                <div className="art-orderEvaluation">

                    <div className="art-orderEvaluation__goods">
                        {this.showProduct()}
                    </div>

                    <Space/>
                    <InputItem
                        moneyKeyboardAlign="right"
                        clear
                        placeholder="请选择"
                        value={BUTTONS[buttonIndex]}
                        editable={false}
                        onClick={() => this.handleCategory()}>
                        综合评分
                    </InputItem>
                    <Space/>
                    <div>
                        <TextareaItem
                            onChange={(v) => {
                                this.setState({Content: v})
                            }}
                            placeholder="买到好的东西了！马上写点评价"
                            rows={3}/>
                    </div>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        const {order} = this.props.location.state;
        console.log('order', order);
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    getCommentAdd: (params) => {
        dispatch(getCommentAdd(params))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderEvaluation);
