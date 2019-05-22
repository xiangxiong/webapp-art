import React,{PureComponent,Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {actionCreators} from './store';

class Login extends PureComponent{

    componentDidMount(){

    }

    render(){
        console.log('this.props',this.props);
        return (
            <Fragment>
              
            </Fragment>
        )
    }
}

const mapState = (state) => ({
    loginStatus:state.getIn(['login','login'])
})

const mapDispatch = (dispatch) => ({
    login(account,password){
        dispatch(actionCreators.login(account.value,password.value))
    }
})

export default connect(mapState,mapDispatch)(Login);