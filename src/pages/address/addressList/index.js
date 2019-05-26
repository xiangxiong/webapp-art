import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAddressList, getAddressSetDefault, getAddressDelete} from '../store/actionCreators';
import PublicHeader from './../../../components/header'
import history from './../../../utils/history';
import {PICTUREURL} from '../../../utils/api';

class AddressList extends PureComponent {

    constructor(props) {
        super(props);
    }

    goAddAddress = () => {
        history.push('/addAddress')
    };

    showAddressItem = (address, index) => {
        const {callback} = this.props.location;
        let {ShippingContactWith, ShippingPhone, ShippingAddress, IsDefault, AddressId} = address;

        return (
            <div className="art-list__item" key={index.toString()}
                 onClick={() => {
                     callback && callback(address);
                     history.goBack();
                 }}
            >
                <div className="art-list__item___left">
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
                            onClick={(e) => {
                                e.stopPropagation();
                                if (IsDefault != 1) {
                                    let storage = Storage.Base.getInstance();
                                    let Token = storage.get('userInfo').Token;

                                    this.props.getAddressSetDefault(Token, AddressId);
                                }
                            }}
                        >
                            {IsDefault == 1 ? '默认' : '设为默认'}
                            </span>
                        </div>
                        <span>{ShippingAddress}</span>
                    </div>
                </div>

                <div className="art-list__item___right">
                    <div className="art-icon art-icon-add"
                         onClick={(e) => {
                             e.stopPropagation();
                             let storage = Storage.Base.getInstance();
                             let Token = storage.get('userInfo').Token;

                             this.props.getAddressDelete(Token, [AddressId]);
                         }}>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        const {addressList} = this.props;

        return (
            <Fragment>
                <PublicHeader jump="User" title="地址管理"/>
                <div
                    style={{
                        height: '10px',
                        width: '100%',
                        background: `url(${PICTUREURL + 'fengexian.png'}) 0% 0% / cover`,
                    }}/>
                <div className="art-list">
                    {addressList.map((address, index) => {
                        return this.showAddressItem(address, index);
                    })}
                </div>

                <div className="art-list__bottom"
                     onClick={() => {
                         this.goAddAddress()
                     }}>
                    <div className="art-icon art-icon-add"></div>
                    <span>新建地址</span>
                </div>
            </Fragment>
        )
    }

    componentDidMount() {
        let storage = Storage.Base.getInstance();
        let CustomerId = storage.get('userInfo').CustomerId;

        this.props.getAddressList(CustomerId);
    }
}

const mapStateToProps = ({address}) => {
    return {
        addressList: address.addressList,
    }
};

const mapDispatchToProps = dispatch => ({
    getAddressList: (CustomerId) => {
        dispatch(getAddressList({CustomerId, PageIndex: 1, PageSize: 50}))
    },

    getAddressSetDefault: (token, AddressId) => {
        dispatch(getAddressSetDefault({token, AddressId}))
    },

    getAddressDelete: (token, Ids) => {
        dispatch(getAddressDelete({token, Ids}))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressList);
