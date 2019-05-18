import React, {PureComponent,Fragment} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.scss';
import history from './../../utils/history'
import classNames from 'classnames';

const PublicHeader = (props) => {
    const {title,bgColor,fontColor,icon} = props;

    console.log('props',props);

    const fontStyle = {
        background:bgColor,
        color:fontColor
    };

    return (
        <Fragment>
            <NavBar
                 style={{background:bgColor,color:'#FFFFFF'}}
                 mode="light"
                 icon={<Icon type={icon}/>}
                 onLeftClick={() => history.go(-1)}
                >
                {
                    title
                }
            </NavBar>
        </Fragment>
    )
}

PublicHeader.defaultProps = {
    bgColor:'light',
    color:'',
    fontColor:'#FFFFFF',
    icon:'left'
};
  
PublicHeader.propTypes = {
    title:PropTypes.string,
    bgColor:PropTypes.string,
    icon:PropTypes.string
}

export default PublicHeader;