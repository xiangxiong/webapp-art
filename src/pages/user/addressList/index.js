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
        let {ShippingContactWith, ShippingPhone, ShippingAddress, IsDefault, AddressId} = userAddress;

        return (
            <div className="art-add__item" key={index.toString()}>
                <div className="art-add__item___left">
                    <div >
                        <span>{ShippingContactWith}</span>
                        <span>{ShippingPhone}</span>
                    </div>

                    <div>
                        <div>
                        <span
                            style={{
                                color: IsDefault == 1 ? '#C52125' : '#C6C6C6',
                                borderColor: IsDefault == 1 ? 'rgba(197,33,37,1)' : 'rgba(198,198,198,1)'
                            }}
                            onClick={() => {
                                if (IsDefault != 1) {
                                    this.props.getAddressSetDefault('token', AddressId);
                                }
                            }}
                        >
                            {IsDefault == 1 ? '默认' : '设为默认'}
                            </span>
                        </div>
                        <span>{ShippingAddress}</span>
                    </div>
                </div>

                <div className="art-add__item___right">
                    <div className="art-icon art-icon-add"
                         onClick={() => {
                             this.props.getAddressDelete('token', [AddressId]);
                         }}>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        const {userAddressList} = this.props;

        return (
            <Fragment>
                <div>
                    <PublicHeader title="地址管理"/>
                    <div className="art-add">
                        {userAddressList.map((userAddress, index) => {
                            return this.showAddressItem(userAddress, index);
                        })}
                    </div>

                    <div className="art-add__bottom"
                         onClick={() => {
                             this.goAddAddress()
                         }}>
                        <div className="art-icon art-icon-add"></div>
                        <span>新建地址</span>
                    </div>
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
