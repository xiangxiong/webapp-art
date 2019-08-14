import React,{Component} from 'react';
import {getDisplayName} from './../../../utils/common';

const User = WrappedComponent => {
    class UserHoc extends Component{
        render(){

            let storage = Storage.Base.getInstance(),
                users = {
                    CustomerId:storage.get('userInfo').CustomerId,
                    Token:storage.get('userInfo').Token,
                };
            
            return (
                <WrappedComponent {...this.props} {...users}/>
            )
        }
    }

    UserHoc.displayName = `WithUserHoc(${getDisplayName(
        WrappedComponent
    )})`;

    return UserHoc;
}

export default User;