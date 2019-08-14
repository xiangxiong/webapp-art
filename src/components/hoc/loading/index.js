import React,{Component} from 'react';
import './index.scss';
import {isEmpty} from './../../../utils/common';
import Load from './Load';
import {getDisplayName} from './../../../utils/common';


const Loading = loadingProp => WrappedComponent => {
     class LoadingHoc extends Component{
        render(){
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