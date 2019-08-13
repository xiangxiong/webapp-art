import React,{Component} from 'react';
import './index.scss';

const isEmpty = prop => 
    prop === null || 
    prop === undefined ||
    (prop.hasOwnProperty("length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0);

const Loading = loadingProp => WrappedComponent => {
    return class LoadingHoc extends Component{
        render(){
            console.log('this.props[loadingProp]',this.props[loadingProp]);
            return isEmpty(this.props[loadingProp]) ? (
                    <div className="loader" />
              ) : (
                <WrappedComponent {...this.props} />
              );
        }
    }
}

export default Loading;