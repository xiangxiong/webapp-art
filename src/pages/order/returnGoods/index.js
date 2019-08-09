import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getSaveRmamAster} from '../store/actionCreators';
import Space from '../../common/space';
import {InputItem, ActionSheet, List, TextareaItem, ImagePicker, Toast} from 'antd-mobile';

let BUTTONS = ['质量问题/藏品破损', '商品与描述不符', '其它'];

class OrderReturnGoods extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            buttonIndex: -1,
            files: [],
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

    save = () => {
        const {order} = this.props.location.state;
        const {buttonIndex, files, SOMemo} = this.state;

        if (buttonIndex == -1) {
            Toast.info('请选择退货原因');
            return;
        }

        let params = {};

        let storage = Storage.Base.getInstance();
        let Token = storage.get('userInfo').Token;

        params.Token = Token;

        params.SONumber = order.SONumber;
        params.OrderNumber = order.OrderNumber;
        params.ProdId = order.ProdId;
        params.RMAType = 1;
        params.RmaReason = BUTTONS[buttonIndex];
        params.Quantity = '';
        params.ImageNameList = '';
        params.SOMemo = SOMemo;

        this.props.getSaveRmamAster(params);
    };

    render() {
        const {buttonIndex, files = []} = this.state;

        return (
            <Fragment>
                <PublicHeader title="申请退货" rightContent={<div onClick={() => {
                    this.save();
                }}>保存</div>}/>
                <div className="art-returnGoods">
                    <List>
                        <InputItem
                            moneyKeyboardAlign="right"
                            clear
                            placeholder="请选择退货原因"
                            value={BUTTONS[buttonIndex]}
                            editable={false}
                            extra={">"}
                            onClick={() => this.handleCategory()}>
                            退货原因
                        </InputItem>

                        <Space/>

                        <TextareaItem
                            onChange={(v) => {
                                this.setState({SOMemo: v})
                            }}
                            placeholder="退货说明（可以不填）"
                            rows={3}/>

                        <Space/>

                        <h4 className="art-returnGoods__credentials">上传凭证（最多5张）</h4>

                        <ImagePicker
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 5}/>
                    </List>
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
    getSaveRmamAster: (params) => {
        dispatch(getSaveRmamAster(params))
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderReturnGoods);
