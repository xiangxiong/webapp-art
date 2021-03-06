import React,{PureComponent,Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {actionCreators} from './store';

class Login extends PureComponent{
    componentDidMount(){
    }

    render(){
        return (
            <Fragment>
                
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    loginStatus:state.getIn(['login','login'])
});

const mapStateToDispatch = (dispatch) => ({
    login(account,password){
        dispatch(actionCreators.login(account.value,password.value))
    }
});

export default connect(mapStateToProps,mapStateToDispatch)(Login);