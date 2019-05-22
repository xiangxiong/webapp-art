import React,{PureComponent} from "react";
import {connect} from "react-redux";
import {Route,Redirect} from 'react-router-dom';

export const PrivateRoute = ({component: ComposedComponent,...rest}) =>{
   
    class Authentication extends PureComponent{
        render(){
            let isLogin = this.props.isLogin
                ? this.props.isLogin
                : sessionStorage.getItem("userinfo") 
                    ? sessionStorage.getItem("userinfo")
                    : "";
            return (
                <Route
                    {...rest}
                        render={props => !isLogin? (
                        <Redirect
                            to={{
                                pathname:"/oauth",
                                state:{from:props.location}
                            }}
                        />
                    ):(
                        <ComposedComponent {...props}/>
                    )}>
                </Route>
            )
        }
    }

    const AuthenticationContainer = connect(state=>({
        isLogin:state.loginInfo.isLogin
    }))(Authentication);

    return <AuthenticationContainer/>
}
