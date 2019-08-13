import React,{Component} from 'react';
import './index.scss';

const isEmpty = prop => 
    prop === null || 
    prop === undefined ||
    (prop.hasOwnProperty("length") && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0);

const Loading = loadingProp => WrappedComponent => {

    return class LoadingHoc extends Component{
        componentDidMount(){
            this.startTimer = Date.now();
        }

        componentWillUpdate(nextProps){
            if(!isEmpty(nextProps[loadingProp])){
                this.endTimer = Date.now();
            }
        }

        render(){
            const myProps = {
                loadingTime: ((this.endTimer - this.startTimer) / 1000).toFixed(2)
            }

            return isEmpty(this.props[loadingProp]) ? (
                <div className="loader"></div>
            ) : (
                <WrappedComponent {...this.props} {...myProps}/>
            )
        }
    }
}

export default Loading;