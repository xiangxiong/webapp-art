import React,{Component} from 'react';
import './index.scss';
import {isEmpty,getDisplayName} from './../../../utils/common';
import Load from './Load';

const Loading = loadingProp => WrappedComponent => {
     class LoadingHoc extends Component{
        render(){
            console.log('this.props',this.props);
            
            return isEmpty(this.props[loadingProp]) ? (
                <Load/>
              ) : (
                <WrappedComponent {...this.props} />
              );
        }
    }

    LoadingHoc.displayName = `WithLoadingHoc(${getDisplayName(
      WrappedComponent
    )})`;

    return LoadingHoc;
}

export default Loading;