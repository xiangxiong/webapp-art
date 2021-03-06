import React, {PureComponent,Fragment} from 'react';
import {NavBar, Icon} from 'antd-mobile';
import PropTypes from 'prop-types';
import './index.scss';
import history from './../../utils/history'
import eventProxy from 'react-eventproxy';
var jumpUrlItem = "";

class PublicHeader extends PureComponent{

    constructor(props){
        super(props);

        const {title} = props;
        this.state = {
            title:title
        }

        eventProxy.on("navitem",(object)=>{
            console.log('objecteeee',object);
            jumpUrlItem = object;
             this.setState({
                title:object
             });
        });
    }

    componentWillReceiveProps(nextProps){
        const {title} = nextProps;
        if(title !== this.state.title){
            this.setState({
                title:title
            })
        }
    }

    componentDidMount(){
    }

    render(){
        const {bgColor,icon,rightContent,jump,isNoIcon} = this.props;
        const {title} = this.state;

        return (
           <Fragment>
                <NavBar
                    style={{background:bgColor,color:'#FFFFFF'}}
                    mode="light"
                    icon={!isNoIcon?<Icon type={icon}/>:null}
                    onLeftClick={() => {
                        if(!isNoIcon){
                            if(jump){
                                history.push('/home?tab='+jump);
                            }
                            else{
                                history.go(-1)
                            }
                        }
                    }}
                    rightContent={
                        rightContent
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
    share:'',
    isNoIcon:false
}

PublicHeader.propTypes = {
    title:PropTypes.string,
    bgColor:PropTypes.string,
    icon:PropTypes.string,
    isNoIcon:PropTypes.bool,
}

export default PublicHeader;
