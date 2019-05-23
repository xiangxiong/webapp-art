import React,{useState,useEffect,Fragment,PureComponent} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getUserWorkActionDispatch} from '../store/actionCreators';

class WorkList extends PureComponent{

    componentDidMount(){
        this.props.getWorkList({
            ProviderId:1,
            Type:1,
            OrderBy:1,
            PageIndex:1,
            PageSize:20
        });
    }
    
    render(){
        return (
            <Fragment>
                <PublicHeader title="作品库" bgColor="#E87908"/>
                <div className="art-worklist__item">
                    <div className="art-worklist__item-img">
                        <div>
                        </div>
                    </div>
                    <div className="art-worklist__item-content">
                             <h3>景德镇紫砂壶</h3>
                             <div>市场价：1998元</div>
                             <div>库   存：578件</div>
                             <div>
                                 <span className="art-worklist__item-action">编辑</span>
                                 <span className="art-worklist__item-action">删除</span>
                             </div>
                    </div>
                </div>
            </Fragment>
        )
    }
};

const mapStateToProps = (state) => {
    console.log('workList',state.workList);
    return {
        workList:state.workList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getWorkList:(params)=>{
            dispatch(getUserWorkActionDispatch(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(WorkList);