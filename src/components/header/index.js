import React, {PureComponent,Fragment} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.scss';

class PublicHeader extends PureComponent{
    render(){
        return (
            <Fragment>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
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