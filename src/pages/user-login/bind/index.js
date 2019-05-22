import React,{Fragment} from 'react';
import './index.scss';
import {InputItem,List,Button} from 'antd-mobile';

const Bind = () =>{
    return (
        <Fragment>
            <div className="art-user-login-wrapper">
                <div className="art-user-login">
                    <div className="art-user-login__logo">
                    </div>
                    <h3>艺术大家</h3>
                    <div>
                        <InputItem
                                clear
                                placeholder="手机号码"
                        ></InputItem>
                        <InputItem
                            clear
                            placeholder="验证码"
                        ></InputItem>
                         <Button type="primary">绑定手机号</Button>
                    </div>
                </div>
                <Button type="primary" className="art-user-login-send">发送验证码</Button>

            </div>

        </Fragment>
    )
}

export default Bind;