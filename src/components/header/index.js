import React, {PureComponent,Fragment} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.scss';
import history from '@/utils/history'

class PublicHeader extends PureComponent{
    render(){
        return (
            <Fragment>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => history.go(-1)}
                    >
                    {
                        this.props.title
                    }
                </NavBar>
            </Fragment>
        )
    }
}

PublicHeader.propTypes = {
    title:PropTypes.string
}

export default PublicHeader;