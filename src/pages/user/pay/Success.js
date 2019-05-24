import React,{Fragment} from 'react';
import './success.scss';
import PublicHeader from './../../../components/header';
import history from './../../../utils/history';

class Success extends React.Component{

    HandleRouterHome(){
        history.push('/home');
    }
    render(){
        return (
                <Fragment>
                    <PublicHeader title="支付成功"/>
                    <div className="art-pay">
                    <div className="art-pay__success">
                         支付成功
                    </div>
                    <div className="art-pay__return" onClick={this.HandleRouterHome.bind(this)}>
                         返回首页.
                    </div>
                    </div>
                </Fragment>
        )
    }
}
export default Success;