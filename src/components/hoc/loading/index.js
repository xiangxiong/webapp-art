import React,{Component} from 'react';
import './index.scss';
import {isEmpty} from './../../../utils/common';
import ActivityIndicator from './ActivityIndicator';

const Loading = loadingProp => WrappedComponent => {
    return class LoadingHoc extends Component{
        render(){
            return isEmpty(this.props[loadingProp]) ? (
                <ActivityIndicator/>
              ) : (
                <WrappedComponent {...this.props} />
              );
        }
    }
}

export default Loading;