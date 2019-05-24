import React,{Fragment,PureComponent} from 'react';
import './index.scss';
import {InputItem,Button,Toast} from 'antd-mobile';
import {bindPhoneActionResult,sendMessageActionResult} from './../store/actionCreators'; 
import {connect} from 'react-redux';
import history from './../../../utils/history';
import TimeCountDown from './../../../components/TimeCountDown';
var count = 0;

function formateTimeStr(num) {
    return '发送验证码';
}

class Bind extends PureComponent{

    constructor(props){
        super(props);
        this.state = {
            sendMessage:'获取验证码',
            time: 10,
        }
        this.init();
    }

    onTimeout = () => {
        this.forceUpdate();
    }

    init(){
        this.bindEvent();
    }

    bindEvent(){
        this.handleBindPhone = this.handleBindPhone.bind(this);
        this.handleSendCode = this.handleSendCode.bind(this);
    }

    async handleBindPhone(){
        const data = {
            Type:'2',
            OpenId:Storage.Base.getInstance().get('oauthInfo').OpenId,
            Phone: this.phoneRef.state.value,
            Verify: this.validateRef.state.value
        };
        const result = await this.props.handleBindPhone(data);
        if(result.Status !== 200){
            Toast.fail("手机号已绑定");
            setTimeout(()=>{
                history.push('/');
            },2000);
        }else{
            let storage = Storage.Base.getInstance();
            storage.set("userInfo",result.Data);
            history.push('/');
        }
    }

    async handleSendCode(){
        var time = 60;
        var that = this;
        
        const data = {
            Type:'3',
            Phone:this.phoneRef.state.value
        };

        const result = await this.props.handleSendCode(data);
        if(result.Status === 200){
            Toast.success("发送成功");
        }else{
            Toast.fail('网络异常',1);
        }

        setInterval(function(){
            if(time<=0){
                that.setState({
                    sendMessage:'发送验证码'
                })
            }
            else{
                that.setState({
                    sendMessage:(time)+"重新发送"
                });
                time --;
            }
        },1000);
    }

    render(){

        const {sendMessage} = this.state;

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
                                    ref={el=> this.phoneRef = el}
                                    placeholder="手机号码">
                            </InputItem>
                            <InputItem
                                clear
                                ref={el=> this.validateRef = el}
                                placeholder="验证码">
                                </InputItem>
                            <Button type="primary" onClick={this.handleBindPhone}>绑定手机号</Button>
                        </div>
                    </div>
                    <Button type="primary"  ref={el=> this.sendRef = el} onClick={this.handleSendCode} className="art-user-login-send">
                         {sendMessage}
                    </Button>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        bindPhone:state.bindPhone
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleBindPhone: data => dispatch(bindPhoneActionResult(data)),
        handleSendCode: data => dispatch(sendMessageActionResult(data))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Bind);