import React, {PureComponent, Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {getAddressList, getAddressSetDefault, getAddressDelete} from '../store/actionCreators';
import PublicHeader from './../../../components/header'
import history from './../../../utils/history';

class addressList extends PureComponent {

    constructor(props) {
        super(props);

    }

    goAddAddress = () => {
        history.push('/addAddress')
    };

    render() {
        const {userAddressList} = this.props;

        return (
            <Fragment>
                <PublicHeader title="地址管理"/>
                <div>

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

export default connect(mapStateToProps, mapDispatchToProps)(addressList);
