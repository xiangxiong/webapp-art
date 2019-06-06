import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import PublicHeader from './../../../components/header';
import {getShipVia, getOrderSend} from '../store/actionCreators';
import {List, InputItem, ActionSheet, Toast} from 'antd-mobile';
import _ from 'lodash';

class OrderDelivery extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            buttonIndex: -1,
            WayBillCode: '',
            ShipViaName: '',
        }
    }

    handleCategory = () => {
        let {shipViaList} = this.props;
        const {buttonIndex} = this.state;

        let BUTTONS = shipViaList.map(shipVia => {
            return shipVia.ShipViaName
        });

        ActionSheet.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: BUTTONS.length,
                destructiveButtonIndex: buttonIndex,
                message: '',
                maskClosable: true,
                'data-seed': 'logId',
            },
            (buttonIndex) => {
                let shipVia = shipViaList[buttonIndex];
                if (!_.isEmpty(shipVia)) {
                    this.setState({
                        buttonIndex,
                        ShipViaName: shipVia.ShipViaName,
                        ShipViayId: shipVia.ShipViaId,
                    });
                }
            });
    };

    determine = () => {
        const {buttonIndex, WayBillCode, ShipViayId} = this.state;
        const {order = {}} = this.props.location.state;

        if (_.isEmpty(WayBillCode)) {
            Toast.info('请输入快递单号', 1);
            return
        }

        if (buttonIndex == -1) {
            Toast.info('请选择快递公司', 1);
            return
        }

        let params = {};

        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;
        let Token = storage.get('userInfo').Token;

        params.Token = Token;
        params.CustomerId = CustomerId;
        params.SONumber = order.SONumber;
        params.OrderNumber = order.OrderNumber;
        params.WayBillCode = WayBillCode;
        params.ShipViaId = ShipViayId;
        params.ProviderId = order.ProviderId;

        this.props.getOrderSend(params);
    };

    render() {
        const {ShipViaName} = this.state;

        return (
            <Fragment>
                <PublicHeader title="立即发货" rightContent={
                    <div
                        onClick={() => {
                            this.determine();
                        }}>
                        确定
                    </div>}/>

                <List>
                    <InputItem
                        clear
                        placeholder="请选择物流公司"
                        editable={false}
                        onClick={() => this.handleCategory()}
                        value={ShipViaName}
                    >物流公司</InputItem>
                    <InputItem
                        clear
                        placeholder="请输入物流单号"
                        onChange={(v) => {
                            this.setState({WayBillCode: v})
                        }}
                    >物流单号</InputItem>
                </List>

            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getShipVia();
    }
}

const mapStateToProps = ({order}) => {
    return {
        shipViaList: order.shipViaList,
    }
};

const mapDispatchToProps = dispatch => ({
    getShipVia: () => {
        dispatch(getShipVia({sid: 0}))
    },

    getOrderSend: (params) => {
        dispatch(getOrderSend(params))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDelivery);
