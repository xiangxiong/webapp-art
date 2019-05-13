import React,{PureComponent,Fragment} from 'react';
import './index.scss';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Button} from 'antd-mobile';

class Login extends PureComponent{

    componentDidMount(){
    }
    
    render(){
        console.log('this.props',this.props);
        return (
            <Fragment>
                    <Button type="primary">default</Button>
                	<input placeholder='账号' ref={(input) => {this.account = input}}/>
					{/* <input placeholder='密码' type='password' ref={(input) => {this.password = input}}/> */}
                    {/* <button onClick={() => this.props.login(this.account, this.password)}>登陆</button> */}
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