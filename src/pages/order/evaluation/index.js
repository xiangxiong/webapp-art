import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getCommentAdd} from '../store/actionCreators';
import Space from '../../common/space';
import {ImagePicker, Toast, TextareaItem, InputItem, ActionSheet} from 'antd-mobile';
import  {pictureUrl} from '../../../utils/common';

let BUTTONS = ['好评', '中评', '差评'];

class OrderEvaluation extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
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

    onChange = (files, type, index) => {
        this.setState({
            files,
        });
    };

    release = () => {
        const {files, Content} = this.state;

        let storage = Storage.Base.getInstance();
        let Token = storage.get('userInfo').Token;
        let CustomerId = storage.get('userInfo').CustomerId;

        let params = {};
        params.Token = Token;
        params.CustomerId = CustomerId;

        params.SONumber = '';
        params.OrderNumber = '';
        params.ProdId = '';
        params.Type = '';
        params.Content = Content;
        params.ProviderId = '';
        params.CommentLevel = '';

        this.props.getCommentAdd(params);
    };

    showProduct = () => {
        const {ProductName = '新疆和田玉', ProductImg, SalesPrice = '35.00', TransactionNumber = '1'} = this.props;
        return (
            <div className="art-orderEvaluation__goods-item">
                <div style={{
                    //background: `url(${pictureUrl(ProductImg)}) 0% 0% / cover`,
                }}/>
                <div>
                    <h4>{ProductName}</h4>
                    <h4>{`￥${SalesPrice}`}</h4>
                </div>
                <div>
                    <span>{`×${TransactionNumber}`}</span>
                </div>
            </div>
        )
    };

    render() {
        const {files = [], buttonIndex} = this.state;

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
                        extra={">"}
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
                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}/>

                    </div>

                </div>

            </Fragment>
        )
    }

    componentDidMount() {

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
