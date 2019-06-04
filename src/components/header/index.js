import React, {PureComponent,Fragment} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.scss';
import history from './../../utils/history'
import eventProxy from 'react-eventproxy';

class PublicHeader extends PureComponent{
    
    constructor(props){
        super(props);
        const {title} = props;
        this.state = {
            title:title
        }
    }

    componentWillReceiveProps(nextProps){
        const {title} = nextProps;
        if(title !== this.state.title){
            this.setState({
                title:title
            })
        }
    }

    render(){
        const {bgColor,icon,share,jump} = this.props;
        console.log('jump',jump);
        const {title} = this.state;

        return (
           <Fragment>
                <NavBar
                    style={{background:bgColor,color:'#FFFFFF'}}
                    mode="light"
                    icon={<Icon type={icon}/>}
                    onLeftClick={() => {
                        if(jump === "User"){
                            history.push('/home?tab='+jump);
                        }
                        else{
                            history.go(-1)
                        }
                    }}
                    rightContent={
                        share && <div className="art-icon art-icon-share"></div>
                    }
                    >
                    {
                        title
                    }
                </NavBar>
            </Fragment>
        )
    }
}

PublicHeader.defaultProps ={
    bgColor:'#E87908',
    icon:'left',
    share:''
}

PublicHeader.propTypes = {
    title:PropTypes.string,
    bgColor:PropTypes.string,
    icon:PropTypes.string
}

export default PublicHeader;
