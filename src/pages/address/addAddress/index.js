import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAddressAdd} from '../store/actionCreators';
import PublicHeader from './../../../components/header';
import {List, InputItem, Picker, TextareaItem, Checkbox} from 'antd-mobile';
import {addressData} from '../../../data/addressData';
import {createForm} from 'rc-form';

const AgreeItem = Checkbox.AgreeItem;

class AddAddress extends PureComponent {

    constructor(props) {
        super(props);
    }

    onSubmit = () => {
        let {Provider, Phone, addressID = [], ShippingAddress, isDefault = false} = this.state;

        let Dto = {};

        //联系人
        Dto.ShippingContactWith = Provider;
        //联系电话
        Dto.ShippingPhone = Phone;
        //地址区域id
        Dto.ShippingAreaID = addressID.length > 2 ? addressID[2] : addressID[1];
        //详细地址
        Dto.ShippingAddress = ShippingAddress;
        //是否默认  1 是,2 否
        Dto.IsDefault = isDefault ? 1 : '2';
        //邮编
        Dto.ShippingZip = '123456';
        //地址标签
        Dto.AddressLabel = '0';

        this.props.getAddressAdd('1180036515879212', Dto);
    };

    render() {
        const {getFieldProps} = this.props.form;

        return (
            <Fragment>
                <PublicHeader title="新建地址"/>
                <div className="art-add">
                    <List>
                        <InputItem
                            clear
                            placeholder="请输入真实姓名"
                            onChange={(v) => {
                                this.setState({Provider: v})
                            }}>
                            姓名
                        </InputItem>

                        <InputItem
                            clear
                            placeholder="请输入手机号码"
                            onChange={(v) => {
                                this.setState({Phone: v})
                            }}>
                            手机号码
                        </InputItem>

                        <Picker
                            extra="请选择"
                            data={addressData}
                            title="选择地区"
                            {...getFieldProps('addressData')}
                            onOk={e => {
                                this.setState({addressID: e})
                            }}>

                            <List.Item arrow="horizontal">省 市 区</List.Item>
                        </Picker>

                        <TextareaItem
                            title="详细地址"
                            placeholder="如街道、楼牌号等"
                            data-seed="logId"
                            autoHeight
                            onChange={(v) => {
                                this.setState({ShippingAddress: v})
                            }}>
                        </TextareaItem>

                        <div className="art-add__agreement">
                            <AgreeItem data-seed="logId"
                                       onChange={e => {
                                           this.setState({isDefault: e.target.checked})
                                       }}>
                                设为默认地址
                            </AgreeItem>
                        </div>
                    </List>
                </div>

                <div className="art-add__bottom"
                     onClick={() => {
                         this.onSubmit()
                     }}>
                    <span>保存</span>
                </div>

            </Fragment>
        )
    }
}

const mapStateToProps = () => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    getAddressAdd: (token, Dto) => {
        dispatch(getAddressAdd({token, Dto: JSON.stringify(Dto)}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(createForm()(AddAddress));
