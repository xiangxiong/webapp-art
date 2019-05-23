import React,{useState,useEffect,Fragment,PureComponent} from 'react';
import './index.scss';
import PublicHeader from './../../../components/header';
import {connect} from 'react-redux';
import {getUserWorkActionDispatch} from '../store/actionCreators';
import {pictureUrl} from '../../../utils/common';

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

    getWorkItem = (workData = {}) => {
        const {ImageName = '', ProdName = '', LimitPrice = '', MarketPrice = ''} = workData;

        return (
            <div className="art-worklist__item">
                <div className="art-worklist__item-img">
                    <div style={{
                        background: `url(${pictureUrl(ImageName)}) 0% 0% / cover`
                    }}>
                    </div>
                </div>
                <div className="art-worklist__item-content">
                    <h3>{ProdName}</h3>
                    <div>{`市场价：${LimitPrice}元`}</div>
                    <div>{`库 存：${MarketPrice}件`}</div>
                    <div>
                        <span className="art-worklist__item-action">编辑</span>
                        <span className="art-worklist__item-action">删除</span>
                    </div>
                </div>
            </div>
        );
    };
    
    render(){
        return (
            <Fragment>
                <PublicHeader title="作品库" bgColor="#E87908"/>
                {this.getWorkItem()}
            </Fragment>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        workList:state.workList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getWorkList:(params)=>{
            dispatch(getUserWorkActionDispatch(params))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(WorkList);