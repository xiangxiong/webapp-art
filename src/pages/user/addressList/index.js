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

    showAddressItem = (userAddress) => {
        const {ShippingContactWith, ShippingPhone, ShippingAddress, IsDefault} = userAddress;

        return (
            <div className="art-addAddress__item">
                <div className="art-addAddress__item___left">
                    <div className="art-addAddress__item___left____name">
                        <span>{ShippingContactWith}</span>
                        <span>{ShippingPhone}</span>
                    </div>

                    <div className="art-addAddress__item___left____detail">
                        <div></div>
                        <span>{ShippingAddress}</span>
                    </div>
                </div>

                <div className="art-addAddress__item___right">
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
                <div className="art-addAddress">
                    {userAddressList.map((userAddress, index) => {
                        return this.showAddressItem(userAddress);
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
