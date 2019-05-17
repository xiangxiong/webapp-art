import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAddressList, getAddressSetDefault, getAddressDelete} from '../store/actionCreators';
import PublicHeader from './../../../components/header'
import history from './../../../utils/history';

class AddressList extends PureComponent {

    constructor(props) {
        super(props);
    }

    goAddAddress = () => {
        history.push('/addAddress')
    };

    showAddressItem = (userAddress, index) => {
        const {ShippingContactWith, ShippingPhone, ShippingAddress, IsDefault} = userAddress;

        return (
            <div className="art-add__item" key={index.toString()}>
                <div className="art-add__item___left">
                    <div >
                        <span>{ShippingContactWith}</span>
                        <span>{ShippingPhone}</span>
                    </div>

                    <div>
                        <span
                            className={IsDefault == 1 ? 'art-add__item___left____default' : 'art-add__item___left____noDefault'}>
                            {IsDefault == 1 ? '默认' : '设为默认'}
                            </span>
                        <span className="">{ShippingAddress}</span>
                    </div>
                </div>

                <div className="art-add__item___right">
                    <img src=""/>
                </div>
            </div>
        )
    };

    render() {
        const {userAddressList} = this.props;

        return (
            <Fragment>
                <PublicHeader title="地址管理"/>
                <div className="art-add">
                    {userAddressList.map((userAddress, index) => {
                        return this.showAddressItem(userAddress, index);
                    })}
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        this.props.getAddressList('11', 1, 50);
    }
}

const mapStateToProps = ({user}) => {
    return {
        userAddressList: user.userAddressList,
    }
};

const mapDispatchToProps = dispatch => ({
    getAddressList: (CustomerId, PageIndex, PageSize) => {
        dispatch(getAddressList({CustomerId, PageIndex, PageSize}))
    },

    getAddressSetDefault: (token, AddressId) => {
        dispatch(getAddressSetDefault({token, AddressId}))
    },

    getAddressDelete: (token, Ids) => {
        dispatch(getAddressDelete({token, Ids}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
