import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAddressAdd} from '../store/actionCreators';
import PublicHeader from './../../../components/header';

class AddAddress extends PureComponent {

    constructor(props) {
        super(props);

    }

    onSubmit = () => {
        let Dto = {};

        //联系人
        Dto.ShippingContactWith = '';
        //联系电话
        Dto.ShippingPhone = '';
        //地址区域id
        Dto.ShippingAreaID = '';
        //详细地址
        Dto.ShippingAddress = '';
        //是否默认  1 是,2 否
        Dto.IsDefault = '';
        //邮编
        Dto.ShippingZip = '';
        //地址标签
        Dto.AddressLabel = '';

        this.props.getAddressAdd('', Dto);
    };

    render() {
        return (
            <Fragment>
                <PublicHeader title="新建地址"/>
                <div>

                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = dispatch => ({
    getAddressAdd: (token, Dto) => {
        dispatch(getAddressAdd({token, Dto: JSON.stringify(Dto)}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
