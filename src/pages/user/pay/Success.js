import React,{Fragment} from 'react';
import './success.scss';
import PublicHeader from './../../../components/header';
import history from './../../../utils/history';

class Success extends React.Component{

    HandleRouterHome(){
        history.push('/home?tab=User');
    }
    
    render(){
        return (
                <Fragment>
                    <PublicHeader title="支付成功"/>
                    <div className="art-pay">
                        <div className="art-pay__success">
                            支付成功
                        </div>
                        <p className="art-pay__tips">订单已支付成功.</p>
                        <div className="art-pay__return" onClick={this.HandleRouterHome.bind(this)}>
                            返回个人中心
                        </div>
                    </div>
                </Fragment>
        )
    }
}

export default Success;